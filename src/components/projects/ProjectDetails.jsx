import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProject, projects } from '../../data/projects';
import { ease } from '../../lib/motion';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageTransition from '../common/PageTransition';
import AnimatedText from '../common/AnimatedText';
import MagneticButton from '../common/MagneticButton';
import ProjectVisual from './ProjectVisual';
import DetailBlock from './DetailBlock';

function ProjectNotFound() {
  return (
    <section className="section page-top notfound-inline">
      <div className="container">
        <p className="eyebrow">Projects</p>
        <h1 className="case__title">That project doesn&rsquo;t exist.</h1>
        <p className="case__summary">It may have been renamed. The full list is one click away.</p>
        <div className="case-block__actions">
          <MagneticButton to="/projects">
            <ArrowLeft aria-hidden="true" /> All projects
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = useMemo(() => getProject(projectId), [projectId]);
  const next = useMemo(() => {
    if (!project) return null;
    const i = projects.indexOf(project);
    return projects[(i + 1) % projects.length];
  }, [project]);

  usePageMeta({
    title: project ? `${project.title} — Case study` : 'Project not found',
    description: project?.description,
  });

  if (!project) {
    return (
      <PageTransition>
        <ProjectNotFound />
      </PageTransition>
    );
  }

  const title = project.fullTitle || project.title;

  return (
    <PageTransition variant="slide">
      <article className="case page-top">
        <div className="container">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
            <button type="button" className="case__back" onClick={() => navigate('/projects')}>
              <ArrowLeft aria-hidden="true" /> All projects
            </button>
          </motion.div>

          <header className="case__head">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
            >
              <span className="eyebrow__index">{project.index}</span>
              <span className="eyebrow__line" aria-hidden="true" />
              <span>{project.category}</span>
            </motion.p>
            <AnimatedText
              as="h1"
              trigger="load"
              delay={0.2}
              stagger={0.05}
              className={`case__title ${title.length > 40 ? 'case__title--long' : ''}`}
              text={title}
            />
            <motion.p
              className="case__summary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
            >
              {project.description}
            </motion.p>
          </header>

          <motion.dl className="case__meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
            {project.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            className="case__hero-visual"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.45 }}
          >
            <ProjectVisual kind={project.visual} />
          </motion.div>

          <div className="case__body">
            {project.sections.map((block) => (
              <DetailBlock key={`${block.type}-${block.label}`} block={block} project={project} />
            ))}
          </div>

          {next && next.id !== project.id && (
            <Link to={`/projects/${next.id}`} className="case__next" data-cursor="view">
              <span className="case__next-label">Next case study</span>
              <span className="case__next-title">
                {next.title}
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>
      </article>
    </PageTransition>
  );
}
