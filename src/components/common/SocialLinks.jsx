import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '../../data/site';

const iconFor = { github: Github, linkedin: Linkedin, email: Mail };

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`socials ${className}`} aria-label="Social links">
      {socials.map((s) => {
        const Icon = iconFor[s.id];
        const external = s.id !== 'email';
        return (
          <li key={s.id} className="social-wrap">
            <a
              className="social"
              href={s.href}
              aria-label={external ? `${s.label} (opens in a new tab)` : `Email ${s.handle}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon aria-hidden="true" />
            </a>
            <span className="social__tip" aria-hidden="true">
              {s.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
