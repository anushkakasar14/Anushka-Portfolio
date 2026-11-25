import { experience } from '../data/experience';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import SectionHeading from './common/SectionHeading';
import Timeline from './experience/Timeline';

export default function Experience() {
  usePageMeta({
    title: 'Experience',
    description:
      'Anushka Kasar’s journey: B.Tech in Computer Science and Design Engineering, freelance and independent projects, and the Studio Parijatak client website.',
  });

  return (
    <PageTransition variant="slide">
      <section className="section page-top experience" aria-labelledby="experience-title">
        <div className="container">
          <SectionHeading
            id="experience-title"
            level={1}
            trigger="load"
            index="04"
            eyebrow="Journey"
            lines={['The path', { text: 'so far.', className: 'accent' }]}
            intro="Education, independent work and a real client project — each one shaping how I build."
          />
          <Timeline items={experience} />
        </div>
      </section>
    </PageTransition>
  );
}
