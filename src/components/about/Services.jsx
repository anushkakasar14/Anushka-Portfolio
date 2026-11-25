import { motion } from 'framer-motion';
import { Icon } from '../../lib/icons';
import { ease } from '../../lib/motion';
import SectionHeading from '../common/SectionHeading';

// 4-column bento: wide cards at positions 0 and 5 make two balanced rows.
const WIDE = new Set([0, 5]);

export default function Services({ items }) {
  return (
    <section className="section services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          index="03"
          eyebrow="What I build"
          lines={['Thoughtful work,', { text: 'built with care.', className: 'accent' }]}
          intro="From a first sketch to a deployed product — here is where I can help."
        />
        <ul className="services__grid">
          {items.map((s, i) => (
            <motion.li
              key={s.title}
              className={`service ${WIDE.has(i) ? 'service--wide' : ''}`}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.08 }}
            >
              <span className={`service__deco service__deco--${s.variant}`} aria-hidden="true" />
              <span className="service__num" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="service__icon">
                <Icon name={s.icon} />
              </span>
              <div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__text">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
