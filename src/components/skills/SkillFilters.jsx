import { memo } from 'react';
import { LayoutGroup, motion } from 'framer-motion';

/** Category toggle buttons with a shared sliding highlight. */
function SkillFilters({ categories, counts, active, onChange }) {
  return (
    <LayoutGroup id="skill-filters">
      <div className="filters" role="group" aria-label="Filter skills by category">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button key={cat.id} type="button" className="filter" aria-pressed={isActive} onClick={() => onChange(cat.id)}>
              {isActive && (
                <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span>{cat.label}</span>
              <span className="filter__count">{counts[cat.id]}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default memo(SkillFilters);
