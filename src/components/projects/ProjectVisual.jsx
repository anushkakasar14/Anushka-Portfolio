import { memo, useId } from 'react';
import { CheckCircle2, MessageCircle, ImageIcon, SlidersHorizontal, BrainCircuit, Target } from 'lucide-react';

/* ---------------------------------------------------------
   Illustrated, code-drawn project visuals (no image weight).
   Swap for real screenshots in /src/assets/images if desired.
   --------------------------------------------------------- */

function FabricPattern({ variant = 'flower', bg = '#9e6899', fg = '#fbf4f0', accent = '#f3ccde' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {variant === 'flower' && (
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
            <rect width="40" height="40" fill={bg} />
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="20" cy="13" rx="3.6" ry="7" fill={fg} opacity=".92" transform={`rotate(${r} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="2.6" fill={accent} />
            <circle cx="0" cy="0" r="1.6" fill={fg} opacity=".5" />
            <circle cx="40" cy="40" r="1.6" fill={fg} opacity=".5" />
          </pattern>
        )}
        {variant === 'stripe' && (
          <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="16" height="16" fill={bg} />
            <rect width="6" height="16" fill={fg} opacity=".55" />
            <rect x="9" width="1.5" height="16" fill={accent} />
          </pattern>
        )}
        {variant === 'dots' && (
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill={bg} />
            <circle cx="7" cy="7" r="2.4" fill={fg} opacity=".8" />
          </pattern>
        )}
        {variant === 'wave' && (
          <pattern id={id} width="30" height="16" patternUnits="userSpaceOnUse">
            <rect width="30" height="16" fill={bg} />
            <path d="M0 8 Q7.5 0 15 8 T30 8" fill="none" stroke={fg} strokeWidth="2" opacity=".75" />
            <path d="M0 14 Q7.5 6 15 14 T30 14" fill="none" stroke={accent} strokeWidth="1" opacity=".6" />
          </pattern>
        )}
      </defs>
      <rect width="120" height="120" fill={`url(#${id})`} />
    </svg>
  );
}

function ParijatakVisual() {
  return (
    <div className="pv pv--parijatak" aria-hidden="true">
      <div className="pv__window">
        <div className="pv__chrome">
          <i />
          <i />
          <i />
          <span className="pv__url">studioparijatak.com</span>
        </div>
        <div className="pv__site">
          <div className="pv__nav">
            <span className="pv__logo">Parijatak</span>
            <span className="pv__navlinks">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="pv__hero">
            <div>
              <p className="pv__headline">
                Hand-crafted <em>home</em> textiles
              </p>
              <div className="pv__lines">
                <i />
                <i />
              </div>
              <span className="pv__pill">Shop collection</span>
            </div>
            <div className="pv__fabric">
              <FabricPattern variant="flower" />
            </div>
          </div>
          <div className="pv__products">
            <div className="pv__product">
              <FabricPattern variant="stripe" bg="#d6a8c4" fg="#fbf4f0" accent="#5b3765" />
            </div>
            <div className="pv__product">
              <FabricPattern variant="dots" bg="#5b3765" fg="#f3ccde" />
            </div>
            <div className="pv__product">
              <FabricPattern variant="wave" bg="#ba88ae" fg="#fbf4f0" accent="#5b3765" />
            </div>
            <div className="pv__product">
              <FabricPattern variant="flower" bg="#f3ccde" fg="#fff" accent="#9e6899" />
            </div>
          </div>
        </div>
      </div>
      <div className="pv__float pv__float--chat">
        <span className="pv__wa">
          <MessageCircle />
        </span>
        <span>Hi! Is this table runner available?</span>
      </div>
      <div className="pv__float pv__float--inq">
        <CheckCircle2 />
        <span>Inquiry received</span>
      </div>
    </div>
  );
}

function Fundus() {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor="#c9799f" />
          <stop offset=".55" stopColor="#8e4a7f" />
          <stop offset=".85" stopColor="#4b2153" />
          <stop offset="1" stopColor="#24102a" />
        </radialGradient>
        <radialGradient id={`${id}-disc`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff4f8" />
          <stop offset=".5" stopColor="#f3ccde" />
          <stop offset="1" stopColor="#f3ccde" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-mac`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3a1640" stopOpacity=".9" />
          <stop offset="1" stopColor="#3a1640" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill={`url(#${id}-bg)`} />
      <circle cx="78" cy="104" r="20" fill={`url(#${id}-mac)`} />
      <g fill="none" stroke="#5b1f4d" strokeLinecap="round" opacity=".85">
        <path d="M132 96 C110 70 80 58 40 54" strokeWidth="2.4" />
        <path d="M132 96 C112 124 86 138 44 150" strokeWidth="2.4" />
        <path d="M132 96 C140 60 150 40 160 22" strokeWidth="1.8" />
        <path d="M132 96 C146 128 152 150 158 180" strokeWidth="1.8" />
        <path d="M96 70 C88 84 74 90 58 92" strokeWidth="1.1" />
        <path d="M98 130 C90 118 76 114 60 116" strokeWidth="1.1" />
        <path d="M70 58 C60 40 50 32 36 28" strokeWidth="1" />
        <path d="M74 144 C64 160 54 168 40 174" strokeWidth="1" />
        <path d="M150 50 C170 54 182 66 190 80" strokeWidth="1" />
        <path d="M150 150 C170 146 182 134 190 120" strokeWidth="1" />
      </g>
      <g fill="none" stroke="#e1a3c4" strokeLinecap="round" opacity=".55">
        <path d="M132 100 C108 76 80 64 42 62" strokeWidth="1.2" />
        <path d="M132 100 C112 128 86 142 46 158" strokeWidth="1.2" />
      </g>
      <circle cx="132" cy="98" r="15" fill={`url(#${id}-disc)`} />
      <g fill="#f3ccde" opacity=".7">
        <circle cx="60" cy="80" r="1.6" />
        <circle cx="96" cy="120" r="1.2" />
        <circle cx="70" cy="128" r="1.4" />
      </g>
    </svg>
  );
}

const retinaSteps = [
  { icon: ImageIcon, label: 'Fundus image input' },
  { icon: SlidersHorizontal, label: 'Pre-processing' },
  { icon: BrainCircuit, label: 'Deep learning model' },
  { icon: Target, label: 'Stage prediction' },
];

function RetinaVisual() {
  return (
    <div className="pv pv--retina" aria-hidden="true">
      <div className="pv__scope">
        <div className="pv__fundus">
          <Fundus />
        </div>
        <div className="pv__scan" />
        <span className="pv__bracket pv__bracket--tl" />
        <span className="pv__bracket pv__bracket--tr" />
        <span className="pv__bracket pv__bracket--bl" />
        <span className="pv__bracket pv__bracket--br" />
      </div>
      <div className="pv__panel">
        <span className="pv__panel-title">Prediction workflow</span>
        {retinaSteps.map(({ icon: I, label }) => (
          <div className="pv__step" key={label}>
            <I />
            {label}
          </div>
        ))}
        <span className="pv__panel-title">Output classes</span>
        <div className="pv__classes">
          <span>No DR</span>
          <span>Mild</span>
          <span className="is-on">Moderate</span>
          <span>Severe</span>
          <span>PDR</span>
        </div>
      </div>
    </div>
  );
}

const visuals = { parijatak: ParijatakVisual, retina: RetinaVisual };

function ProjectVisual({ kind }) {
  const Visual = visuals[kind] || ParijatakVisual;
  return <Visual />;
}

export default memo(ProjectVisual);
