// Bridge between React and the Lenis smooth-scroll instance.
let lenis = null;
let locks = 0;

export const setLenis = (instance) => {
  lenis = instance;
};

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

// Ref-counted so overlapping locks (e.g. menu) can't release each other.
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
  }
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    lenis?.start();
    document.documentElement.style.overflow = '';
  }
}
