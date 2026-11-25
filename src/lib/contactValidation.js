// Shared by the Contact form (instant feedback) and /api/contact (the real
// gatekeeper). Pure functions only — safe to import on the server.

export const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 20,
  messageMax: 1000,
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please tell me your name.';
  else if (name.length < LIMITS.nameMin) errors.name = 'That name looks a little short.';
  else if (name.length > LIMITS.nameMax) errors.name = `Please keep your name under ${LIMITS.nameMax} characters.`;

  if (!email) errors.email = 'An email lets me reply to you.';
  else if (email.length > LIMITS.emailMax || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  if (!values.projectType) errors.projectType = 'Pick the option that fits best.';

  if (!message) errors.message = 'A short message helps me understand what you need.';
  else if (message.length < LIMITS.messageMin) errors.message = `Could you add a bit more detail? (${LIMITS.messageMin}+ characters)`;
  else if (message.length > LIMITS.messageMax) errors.message = `Please keep it under ${LIMITS.messageMax} characters.`;

  return errors;
}
