import { profile } from './site';

// Drop a PDF into src/assets/resume/ and Vite will bundle it automatically.
// Until one exists, resume buttons fall back to an email request so no link
// in the site is ever broken.
const files = import.meta.glob('../assets/resume/*.pdf', { eager: true, query: '?url', import: 'default' });
const url = Object.values(files)[0];

export const hasResume = Boolean(url);

export const resumeLink = hasResume
  ? { href: url, download: 'Anushka_Kasar_Resume.pdf' }
  : {
      href: `mailto:${profile.email}?subject=${encodeURIComponent('Resume request')}`,
      title: 'Resume coming soon — this opens an email to request it',
    };
