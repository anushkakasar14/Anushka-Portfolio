import { memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Github, Globe } from 'lucide-react';
import { ease, viewport } from '../../lib/motion';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useTheme } from '../../context/ThemeContext';
import MagneticButton from '../common/MagneticButton';
import ProjectVisual from './ProjectVisual';

const MAX_TILT = 5; // degrees — subtle on purpose

function ProjectCard({ project, total, reverse = false }) {
  const cardRef = useRef(null);
  const fine = useFinePointer();
  const { reduceMotion } = useTheme();
  const interactive = fine && !reduceMotion;

  // Pointer → subtle 3D tilt + a glow that follows the cursor across the image.
  const { x, y, nx, ny } = useMousePosition(cardRef, { enabled: interactive });
  const rotateY = useSpring(useTransform(nx, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(ny, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), { stiffness: 150, damping: 18 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(243,204,222,0.18), transparent 60%)`;

  const detailPath = `/projects/${project.id}`;

  return (
    <article
      ref={cardRef}
      className={`project ${reverse ? 'project--reverse' : ''}`}
      aria-labelledby={`project-${project.id}`}
      data-cursor="view"
    >
      <div className="project__frame">
      <motion.div
        className="project__media"
        style={interactive ? { rotateX, rotateY } : undefined}
        initial={{ clipPath: 'inset(14% 10% 14% 10% round 28px)', opacity: 0.4 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 1.2, ease }}
      >
        <div className="project__visual">
          <ProjectVisual kind={project.visual} />
        </div>
        {interactive && <motion.span className="project__glow" style={{ background: glow }} aria-hidden="true" />}
        <span className="project__index">
          {project.index} / {String(total).padStart(2, '0')}
        </span>
        <span className="project__open" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </motion.div>
      </div>

      <motion.div
        className="project__body"
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      >
        <p className="project__type">{project.category}</p>
        <h2 className="project__title" id={`project-${project.id}`}>
          {/* Stretched link: the whole card navigates to the case study. */}
          <Link to={detailPath}>
            {project.title}
            <span className="sr-only">, read the case study</span>
          </Link>
        </h2>
        <p className="project__summary">{project.description}</p>
        <ul className="project__meta project__meta-reveal" aria-label="Technologies">
          {project.technologies.slice(0, 6).map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
        {(project.liveUrl || project.githubUrl) && (
          <div className="project__actions">
            {project.liveUrl && (
              <MagneticButton href={project.liveUrl} target="_blank" rel="noopener noreferrer" size="small">
                <Globe aria-hidden="true" /> View Live Site
                <span className="sr-only">(opens in a new tab)</span>
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton href={project.githubUrl} target="_blank" rel="noopener noreferrer" size="small" variant="ghost">
                <Github aria-hidden="true" /> View GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </MagneticButton>
            )}
          </div>
        )}
        <p className="project__hint" aria-hidden="true">
          Read the case study <ArrowRight />
        </p>
      </motion.div>
    </article>
  );
}

export default memo(ProjectCard);
