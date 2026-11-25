// Sends the contact form to the Vercel serverless function at /api/contact.
// The email service key never reaches the browser — the function holds it.

export async function submitContact({ name, email, projectType, message, company }) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, projectType, message, company }),
    });
    return { ok: res.ok };
  } catch {
    // Network failure / offline — treated the same as a server error in the UI.
    return { ok: false };
  }
}
