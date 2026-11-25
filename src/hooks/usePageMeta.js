import { useEffect } from 'react';

const SITE = 'Anushka Kasar';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/** Per-route <title>, description and Open Graph tags. */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : `${SITE} — Full-Stack Engineer · AI Tools & Automation`;
    document.title = fullTitle;
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[property="og:url"]', 'content', window.location.href);
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
  }, [title, description]);
}
