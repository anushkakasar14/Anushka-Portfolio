import { motion } from 'framer-motion';
import { Github, Globe, ShieldAlert } from 'lucide-react';
import { Icon } from '../../lib/icons';
import { fadeUp, stagger, viewport } from '../../lib/motion';
import MagneticButton from '../common/MagneticButton';
import Reveal from '../common/Reveal';

function Title({ title, accent }) {
  if (!title) return null;
  return (
    <h2 className="case-block__title">
      {title} {accent && <em>{accent}</em>}
    </h2>
  );
}

const renderers = {
  text: ({ block }) => block.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>),

  features: ({ block }) => (
    <motion.ul className="feature-grid" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}>
      {block.items.map((f, i) => (
        <motion.li className="feature" key={f.title} variants={fadeUp}>
          <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="feature__title">{f.title}</h3>
          <p className="feature__text">{f.text}</p>
        </motion.li>
      ))}
    </motion.ul>
  ),

  flow: ({ block }) => (
    <motion.ol className="flow" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
      {block.steps.map((s) => (
        <motion.li className="flow__step" key={s.title} variants={fadeUp}>
          <Icon name={s.icon} />
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  ),

  stack: ({ project }) => (
    <ul className="stack-list">
      {project.technologies.map((t) => (
        <li className="chip chip--accent" key={t}>
          {t}
        </li>
      ))}
    </ul>
  ),

  notice: ({ block }) => (
    <div className="notice" role="note">
      <ShieldAlert aria-hidden="true" />
      <p>{block.text}</p>
    </div>
  ),

  links: ({ block, project }) => (
    <>
      <p>{block.text}</p>
      <div className="project__actions case-block__actions">
        {project.liveUrl && (
          <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <Globe aria-hidden="true" /> View Live Site
            <span className="sr-only">(opens in a new tab)</span>
          </MagneticButton>
        )}
        {project.githubUrl && (
          <MagneticButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="ghost">
            <Github aria-hidden="true" /> View GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </MagneticButton>
        )}
      </div>
    </>
  ),
};

/** Renders one typed case-study block from data/projects.js. */
export default function DetailBlock({ block, project }) {
  const Body = renderers[block.type];
  if (!Body) return null;
  return (
    <Reveal as="section" className="case-block">
      <p className="case-block__label">{block.label}</p>
      <div>
        <Title title={block.title} accent={block.accent} />
        <Body block={block} project={project} />
      </div>
    </Reveal>
  );
}
