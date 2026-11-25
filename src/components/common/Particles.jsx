import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// Lightweight ambient particles on a single canvas. Pauses off-screen,
// caps DPR, uses fewer particles on phones, draws one still frame when static.
export default function Particles({ className = '', animate = true }) {
  const [ref, visible] = useIntersectionObserver();
  const visibleRef = useRef(true);
  visibleRef.current = visible;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const colors = ['243,204,222', '214,168,196', '186,136,174'];
    let w = 0;
    let h = 0;
    let raf = 0;
    let particles = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 22 : 46;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        a: Math.random() * 0.5 + 0.15,
        t: Math.random() * Math.PI * 2,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };

    const draw = (step) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (step) {
          p.x += p.vx;
          p.y += p.vy;
          p.t += 0.015;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a * (0.6 + 0.4 * Math.sin(p.t))})`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (visibleRef.current && !document.hidden) draw(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (animate) raf = requestAnimationFrame(loop);
    else draw(false);

    const ro = new ResizeObserver(() => {
      resize();
      if (!animate) draw(false);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [animate, ref]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
