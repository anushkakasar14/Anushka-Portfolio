// Vercel Serverless Function: POST /api/contact
// Validates a portfolio contact submission and emails it via Resend.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      required — never commit this, never prefix it with VITE_
//   CONTACT_FROM_EMAIL  optional — a sender on a domain verified in Resend,
//                       e.g. "Portfolio <contact@yourdomain.com>".
//                       Defaults to Resend's shared test sender, which can only
//                       deliver to the email address that owns the Resend account.
//   CONTACT_TO_EMAIL    optional — overrides the recipient below.

import { Resend } from 'resend';
import { LIMITS, validateContact } from '../src/lib/contactValidation.js';
import { projectTypes } from '../src/data/site.js';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'anushkakasar24@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

const GENERIC_ERROR = 'Something went wrong while sending your message.';

// --- Basic abuse protection -------------------------------------------------
// Best-effort, per-instance limit: 5 submissions per IP per 10 minutes.
// Serverless instances are short-lived, so this slows bursts rather than
// guaranteeing a global quota (use Upstash/Vercel KV if that is ever needed).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

const clientIp = (req) =>
  String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();

// Reject cross-site posts: if the browser sends an Origin, it must match this host.
function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Coerce the untrusted body into exactly the fields we expect.
function readPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const pick = (key, max) => (typeof body[key] === 'string' ? body[key].slice(0, max) : null);
  const data = {
    name: pick('name', LIMITS.nameMax + 1),
    email: pick('email', LIMITS.emailMax + 1),
    projectType: pick('projectType', 100),
    message: pick('message', LIMITS.messageMax + 1),
    company: typeof body.company === 'string' ? body.company : '', // honeypot
  };
  if ([data.name, data.email, data.projectType, data.message].some((v) => v === null)) return null;
  return data;
}

function buildEmail({ name, email, projectType, message }) {
  const text = [
    'New Portfolio Contact Inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Project Type: ${projectType}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const row = (label, value) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b5566;font-weight:600;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#241229;line-height:1.55">
  <h2 style="margin:0 0 16px;font-size:20px">New Portfolio Contact Inquiry</h2>
  <table style="border-collapse:collapse">${row('Name', name)}${row('Email', email)}${row('Project Type', projectType)}</table>
  <p style="margin:20px 0 6px;color:#6b5566;font-weight:600">Message:</p>
  <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`;

  return { text, html };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }
  if (!String(req.headers['content-type'] || '').includes('application/json')) {
    return res.status(415).json({ ok: false, error: 'Expected JSON.' });
  }
  if (!isSameOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Forbidden.' });
  }

  let body;
  try {
    body = req.body; // Vercel parses JSON lazily and throws on malformed input
  } catch {
    return res.status(400).json({ ok: false, error: 'Malformed request.' });
  }

  const data = readPayload(body);
  if (!data) return res.status(400).json({ ok: false, error: 'Malformed request.' });

  // Honeypot filled in → almost certainly a bot. Pretend success, send nothing.
  if (data.company.trim()) return res.status(200).json({ ok: true });

  if (isRateLimited(clientIp(req))) {
    res.setHeader('Retry-After', String(WINDOW_MS / 1000));
    return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });
  }

  const fields = validateContact(data);
  if (!projectTypes.includes(data.projectType)) fields.projectType = 'Pick the option that fits best.';
  if (Object.keys(fields).length) {
    return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', fields });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — cannot send email.');
    return res.status(500).json({ ok: false, error: GENERIC_ERROR });
  }

  const clean = {
    name: data.name.trim().replace(/[\r\n]+/g, ' '),
    email: data.email.trim(),
    projectType: data.projectType,
    message: data.message.trim(),
  };
  const { text, html } = buildEmail(clean);

  try {
    const { data: sent, error } = await new Resend(apiKey).emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: clean.email,
      subject: `New portfolio inquiry — ${clean.name} (${clean.projectType})`,
      text,
      html,
    });
    if (error) {
      console.error('[contact] Resend rejected the email:', error.name, error.message);
      return res.status(502).json({ ok: false, error: GENERIC_ERROR });
    }
    console.info('[contact] Email sent, id:', sent?.id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error sending email:', err?.message || err);
    return res.status(500).json({ ok: false, error: GENERIC_ERROR });
  }
}
