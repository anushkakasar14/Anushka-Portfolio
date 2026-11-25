import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../lib/scroll';

/**
 * Resets scroll when the route changes. It is rendered inside each page's
 * transition wrapper, so it fires after the outgoing page has finished its
 * exit animation — the old page never visibly jumps.
 * Focus moves to <main> so screen readers announce the new page.
 */
let isFirstPage = true;

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const done = useRef(false);

  useLayoutEffect(() => {
    if (done.current) return;
    done.current = true;
    scrollToTop({ immediate: true });
    if (!isFirstPage) document.getElementById('main')?.focus({ preventScroll: true });
    isFirstPage = false;
  }, [pathname]);

  return null;
}
