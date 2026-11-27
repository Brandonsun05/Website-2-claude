import { useState } from 'react';
import { works, catLabel, selectedWorks } from '../data.js';
import Reveal from './Reveal.jsx';
import WorkModal from './WorkModal.jsx';

// The four projects to see first. Order and choice live in data.js → selectedWorks.
const picks = selectedWorks.map((id) => works.find((w) => w.id === id)).filter(Boolean);

export default function SelectedWorks() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section selected" id="selected">
      <div className="container">
        <div className="section__head selected__head">
          <Reveal as="p" className="section__kicker mono">(01) — selected works</Reveal>
          <Reveal as="h2" className="section__title" delay={80}>
            Selected <em>works</em>
          </Reveal>
          <Reveal as="p" className="section__sub" delay={140}>
            Four projects that show how I work — open one for the full story.
          </Reveal>
        </div>

        <div className="feat__grid">
          {picks.map((w, i) => (
            <Reveal key={w.id} className="feat" delay={(i % 2) * 100}>
              <button className="feat__btn" onClick={() => setOpen(w)} aria-label={`Open ${w.title}`}>
                <div className="feat__media">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    style={w.coverPos ? { objectPosition: w.coverPos } : undefined}
                  />
                  <span className={`card__tag tag--${w.cat} mono`}>{catLabel[w.cat]}</span>
                  <span className="feat__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="feat__info">
                  <div className="feat__row">
                    <h3 className="feat__title">{w.title}</h3>
                    <span className="feat__cta mono">
                      View project <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <p className="feat__meta mono">{w.meta}</p>
                  {w.tagline && <p className="feat__tagline">“{w.tagline}”</p>}
                  {w.tags?.length > 0 && (
                    <ul className="feat__tags">
                      {w.tags.slice(0, 3).map((t) => (
                        <li key={t} className="mono">{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="selected__more">
          <a href="#projects" className="btn btn--lime btn--lg">
            View all projects <span aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </div>

      {open && <WorkModal work={open} list={picks} onNavigate={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
