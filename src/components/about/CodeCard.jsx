import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ease, viewport } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

// A profile written as a JS object — rendered from data, not hand-coloured spans.
const fields = [
  { key: 'role', value: "'Full-Stack Engineer'" },
  { key: 'focus', value: ['AI', 'automation', 'creative tech'] },
  { key: 'education', value: "'B.Tech · CS & Design Eng.'" },
  { key: 'builds', value: "'practical digital products'" },
  { key: 'alwaysLearning', value: true },
];

function Value({ value }) {
  if (Array.isArray(value)) {
    return (
      <>
        <span className="tok-p">[</span>
        {value.map((v, i) => (
          <span key={v}>
            <span className="tok-s">&apos;{v}&apos;</span>
            {i < value.length - 1 && <span className="tok-p">, </span>}
          </span>
        ))}
        <span className="tok-p">]</span>
      </>
    );
  }
  if (typeof value === 'boolean') return <span className="tok-b">{String(value)}</span>;
  return <span className="tok-s">{value}</span>;
}

export default function CodeCard() {
  const ref = useRef(null);
  const { reduceMotion } = useTheme();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.figure
      ref={ref}
      className="code-card"
      style={reduceMotion ? undefined : { y }}
      initial={{ opacity: 0, rotate: -2, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, rotate: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{ duration: 1.1, ease }}
      aria-label="A short profile written as a JavaScript object"
    >
      <div className="code-card__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="code-card__file">anushka.js</span>
      </div>
      <pre>
        <code>
          <span className="tok-k">const</span> <span className="tok-v">anushka</span> <span className="tok-p">= {'{'}</span>
          {fields.map((f) => (
            <span key={f.key}>
              {'\n  '}
              <span className="tok-v">{f.key}</span>
              <span className="tok-p">: </span>
              <Value value={f.value} />
              <span className="tok-p">,</span>
            </span>
          ))}
          {'\n'}
          <span className="tok-p">{'};'}</span>
          {'\n\n'}
          <span className="tok-c">{'// next: something meaningful'}</span>
          {'\n'}
          <span className="tok-v">anushka</span>
          <span className="tok-p">.</span>
          <span className="tok-k">build</span>
          <span className="tok-p">()</span>
          <span className="code-caret" aria-hidden="true" />
        </code>
      </pre>
    </motion.figure>
  );
}
