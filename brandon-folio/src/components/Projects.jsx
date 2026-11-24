import { useRef, useState } from 'react';
import { works, categories, catLabel } from '../data.js';
import Reveal from './Reveal.jsx';
import WorkModal from './WorkModal.jsx';

const byCat = Object.fromEntries(categories.map((c) => [c.id, works.filter((w) => w.cat === c.id)]));

// Desktop rows: [7,5] → [5,7] → [4,4,4]. Leftovers fill the row.
function layout(n) {
  const out = [];
  const rows = [[7, 5], [5, 7], [4, 4, 4]];
  let i = 0;
  let r = 0;
  while (i < n) {
    let row = rows[r % rows.length];
    const left = n - i;
    if (left < row.length) row = left === 1 ? [12] : [7, 5];
    row.forEach((span) => out.push({ span, size: row.length === 3 ? 'md' : span === 12 ? 'xl' : 'lg' }));
    i += row.length;
    r += 1;
  }
  return out.map((o, idx) => ({ ...o, wideTablet: idx % 3 === 2 || (idx === n - 1 && idx % 3 === 0) }));
}

export default function Projects() {
  const [active, setActive] = useState(categories[0].id);
  const [open, setOpen] = useState(null);
  const listRef = useRef(null);

  const list = byCat[active];
  const spans = layout(list.length);
  const cat = categories.find((c) => c.id === active);

  const pick = (id) => {
    setActive(id);
    // On small screens, bring the list into view after choosing a category.
    if (window.matchMedia('(max-width: 720px)').matches) {
      requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section__head">
          <Reveal as="p" className="section__kicker mono">(02) — projects</Reveal>
          <Reveal as="h2" className="section__title" delay={80}>
            Things I&apos;ve <em>made</em>
          </Reveal>
          <Reveal as="p" className="section__sub" delay={140}>
            Pick a discipline — the work shows up below.
          </Reveal>
        </div>

        <div className="cats" role="tablist" aria-label="Project categories">
          {categories.map((c, i) => {
            const items = byCat[c.id];
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={on}
                aria-controls="project-list"
                className={`cat cat--${c.color} ${on ? 'cat--on' : ''}`}
                onClick={() => pick(c.id)}
              >
                <span className="cat__preview" aria-hidden="true">
                  {items.slice(0, 3).map((w, k) => (
                    <img key={w.id} src={w.img} alt="" loading="lazy" style={{ '--k': k }} />
                  ))}
                </span>
                <span className="cat__num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="cat__label">{c.label}</span>
                <span className="cat__blurb">{c.blurb}</span>
                <span className="cat__count mono">{items.length} {items.length === 1 ? 'project' : 'projects'}</span>
              </button>
            );
          })}
        </div>

        <div className="plist" id="project-list" role="tabpanel" aria-labelledby={`tab-${active}`} ref={listRef}>
          <div className="plist__head">
            <h3 className="plist__title">{cat.label}</h3>
            <span className="mono plist__count">{list.length} {list.length === 1 ? 'project' : 'projects'} · click a card for details</span>
          </div>

          <div className="works__grid" key={active}>
            {list.map((w, i) => (
              <Reveal
                key={w.id}
                className={`card card--${spans[i].size} ${spans[i].wideTablet ? 'card--wide-t' : ''}`}
                style={{ '--span': spans[i].span }}
                delay={(i % 3) * 80}
              >
                <button className="card__btn" onClick={() => setOpen(w)} aria-label={`Open ${w.title}`}>
                  <div className="card__media">
                    <img src={w.img} alt={w.title} loading={i < 2 ? 'eager' : 'lazy'} />
                    <span className={`card__tag tag--${w.cat} mono`}>{catLabel[w.cat]}</span>
                    <span className="card__arrow" aria-hidden="true">↗</span>
                  </div>
                  <div className="card__info">
                    <span className="card__num mono">{String(i + 1).padStart(2, '0')}</span>
                    <h4 className="card__title">{w.title}</h4>
                    <span className="card__meta mono">{w.meta}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {open && <WorkModal work={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
