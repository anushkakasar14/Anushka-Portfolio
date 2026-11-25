import { memo } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';
import Particles from './Particles';

/**
 * Layered ambient backdrop: drifting gradient blobs, grid, orbit ring,
 * floating glass shapes, particles and an optional cursor spotlight.
 * Motion values come from the parent, so this never re-renders on move.
 */
function GlowBackground({ parallaxY, spotlight, particles = true, compact = false }) {
  const { reduceMotion } = useTheme();
  return (
    <div className={`glow-bg ${compact ? 'glow-bg--compact' : ''}`} aria-hidden="true">
      <motion.div className="glow-bg__blobs" style={reduceMotion || !parallaxY ? undefined : { y: parallaxY }}>
        <div className="blob blob--a" />
        <div className="blob blob--b" />
        <div className="blob blob--c" />
      </motion.div>
      <div className="glow-bg__grid" />
      {spotlight && <motion.div className="glow-bg__spotlight" style={{ x: spotlight.x, y: spotlight.y }} />}
      {!compact && (
        <>
          <motion.div
            className="glow-bg__orbit"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease, delay: 0.6 }}
          >
            <div className="glow-bg__orbit-spin" />
          </motion.div>
          <div className="glow-bg__shape glow-bg__shape--1" />
          <div className="glow-bg__shape glow-bg__shape--2" />
          <div className="glow-bg__shape glow-bg__shape--3" />
        </>
      )}
      {particles && <Particles className="glow-bg__particles" animate={!reduceMotion} />}
    </div>
  );
}

export default memo(GlowBackground);
