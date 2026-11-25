import { projects } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import SectionHeading from './common/SectionHeading';
import ProjectCard from './projects/ProjectCard';

export default function Projects() {
  usePageMeta({
    title: 'Projects',
    description:
      'Selected work by Anushka Kasar: Studio Parijatak, a live home-textile brand website, and a deep-learning project predicting diabetic retinopathy from fundus images.',
  });

  return (
    <PageTransition variant="scale">
      <section className="section page-top projects" aria-labelledby="projects-title">
        <div className="container">
          <SectionHeading
            id="projects-title"
            level={1}
            trigger="load"
            index="02"
            eyebrow="Selected work"
            lines={['Projects that', { text: 'tell a story.', className: 'accent' }]}
            intro="Two projects, end to end — a live client website and a deep-learning research build. Open either one for the full case study."
          />
          <div className="projects__list">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} total={projects.length} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
