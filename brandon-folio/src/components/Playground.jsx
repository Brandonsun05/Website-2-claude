import { useCallback, useEffect, useMemo, useState } from 'react';
import { art, links } from '../data.js';
import Reveal from './Reveal.jsx';
import InfiniteRow from './InfiniteRow.jsx';

export default function Playground() {
  const [idx, setIdx] = useState(null);
  const ig = links.find((l) => l.label === 'Instagram');

  // split into two rows that scroll in opposite directions
  const [rowA, rowB] = useMemo(() => {
    const withIndex = art.map((a, index) => ({ ...a, index }));
    return [withIndex.filter((_, i) => i % 2 === 0), withIndex.filter((_, i) => i % 2 === 1)];
  }, []);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d) => setIdx((i) => (i + d + art.length) % art.length), []);
  const pick = useCallback((i) => setIdx(i), []);

  useEffect(() => {
    if (idx === null) return;
    document.body.classList.add('no-scroll');
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [idx, close, step]);

  return (
    <section className="section playground" id="playground">
      <div className="container">
        <div className="playground__head">
          <div className="section__head">
            <Reveal as="p" className="section__kicker mono">(03) — playground</Reveal>
            <Reveal as="h2" className="section__title" delay={80}>
              Art <em>making</em>
            </Reveal>
            <Reveal as="p" className="section__sub" delay={140}>
              Cover art and personal experiments — 3D, collage, illustration and glitch. Drag to browse, click to open.
            </Reveal>
          </div>
          <Reveal delay={160}>
            <a href={ig.href} target="_blank" rel="noreferrer" className="btn btn--pink">
              More on {ig.handle} ↗
            </a>
          </Reveal>
        </div>
      </div>

      {/* full-bleed rows, edge to edge */}
      <div className="playground__rows">
        <InfiniteRow items={rowA} speed={42} direction={1} onPick={pick} />
        <InfiniteRow items={rowB} speed={34} direction={-1} onPick={pick} />
      </div>

      {idx !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={art[idx].title} onClick={close}>
          <img src={art[idx].img} alt={art[idx].title} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">←</button>
          <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">→</button>
          <button className="lightbox__btn lightbox__close" onClick={close} aria-label="Close" autoFocus>✕</button>
          <p className="lightbox__cap mono">{idx + 1} / {art.length}</p>
        </div>
      )}
    </section>
  );
}
