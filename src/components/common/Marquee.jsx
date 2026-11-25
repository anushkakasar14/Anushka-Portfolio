import { Sparkle } from 'lucide-react';

const words = [
  'Full-Stack Engineering',
  'AI Tools',
  'Automation',
  'Design Engineering',
  'Creative Technology',
  'Problem Solving',
];

// Decorative band between hero and content. Hidden from assistive tech.
export default function Marquee() {
  const group = (key) => (
    <div className="marquee__group" key={key}>
      {words.map((w) => (
        <span className="marquee__item" key={w}>
          {w}
          <Sparkle className="marquee__star" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{[group('a'), group('b')]}</div>
    </div>
  );
}
