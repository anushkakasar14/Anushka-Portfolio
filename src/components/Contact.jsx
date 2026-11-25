import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { profile, projectTypes, socials } from '../data/site';
import { buildMailto, submitContact, validateContact } from '../services/contact';
import { ease } from '../lib/motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import SectionHeading from './common/SectionHeading';
import MagneticButton from './common/MagneticButton';
import Reveal from './common/Reveal';

const initial = { name: '', email: '', projectType: '', message: '' };
const MAX = 1000;

function FieldError({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          className="field__error"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          <AlertCircle aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [sent, setSent] = useState(null);
  const [toast, setToast] = useState('');

  usePageMeta({
    title: 'Contact',
    description: "Get in touch with Anushka Kasar about full-time roles, freelance websites or AI and automation projects.",
  });

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
  };
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, projectType: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first === 'projectType' ? 'type-0' : `f-${first}`)?.focus();
      return;
    }
    setStatus('loading');
    const res = await submitContact(values);
    if (res.ok) {
      setSent(values);
      setStatus('success');
      setValues(initial);
      setTouched({});
    } else {
      setStatus('idle');
    }
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast('Email copied to clipboard');
    } catch {
      setToast(profile.email);
    }
  }, []);

  const err = (f) => (touched[f] ? errors[f] : undefined);
  const github = socials.find((s) => s.id === 'github');
  const linkedin = socials.find((s) => s.id === 'linkedin');

  return (
    <PageTransition variant="scale">
      <section className="section page-top contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <SectionHeading
            id="contact-title"
            level={1}
            trigger="load"
            index="05"
            eyebrow="Contact"
            lines={["Let's build", { text: 'something meaningful.', className: 'accent' }]}
            intro="Have a role, a project or an idea worth exploring? Send a note — or reach me directly below."
          />
          <Reveal className="contact__direct" variant="left" delay={0.1}>
            <div className="direct-row">
              <a className="direct" href={`mailto:${profile.email}`}>
                <span className="direct__icon">
                  <Mail aria-hidden="true" />
                </span>
                <span className="direct__body">
                  <span className="direct__label">Email</span>
                  <span className="direct__value" style={{ display: 'block' }}>
                    {profile.email}
                  </span>
                </span>
                <ArrowUpRight className="direct__arrow" aria-hidden="true" />
              </a>
              <button className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                <Copy aria-hidden="true" />
              </button>
            </div>
            <a className="direct" href={github.href} target="_blank" rel="noopener noreferrer">
              <span className="direct__icon">
                <Github aria-hidden="true" />
              </span>
              <span className="direct__body">
                <span className="direct__label">GitHub</span>
                <span className="direct__value" style={{ display: 'block' }}>
                  {github.handle}
                </span>
              </span>
              <ArrowUpRight className="direct__arrow" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a className="direct" href={linkedin.href} target="_blank" rel="noopener noreferrer">
              <span className="direct__icon">
                <Linkedin aria-hidden="true" />
              </span>
              <span className="direct__body">
                <span className="direct__label">LinkedIn</span>
                <span className="direct__value" style={{ display: 'block' }}>
                  {linkedin.handle}
                </span>
              </span>
              <ArrowUpRight className="direct__arrow" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="form-card" variant="right" delay={0.1}>
          <AnimatePresence mode="wait" initial={false}>
            {status !== 'success' ? (
              <motion.form
                key="form"
                className="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
                aria-label="Contact form"
              >
                <div className="form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="f-name">
                      Name
                    </label>
                    <input
                      id="f-name"
                      className="field__input"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={update('name')}
                      onBlur={blur('name')}
                      aria-invalid={!!err('name')}
                      aria-describedby={err('name') ? 'e-name' : undefined}
                    />
                    <FieldError id="e-name" message={err('name')} />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="f-email">
                      Email
                    </label>
                    <input
                      id="f-email"
                      className="field__input"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={update('email')}
                      onBlur={blur('email')}
                      aria-invalid={!!err('email')}
                      aria-describedby={err('email') ? 'e-email' : undefined}
                    />
                    <FieldError id="e-email" message={err('email')} />
                  </div>
                </div>

                <fieldset
                  className="types field"
                  aria-invalid={!!err('projectType')}
                  aria-describedby={err('projectType') ? 'e-type' : undefined}
                >
                  <legend className="field__label">Project type</legend>
                  {projectTypes.map((t, i) => (
                    <label className="type" key={t}>
                      <input
                        id={`type-${i}`}
                        type="radio"
                        name="projectType"
                        value={t}
                        checked={values.projectType === t}
                        onChange={(e) => {
                          const next = { ...values, projectType: e.target.value };
                          setValues(next);
                          setTouched((tt) => ({ ...tt, projectType: true }));
                          setErrors(validateContact(next));
                        }}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                  <div style={{ flexBasis: '100%' }}>
                    <FieldError id="e-type" message={err('projectType')} />
                  </div>
                </fieldset>

                <div className="field">
                  <label className="field__label" htmlFor="f-message">
                    Message
                    <small aria-hidden="true">
                      {values.message.length}/{MAX}
                    </small>
                  </label>
                  <textarea
                    id="f-message"
                    className="field__input"
                    placeholder="Tell me about the role, project or idea…"
                    maxLength={MAX}
                    value={values.message}
                    onChange={update('message')}
                    onBlur={blur('message')}
                    aria-invalid={!!err('message')}
                    aria-describedby={err('message') ? 'e-message' : undefined}
                  />
                  <FieldError id="e-message" message={err('message')} />
                </div>

                <div className="form__footer">
                  <p className="form__note">Nothing is stored — your details stay in your browser.</p>
                  <MagneticButton as="button" type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <span className="spinner" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="icon-arrow" aria-hidden="true" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="success"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="success__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f3ccde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease, delay: 0.25 }}
                    />
                  </svg>
                </span>
                <h3 className="success__title">Thank you, {sent?.name.split(' ')[0]}.</h3>
                <p className="success__text">
                  Your message is ready. This site is frontend-only, so the quickest way to make sure it reaches me
                  is to send it from your email app — it&rsquo;s already written for you.
                </p>
                <div className="success__actions">
                  <MagneticButton href={buildMailto(sent, profile.email)}>
                    <Mail aria-hidden="true" /> Open in email app
                  </MagneticButton>
                  <MagneticButton as="button" type="button" variant="ghost" onClick={() => setStatus('idle')}>
                    Write another
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
      </section>

      {/* Portal: the toast stays viewport-fixed regardless of page transforms. */}
      {createPortal(
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
          >
            <Check aria-hidden="true" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </PageTransition>
  );
}
