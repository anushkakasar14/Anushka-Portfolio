import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useTheme } from '../../context/ThemeContext';

const HOVER = 'a, button, input, textarea, label, [role="button"]';

// Desktop-only follower ring. The native cursor always stays visible.
export default function CustomCursor() {
  const fine = useFinePointer();
  const { reduceMotion } = useTheme();
  const enabled = fine && !reduceMotion;
  const { x, y } = useMousePosition(null, { enabled });
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [state, setState] = useState('hidden');

  useEffect(() => {
    if (!enabled) return undefined;
    // pointerover fires only when the element under the cursor changes.
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      let next = 'idle';
      if (t?.closest('.btn, button, input, textarea, label, .social')) next = 'hover';
      else if (t?.closest('[data-cursor="view"]')) next = 'view';
      else if (t?.closest(HOVER)) next = 'hover';
      setState(next);
    };
    const onLeave = () => setState('hidden');
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div className={`cursor cursor--${state}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <div className="cursor__ring">
        <span className="cursor__label">View</span>
      </div>
    </motion.div>
  );
}
