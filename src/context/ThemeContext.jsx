import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Global UI preferences. Today that is motion: the OS setting is respected
 * by default, and visitors can override it from the footer. Everything that
 * animates (Lenis, cursor, particles, Framer Motion, CSS keyframes) reads
 * `reduceMotion` from here, so there is one switch for the whole app.
 */
const ThemeContext = createContext(null);
const STORAGE_KEY = 'ak-motion-preference';

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  } catch {
    return 'system';
  }
};

export function ThemeProvider({ children }) {
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [motionPreference, setMotionPreference] = useState(readStored);

  const reduceMotion = motionPreference === 'reduced' || (motionPreference === 'system' && systemReduced);

  // CSS hook for keyframe animations that live outside React.
  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? 'reduced' : 'full';
  }, [reduceMotion]);

  const toggleMotion = useCallback(() => {
    setMotionPreference(() => {
      const next = reduceMotion ? 'full' : 'reduced';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — preference lasts for this visit only */
      }
      return next;
    });
  }, [reduceMotion]);

  const value = useMemo(
    () => ({ theme: 'dark', motionPreference, reduceMotion, toggleMotion }),
    [motionPreference, reduceMotion, toggleMotion]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
