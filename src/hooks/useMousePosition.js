import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Tracks the pointer as Framer Motion values (no React re-renders).
 *  - x / y:   pixels, relative to `ref` (or the viewport when no ref)
 *  - nx / ny: normalised -0.5 … 0.5, handy for tilt and parallax
 * Values ease back to centre when the pointer leaves the element.
 */
export function useMousePosition(ref, { enabled = true } = {}) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const target = ref ? ref.current : window;
    if (!target) return undefined;

    const onMove = (e) => {
      const r = ref ? ref.current.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      x.set(px);
      y.set(py);
      nx.set(px / r.width - 0.5);
      ny.set(py / r.height - 0.5);
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };

    target.addEventListener('pointermove', onMove, { passive: true });
    target.addEventListener('pointerleave', onLeave);
    return () => {
      target.removeEventListener('pointermove', onMove);
      target.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled, x, y, nx, ny]);

  return { x, y, nx, ny };
}
