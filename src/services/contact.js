// Frontend-only mock. To go live later, replace the body of `submitContact`
// with a real request (e.g. fetch('/api/contact', { method: 'POST', body })).
// The UI only relies on the returned { ok } shape.
export async function submitContact(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return { ok: true, payload };
}

export function buildMailto({ name, email, projectType, message }, to) {
  const subject = `${projectType || 'Hello'} — from ${name}`;
  const body = `${message}\n\n— ${name}\n${email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  else if (values.name.trim().length < 2) errors.name = 'That name looks a little short.';

  if (!values.email.trim()) errors.email = 'An email lets me reply to you.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';

  if (!values.projectType) errors.projectType = 'Pick the option that fits best.';

  if (!values.message.trim()) errors.message = 'A short message helps me understand what you need.';
  else if (values.message.trim().length < 20) errors.message = 'Could you add a bit more detail? (20+ characters)';

  return errors;
}
