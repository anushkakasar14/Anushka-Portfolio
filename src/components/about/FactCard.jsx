import { memo, useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { ease, fadeUp } from '../../lib/motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useTheme } from '../../context/ThemeContext';

/** Fact tile; numeric values count up once when scrolled into view. */
function FactCard({ value, label }) {
  const [ref, inView] = useIntersectionObserver({ once: true, threshold: 0.6 });
  const { reduceMotion } = useTheme();
  const numeric = /^\d+$/.test(value);
  const [display, setDisplay] = useState(numeric && !reduceMotion ? '0' : value);

  useEffect(() => {
    if (!numeric || reduceMotion) {
      setDisplay(value);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(0, Number(value), {
      duration: 1.4,
      ease,
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, value, reduceMotion]);

  return (
    <motion.li className="fact" variants={fadeUp} ref={ref}>
      <p className="fact__value">{display}</p>
      <p className="fact__label">{label}</p>
    </motion.li>
  );
}

export default memo(FactCard);
