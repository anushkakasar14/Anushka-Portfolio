import { Link } from 'react-router-dom';
import { ArrowUp, Pause, Play } from 'lucide-react';
import { navItems, profile } from '../../data/site';
import { scrollToTop } from '../../lib/scroll';
import { useTheme } from '../../context/ThemeContext';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const { reduceMotion, toggleMotion } = useTheme();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__big" aria-hidden="true">
          Anushka <em>Kasar</em>
        </p>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__row">
          <p className="footer__meta">
            © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React.
          </p>
          <SocialLinks />
          <div className="footer__actions">
            <button type="button" className="footer__pill" onClick={toggleMotion} aria-pressed={reduceMotion}>
              {reduceMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              {reduceMotion ? 'Enable motion' : 'Reduce motion'}
            </button>
            <button type="button" className="footer__top" onClick={() => scrollToTop()}>
              Back to top
              <span>
                <ArrowUp aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
