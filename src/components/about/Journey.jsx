import { motion } from 'framer-motion';
import { ease, viewport } from '../../lib/motion';
import SectionHeading from '../common/SectionHeading';

/** Horizontal story strip: each step slides in after the previous one. */
export default function Journey({ steps }) {
  return (
    <section className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading
          id="journey-title"
          index="02"
          eyebrow="Development journey"
          lines={['How I got', { text: 'here.', className: 'accent' }]}
        />
        <ol className="journey__track">
          {steps.map((s, i) => (
            <motion.li
              key={s.step}
              className="journey__step"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
            >
              <span className="journey__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="journey__title">{s.step}</h3>
              <p className="journey__text">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
