import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '../../data/site';
import { resumeLink } from '../../data/resume';
import { Icon } from '../../lib/icons';
import { fadeUp, stagger, viewport } from '../../lib/motion';
import SectionHeading from '../common/SectionHeading';
import MagneticButton from '../common/MagneticButton';
import Reveal from '../common/Reveal';

/** Recruiter-focused summary: strengths on the left, facts at a glance on the right. */
export default function Recruiter({ strengths }) {
  return (
    <section className="section recruiter" aria-labelledby="recruiter-title">
      <div className="container">
        <Reveal className="recruiter__panel" variant="blur">
          <div className="recruiter__grid">
            <div>
              <SectionHeading
                id="recruiter-title"
                index="04"
                eyebrow="For recruiters"
                lines={['Why work', { text: 'with me?', className: 'accent' }]}
              />
              <motion.ul className="strengths" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewport}>
                {strengths.map((s) => (
                  <motion.li className="strength" key={s.title} variants={fadeUp}>
                    <Icon name={s.icon} />
                    {s.title}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <Reveal className="summary-card" delay={0.15}>
              <p className="summary-card__title">At a glance</p>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{profile.primaryRole}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>{profile.secondaryRole}</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>B.Tech, Computer Science &amp; Design Engineering (2026)</dd>
                </div>
                <div>
                  <dt>Featured work</dt>
                  <dd>Studio Parijatak (live) · Diabetic Retinopathy DL project</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a className="text-link" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="summary-card__open">
                <span className="status-dot" aria-hidden="true" />
                {profile.availability}
              </p>
              <div className="summary-card__actions">
                <MagneticButton {...resumeLink}>
                  <Download className="icon-down" aria-hidden="true" /> Download Resume
                </MagneticButton>
                <MagneticButton to="/contact" variant="ghost">
                  Get in touch <ArrowRight className="icon-right" aria-hidden="true" />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
