import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

// Thin reading-progress bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const progress = useScrollProgress();
  return <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />;
}
