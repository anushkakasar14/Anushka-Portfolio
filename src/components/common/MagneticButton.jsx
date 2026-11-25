import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { useTheme } from '../../context/ThemeContext';

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

/**
 * Button / external link / router link that drifts toward the cursor.
 *   <MagneticButton to="/projects">   → React Router <Link>
 *   <MagneticButton href="https://…"> → <a>
 *   <MagneticButton as="button">      → <button>
 * The magnetic effect is skipped on touch devices and when motion is reduced.
 */
export default function MagneticButton({
  as = 'a',
  to,
  variant = 'primary',
  size,
  strength = 0.3,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const { reduceMotion } = useTheme();
  const enabled = fine && !reduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  let Tag = motion.a;
  if (to) Tag = MotionLink;
  else if (as === 'button') Tag = motion.button;

  const cls = `btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`;

  return (
    <span className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
      <Tag ref={ref} className={cls} style={{ x: sx, y: sy }} {...(to ? { to } : {})} {...rest}>
        <span className="btn__label">{children}</span>
      </Tag>
    </span>
  );
}
