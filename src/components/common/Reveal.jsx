import { motion } from 'framer-motion';
import { ease, viewport } from '../../lib/motion';

// Different sections use different entrances so the scroll feels authored,
// not templated. All variants animate transform/opacity (blur once, briefly).
const variants = {
  up: (d) => ({ opacity: 0, y: d }),
  left: (d) => ({ opacity: 0, x: -d * 1.6 }),
  right: (d) => ({ opacity: 0, x: d * 1.6 }),
  scale: () => ({ opacity: 0, scale: 0.94 }),
  blur: () => ({ opacity: 0, scale: 0.97, filter: 'blur(14px)' }),
};

export default function Reveal({ as = 'div', variant = 'up', children, delay = 0, y = 28, className, ...rest }) {
  const Tag = motion[as] || motion.div;
  const hidden = variants[variant](y);
  const shown = { opacity: 1, x: 0, y: 0, scale: 1, ...(variant === 'blur' ? { filter: 'blur(0px)' } : {}) };
  return (
    <Tag
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={viewport}
      transition={{ duration: variant === 'blur' ? 1.2 : 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
