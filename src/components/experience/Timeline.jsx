import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ease } from '../../lib/motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const inView = { once: true, margin: '0px 0px -20% 0px' };

/** Vertical timeline whose line fills as the reader scrolls through it. */
export default function Timeline({ items }) {
  const ref = useRef(null);
  const progress = useScrollProgress({ target: ref, offset: ['start 75%', 'end 55%'] });

  return (
    <div className="timeline" ref={ref}>
      <span className="timeline__track" aria-hidden="true">
        <motion.span className="timeline__fill" style={{ scaleY: progress }} />
      </span>
      <ol className="timeline__list">
        {items.map((item, i) => (
          <motion.li
            className="tl-item"
            key={item.title}
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, ease, delay: i * 0.05 }}
          >
            <p className={`tl-item__period ${/^\d/.test(item.period) ? '' : 'tl-item__period--word'}`}>{item.period}</p>
            <motion.span
              className="tl-item__node"
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
            />
            <div className="tl-card">
              <p className="tl-card__kind">{item.kind}</p>
              <h2 className="tl-card__title">{item.title}</h2>
              <p className="tl-card__text">{item.text}</p>
              {item.link && (
                <Link to={item.link} className="text-link tl-card__link">
                  Read the case study <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
