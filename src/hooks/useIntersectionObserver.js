import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isIntersecting]. With `once`, the observer disconnects after
 * the first hit (ideal for one-shot reveals and count-ups).
 */
export function useIntersectionObserver({ rootMargin = '0px', threshold = 0, once = false } = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, isIntersecting];
}
