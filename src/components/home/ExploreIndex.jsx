import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ease, viewport } from '../../lib/motion';

/** A compact, data-driven index of the site's pages below the hero. */
export default function ExploreIndex({ items }) {
  return (
    <section className="explore container" aria-labelledby="explore-title">
      <h2 id="explore-title" className="explore__title">
        Explore
      </h2>
      <ol className="explore__list">
        {items.map((item, i) => (
          <motion.li
            key={item.path}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease, delay: i * 0.06 }}
          >
            <Link to={item.path} className="explore__item">
              <span className="explore__num">0{i + 1}</span>
              <span className="explore__label">{item.label}</span>
              <span className="explore__blurb">{item.blurb}</span>
              <ArrowUpRight className="explore__arrow" aria-hidden="true" />
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
