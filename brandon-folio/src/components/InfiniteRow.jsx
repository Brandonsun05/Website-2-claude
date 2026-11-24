import { useEffect, useRef } from 'react';

/*
  Endless horizontal strip.
  - Auto-scrolls (direction = 1 → left, -1 → right).
  - Drag with mouse / swipe with finger to scroll by hand; it carries a little momentum.
  - Pauses while hovered (mouse) so a piece can be looked at.
  - A tap/click that didn't drag calls onPick(index).
  The item list is rendered three times; the offset wraps by one set's width,
  so the loop never shows a seam at any window size.
*/
export default function InfiniteRow({ items, speed = 40, direction = 1, onPick }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let setW = 1;            // width of one copy of the items
    let x = 0;               // current offset (px, negative = moved left)
    let v = 0;               // manual velocity after a fling (px/s)
    let hover = false;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let drag = null;         // { startX, startOff, lastX, lastT, moved, pid }

    const measure = () => {
      setW = track.scrollWidth / 3 || 1;
    };
    const wrapX = () => {
      // keep x within (-2·setW, -setW] so there's always content on both sides
      while (x > -setW) x -= setW;
      while (x <= -2 * setW) x += setW;
    };
    const paint = () => {
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!drag) {
        const auto = hover || calm ? 0 : -speed * direction;
        // fling momentum eases back into the auto speed
        v += (auto - v) * Math.min(1, dt * 2.2);
        x += v * dt;
        wrapX();
        paint();
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // ── pointer: drag / swipe / click
    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { startX: e.clientX, startOff: x, lastX: e.clientX, lastT: performance.now(), moved: false, pid: e.pointerId, vx: 0 };
    };
    const onMove = (e) => {
      if (!drag || e.pointerId !== drag.pid) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        wrap.setPointerCapture(e.pointerId);
        wrap.classList.add('irow--drag');
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT) / 1000;
      drag.vx = drag.vx * 0.6 + ((e.clientX - drag.lastX) / dt) * 0.4;
      drag.lastX = e.clientX;
      drag.lastT = now;
      x = drag.startOff + dx;
      wrapX();
      // keep startOff consistent after wrapping
      drag.startOff = x - dx;
      paint();
    };
    const onUp = (e) => {
      if (!drag || e.pointerId !== drag.pid) return;
      if (drag.moved) {
        v = Math.max(-3000, Math.min(3000, drag.vx));
      } else {
        const item = e.target.closest('[data-i]');
        if (item && onPick) onPick(Number(item.dataset.i));
      }
      wrap.classList.remove('irow--drag');
      drag = null;
    };
    const onEnter = (e) => { if (e.pointerType === 'mouse') hover = true; };
    const onLeave = (e) => { if (e.pointerType === 'mouse') hover = false; };

    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerup', onUp);
    wrap.addEventListener('pointercancel', onUp);
    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerleave', onLeave);

    // keyboard: Enter on a focused item opens it
    const onKey = (e) => {
      const item = e.target.closest('[data-i]');
      if (item && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onPick?.(Number(item.dataset.i));
      }
    };
    wrap.addEventListener('keydown', onKey);

    const ro = new ResizeObserver(() => { measure(); wrapX(); paint(); });
    ro.observe(track);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);

    measure();
    x = -setW;
    paint();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerup', onUp);
      wrap.removeEventListener('pointercancel', onUp);
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('keydown', onKey);
    };
  }, [items, speed, direction, onPick]);

  return (
    <div className="irow" ref={wrapRef}>
      <ul className="irow__track" ref={trackRef}>
        {[0, 1, 2].map((copy) =>
          items.map((a, i) => (
            <li
              key={`${copy}-${a.id}`}
              className="irow__item"
              data-i={a.index}
              tabIndex={copy === 1 ? 0 : -1}
              aria-hidden={copy !== 1}
              role="button"
              aria-label={`View ${a.title}`}
              style={{ '--r': `${((i * 37) % 7) - 3}deg` }}
            >
              <img src={a.img} alt={copy === 1 ? a.title : ''} loading="lazy" draggable="false" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
