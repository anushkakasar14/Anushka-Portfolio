import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories, skills } from '../data/skills';
import { ease } from '../lib/motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import SectionHeading from './common/SectionHeading';
import Reveal from './common/Reveal';
import SkillCard from './skills/SkillCard';
import SkillFilters from './skills/SkillFilters';

// Counts never change at runtime, so compute them once at module level.
const counts = skills.reduce(
  (acc, s) => ({ ...acc, [s.category]: (acc[s.category] || 0) + 1 }),
  { all: skills.length }
);

export default function Skills() {
  const [filter, setFilter] = useState('all');

  usePageMeta({
    title: 'Skills',
    description: 'Technologies Anushka Kasar works with — frontend (HTML, CSS, JavaScript, React, Tailwind), development tools, and AI & automation tools.',
  });

  const visible = useMemo(() => (filter === 'all' ? skills : skills.filter((s) => s.category === filter)), [filter]);

  // Stable handler so the memoised filter bar doesn't re-render needlessly.
  const handleFilter = useCallback((id) => setFilter(id), []);

  return (
    <PageTransition variant="fade">
      <section className="section page-top skills" aria-labelledby="skills-title">
        <div className="container">
          <div className="skills__top">
            <SectionHeading
              id="skills-title"
              level={1}
              trigger="load"
              index="03"
              eyebrow="Toolkit"
              lines={['Technologies', { text: 'I work with.', className: 'accent' }]}
            />
            <Reveal variant="right">
              <SkillFilters categories={skillCategories} counts={counts} active={filter} onChange={handleFilter} />
            </Reveal>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {visible.length} technologies
          </p>

          <motion.ul
            layout
            className="skills__grid"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((s, i) => (
                <SkillCard key={s.name} skill={s} index={i} />
              ))}
            </AnimatePresence>
          </motion.ul>
          <p className="skills__note">Tools I actively use to design, build, ship and automate — no proficiency scores, just honest usage.</p>
        </div>
      </section>
    </PageTransition>
  );
}
