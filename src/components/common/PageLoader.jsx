import { motion } from 'framer-motion';
import { profile } from '../../data/site';

// Suspense fallback while a route chunk downloads.
export default function PageLoader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <motion.div
        className="loader__mark"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="loader__ring" aria-hidden="true" />
        <span className="loader__initials" aria-hidden="true">
          {profile.initials}
        </span>
      </motion.div>
      <span className="loader__text">Loading</span>
    </div>
  );
}
