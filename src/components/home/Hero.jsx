import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '../../data/site';
import { resumeLink } from '../../data/resume';
import { ease } from '../../lib/motion';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useTheme } from '../../context/ThemeContext';
import MagneticButton from '../common/MagneticButton';
import SocialLinks from '../common/SocialLinks';
import GlowBackground from '../common/GlowBackground';

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  const ref = useRef(null);
  const fine = useFinePointer();
  const { reduceMotion } = useTheme();
  const interactive = fine && !reduceMotion;

  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const blobsY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse-reactive glow (desktop only)
  const { x, y } = useMousePosition(ref, { enabled: interactive });
  const gx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });
  const gy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 });

  const nameWords = [profile.firstName.toUpperCase(), profile.lastName.toUpperCase()];

  return (
    <section className="hero" ref={ref} aria-labelledby="home-title">
      <GlowBackground parallaxY={blobsY} spotlight={interactive ? { x: gx, y: gy } : null} />

      <motion.div className="container hero__content" style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
        <motion.p className="hero__status" {...rise(0.1)}>
          <span className="status-dot" aria-hidden="true" />
          Open to full-time &amp; freelance work
        </motion.p>

        <h1 className="hero__name" id="home-title" aria-label={profile.name}>
          {nameWords.map((word, i) => (
            <span className="hero__name-line" key={word} aria-hidden="true">
              <motion.span
                className="hero__name-inner"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.12 }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero__roles" {...rise(0.55)}>
          <span className="hero__role">{profile.primaryRole}</span>
          <span className="hero__role-sep" aria-hidden="true" />
          <span className="hero__role hero__role--alt">{profile.secondaryRole}</span>
        </motion.p>

        <motion.p className="hero__headline" {...rise(0.7)}>
          {profile.headline}
        </motion.p>
        <motion.p className="hero__tagline" {...rise(0.8)}>
          {profile.description}
        </motion.p>

        <motion.div className="hero__ctas" {...rise(0.95)}>
          <MagneticButton to="/projects">
            Explore Projects <ArrowRight className="icon-right" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton variant="ghost" {...resumeLink}>
            <Download className="icon-down" aria-hidden="true" /> Download Resume
          </MagneticButton>
        </motion.div>

        <motion.div className="hero__socials" {...rise(1.1)}>
          <SocialLinks />
        </motion.div>
      </motion.div>

      <motion.p className="hero__corner hero__corner--left" {...rise(1.3)} aria-hidden="true">
        Full-stack · AI · Design engineering
      </motion.p>
      <motion.p className="hero__corner hero__corner--right" {...rise(1.3)} aria-hidden="true">
        Portfolio — {new Date().getFullYear()}
      </motion.p>
    </section>
  );
}
