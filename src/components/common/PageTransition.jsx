import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';
import ScrollToTop from './ScrollToTop';

// Each route gets a slightly different entrance; all stay within ~300–600ms.
const presets = {
  fade: {
    initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slide: {
    initial: { opacity: 0, x: 48 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
  },
};

const exit = { opacity: 0, y: -12, filter: 'blur(6px)', transition: { duration: 0.3, ease } };

export default function PageTransition({ children, variant = 'fade', className = '' }) {
  const preset = presets[variant] || presets.fade;
  return (
    <motion.div
      className={`page ${className}`}
      initial={preset.initial}
      // transitionEnd drops the filter once settled so the page isn't kept on
      // an extra compositing layer (and never traps position: fixed children).
      animate={{ ...preset.animate, transition: { duration: 0.55, ease }, transitionEnd: { filter: 'none' } }}
      exit={exit}
    >
      <ScrollToTop />
      {children}
    </motion.div>
  );
}
