import AnimatedText from './AnimatedText';
import Reveal from './Reveal';

/**
 * Eyebrow + animated serif title + optional intro.
 * `level` sets the heading element: pages use h1 once, sections use h2.
 * `trigger="load"` animates immediately (page headers above the fold).
 */
export default function SectionHeading({ index, eyebrow, lines, intro, level = 2, trigger = 'inView', id, className = '' }) {
  return (
    <div className={`section-heading ${className}`}>
      <Reveal as="p" className="eyebrow" y={12}>
        {index && <span className="eyebrow__index">{index}</span>}
        <span className="eyebrow__line" aria-hidden="true" />
        <span>{eyebrow}</span>
      </Reveal>
      <AnimatedText
        as={`h${level}`}
        id={id}
        trigger={trigger}
        delay={trigger === 'load' ? 0.15 : 0}
        className={`section-heading__title ${level === 1 ? 'section-heading__title--page' : ''}`}
        lines={lines}
      />
      {intro && (
        <Reveal as="p" className="section-heading__intro" delay={0.15}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
