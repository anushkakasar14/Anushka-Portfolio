import { useScroll, useSpring } from 'framer-motion';

/**
 * Smoothed 0 → 1 scroll progress as a motion value.
 * Without a target it tracks the whole page; with a target ref it tracks
 * that element through the viewport (e.g. a timeline filling as you read).
 */
export function useScrollProgress({ target, offset, smooth = true } = {}) {
  const { scrollYProgress } = useScroll(target ? { target, offset } : undefined);
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return smooth ? spring : scrollYProgress;
}
