import { useEffect, useRef } from 'react';

// Small trailing blob cursor — desktop (fine pointer) only.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!fine || calm || !el) return;

    let x = -100, y = -100, cx = x, cy = y, raf;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      el.classList.toggle('cursor--hover', !!(t.closest && t.closest('a, button')));
    };
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    el.classList.add('cursor--on');
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
