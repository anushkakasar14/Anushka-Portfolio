import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navItems, profile } from '../../data/site';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { ease } from '../../lib/motion';
import MagneticButton from './MagneticButton';
import SocialLinks from './SocialLinks';

function DesktopLink({ item }) {
  return (
    <NavLink to={item.path} end={item.path === '/'} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span layoutId="nav-active" className="nav__active" transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
              <span className="nav__underline" />
            </motion.span>
          )}
          <span className="nav__label">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 24;
    setScrolled((s) => (s === next ? s : next));
  });

  // Any route change closes the menu (covers back/forward too).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While open: lock scroll, focus the first link, close on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    lockScroll();
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [menuOpen]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 961px)');
    const onChange = () => mql.matches && setMenuOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <Link to="/" className="brand" aria-label={`${profile.name}, home`}>
            <span className="brand__mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span className="brand__name">{profile.name}</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {navItems.map((item) => (
                <li key={item.path}>
                  <DesktopLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__right">
            <MagneticButton to="/contact" size="small" className="nav__cta">
              Let&rsquo;s Talk <ArrowUpRight className="icon-arrow" aria-hidden="true" />
            </MagneticButton>
            <button
              ref={burgerRef}
              type="button"
              className="burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 36px)' }}
            transition={{ duration: 0.6, ease }}
          >
            <nav aria-label="Mobile">
              <ul className="mobile-menu__list">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.55, ease, delay: 0.12 + i * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`}
                      onClick={closeMenu}
                    >
                      <small>0{i + 1}</small>
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <Link to="/contact" className="btn btn--primary" onClick={closeMenu}>
                <span className="btn__label">
                  Let&rsquo;s Talk <ArrowUpRight className="icon-arrow" aria-hidden="true" />
                </span>
              </Link>
              <SocialLinks />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
