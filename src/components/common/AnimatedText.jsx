import { motion } from 'framer-motion';
import { ease } from '../../lib/motion';

/**
 * Splits text into words that rise from a masked line.
 * `lines` may be an array: each entry renders on its own line and
 * can be an object { text, className } for styled lines.
 */
export default function AnimatedText({
  as: Tag = 'span',
  lines,
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  trigger = 'inView',
  ...rest
}) {
  const MotionTag = motion[Tag] || motion.span;
  const list = (lines || [text]).map((l) => (typeof l === 'string' ? { text: l } : l));
  const label = list.map((l) => l.text).join(' ');
  let wordIndex = 0;

  const animateProps =
    trigger === 'load'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <MotionTag className={`split ${className}`} aria-label={label} {...animateProps} {...rest}>
      {list.map((line, li) => (
        <span className={`line ${line.className || ''}`} key={li} aria-hidden="true">
          {line.text.split(' ').map((word, wi, arr) => {
            const i = wordIndex++;
            return (
              <span className="split__word" key={wi}>
                <motion.span
                  className="split__inner"
                  variants={{
                    hidden: { y: '110%', rotate: 2 },
                    show: { y: '0%', rotate: 0, transition: { duration: 1, ease, delay: delay + i * stagger } },
                  }}
                >
                  {word}
                  {wi < arr.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}
