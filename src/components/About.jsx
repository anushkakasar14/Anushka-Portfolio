import { motion } from 'framer-motion';
import { aboutFacts, aboutPillars, journey, services, strengths } from '../data/site';
import { stagger, viewport, fadeUp } from '../lib/motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageTransition from './common/PageTransition';
import SectionHeading from './common/SectionHeading';
import Reveal from './common/Reveal';
import CodeCard from './about/CodeCard';
import FactCard from './about/FactCard';
import Journey from './about/Journey';
import Services from './about/Services';
import Recruiter from './about/Recruiter';

export default function About() {
  usePageMeta({
    title: 'About',
    description:
      'Anushka Kasar — Full-Stack Developer with a B.Tech in Computer Science and Design Engineering, interested in AI, automation and creative technology.',
  });

  return (
    <PageTransition variant="slide">
      <section className="section page-top about" aria-labelledby="about-title">
        <div className="container about__grid">
          <div>
            <SectionHeading
              id="about-title"
              level={1}
              trigger="load"
              index="01"
              eyebrow="About"
              lines={['Not just writing code.', { text: 'Building solutions.', className: 'accent' }]}
            />
            <Reveal as="p" className="about__lead" variant="left">
              I&rsquo;m Anushka — a <em>Full-Stack Developer</em> interested in AI, automation and creative technology.
            </Reveal>
            <Reveal as="p" className="about__text" variant="left" delay={0.1}>
              With a B.Tech background in Computer Science and Design Engineering, I sit comfortably between how
              something works and how it feels. I enjoy building practical digital products, exploring AI-powered
              applications, and solving problems creatively — learning something new with every project I ship.
            </Reveal>

            <motion.ol className="pillars" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
              {aboutPillars.map((p, i) => (
                <motion.li className="pillar" key={p.title} variants={fadeUp}>
                  <span className="pillar__num">0{i + 1}</span>
                  <h2 className="pillar__title">{p.title}</h2>
                  <p className="pillar__text">{p.text}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div className="about__visual">
            <span className="about__deco about__deco--1" aria-hidden="true" />
            <span className="about__deco about__deco--2" aria-hidden="true" />
            <CodeCard />
            <motion.ul className="facts" variants={stagger(0.1, 0.2)} initial="hidden" whileInView="show" viewport={viewport}>
              {aboutFacts.map((f) => (
                <FactCard key={f.label} value={f.value} label={f.label} />
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <Journey steps={journey} />
      <Services items={services} />
      <Recruiter strengths={strengths} />
    </PageTransition>
  );
}
