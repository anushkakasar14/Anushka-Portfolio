import { forwardRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../lib/icons';
import { ease } from '../../lib/motion';

// Hover glow follows the pointer through CSS variables — no re-renders.
const trackPointer = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
};

// forwardRef is required by AnimatePresence mode="popLayout".
const SkillCard = forwardRef(function SkillCard({ skill, index }, ref) {
  return (
    <motion.li
      ref={ref}
      layout
      className="skill"
      onPointerMove={trackPointer}
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.03, 0.3) }}
    >
      <span className="skill__icon">
        <Icon name={skill.icon} />
      </span>
      <span className="skill__body">
        <span className="skill__name">{skill.name}</span>
        <span className="skill__note">{skill.note}</span>
      </span>
    </motion.li>
  );
});

export default memo(SkillCard);
