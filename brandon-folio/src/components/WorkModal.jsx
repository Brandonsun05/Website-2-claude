import { useEffect, useRef, useState } from 'react';
import { catLabel, profile } from '../data.js';
import SplinePlayer from './SplinePlayer.jsx';
import JustifiedGallery from './JustifiedGallery.jsx';

// YouTube "facade": shows the thumbnail + play button, and only loads the
// real player when clicked. Keeps the page fast with several videos.
function YouTube({ id, label, autoplay = false }) {
  const [on, setOn] = useState(autoplay);
  return (
    <div className="yt">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={label || 'Project video'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button className="yt__facade" onClick={() => setOn(true)} aria-label={`Play video: ${label || 'project video'}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt__play" aria-hidden="true">►</span>
          {label && <span className="yt__label mono">{label}</span>}
        </button>
      )}
    </div>
  );
}

// Sketchfab model: cover card first, real 3D viewer loads on click.
function Sketchfab({ id, title, href, thumb }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="sf">
      <div className="sf__frame">
        {on ? (
          <iframe
            title={title}
            src={`https://sketchfab.com/models/${id}/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark_link=0`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <button className="sf__facade" onClick={() => setOn(true)} aria-label={`Load 3D model: ${title}`}>
            {thumb && <img src={thumb} alt="" loading="lazy" />}
            <span className="sf__cta mono"><span aria-hidden="true">⟲</span> View in 3D</span>
          </button>
        )}
      </div>
      <figcaption className="sf__cap">
        <strong>{title}</strong>
        <a className="mono" href={href} target="_blank" rel="noreferrer">by Brandon_Made on Sketchfab ↗</a>
      </figcaption>
    </figure>
  );
}

export default function WorkModal({ work, list = [], onNavigate, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const [zoom, setZoom] = useState(null);

  const idx = list.findIndex((w) => w.id === work.id);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    setZoom(null);
  }, [work.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') (zoom !== null ? setZoom(null) : onClose());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, zoom]);

  // A playable Spline scene takes the hero slot; all videos then go below.
  // A playable Spline scene takes the hero slot (prototypes go under the brief).
  const playable = work.spline;
  const hasSpline = Boolean(playable?.scene || playable?.embed);
  const [main, ...rest] = work.videos || [];
  const moreVideos = hasSpline ? work.videos || [] : rest;
  const brief = work.brief || (work.desc ? [work.desc] : []);
  const gallery = work.gallery || [];

  return (
    <div className="pd" role="dialog" aria-modal="true" aria-labelledby="pd-title" onClick={onClose}>
      <div className="pd__panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
        <div className="pd__bar">
          <span className={`card__tag tag--${work.cat} mono pd__tag`}>{catLabel[work.cat]}</span>
          <span className="pd__count mono">{idx >= 0 ? `${idx + 1} / ${list.length}` : ''}</span>
          <button ref={closeRef} className="pd__close" onClick={onClose} aria-label="Close project">✕</button>
        </div>

        <header className="pd__head">
          <h3 id="pd-title" className="pd__title">{work.title}</h3>
          {work.tagline && <p className="pd__tagline">“{work.tagline}”</p>}
          <p className="pd__meta mono">{work.meta}</p>
        </header>

        <div className="pd__hero">
          {hasSpline ? (
            <SplinePlayer key={work.id} {...playable} cover={playable.cover || work.img} title={work.title} />
          ) : main ? (
            <YouTube key={main.yt} id={main.yt} label={main.label} />
          ) : (
            <img src={work.img} alt={work.title} />
          )}
        </div>

        <div className="pd__body">
          <div className="pd__brief">
            <h4 className="pd__h mono">Brief</h4>
            {brief.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <aside className="pd__facts">
            {work.year && (<div><dt className="mono">Year</dt><dd>{work.year}</dd></div>)}
            {work.role && (<div><dt className="mono">Role</dt><dd>{work.role}</dd></div>)}
            {work.exhibited && (<div><dt className="mono">Shown at</dt><dd>{work.exhibited}</dd></div>)}
            {(work.tools || work.tags) && (
              <div>
                <dt className="mono">Tools</dt>
                <dd><ul className="pd__chips">{(work.tools || work.tags).map((t) => <li key={t} className="mono">{t}</li>)}</ul></dd>
              </div>
            )}
            {work.links?.length > 0 && (
              <div className="pd__links">
                {work.links.map((l) => (
                  <a key={l.href} className="btn btn--lime" href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
              </div>
            )}
          </aside>
        </div>

        {work.prototype?.embed && (
          <section className="pd__section">
            <h4 className="pd__h mono">{work.prototype.label || 'Interactive prototype'}</h4>
            <div className="pd__proto">
              <SplinePlayer key={`${work.id}-proto`} {...work.prototype} cover={work.prototype.cover || work.img} title={`${work.title} prototype`} />
            </div>
          </section>
        )}

        {work.models?.length > 0 && (
          <section className="pd__section">
            <h4 className="pd__h mono">3D models — drag to rotate, scroll to zoom</h4>
            <div className="pd__models">
              {work.models.map((m) => (
                <Sketchfab key={m.sketchfab} id={m.sketchfab} title={m.title} href={m.href} thumb={m.thumb} />
              ))}
            </div>
          </section>
        )}

        {moreVideos.length > 0 && (
          <section className="pd__section">
            <h4 className="pd__h mono">{hasSpline ? 'Videos' : 'More videos'}</h4>
            <div className="pd__videos">
              {moreVideos.map((v) => <YouTube key={v.yt} id={v.yt} label={v.label} />)}
            </div>
          </section>
        )}

        {(work.galleryGroups || []).filter((g) => g.images.length).map((g, gi) => (
          <section className="pd__section" key={`${work.id}-${gi}`}>
            <h4 className="pd__h mono">{g.label || 'Process & visuals'}</h4>
            <JustifiedGallery images={g.images} max={g.max} alt={work.title} onOpen={(i) => setZoom(g.start + i)} />
          </section>
        ))}

        <footer className="pd__foot">
          {prev ? (
            <button className="pd__nav" onClick={() => onNavigate(prev)}>
              <span className="mono">← Previous</span><strong>{prev.title}</strong>
            </button>
          ) : <span />}
          <a className="btn btn--pink" href={`mailto:${profile.email}?subject=${encodeURIComponent(`About ${work.title}`)}`}>
            Ask me about it ↗
          </a>
          {next ? (
            <button className="pd__nav pd__nav--next" onClick={() => onNavigate(next)}>
              <span className="mono">Next →</span><strong>{next.title}</strong>
            </button>
          ) : <span />}
        </footer>
      </div>

      {zoom !== null && (
        <div className="lightbox" onClick={(e) => { e.stopPropagation(); setZoom(null); }}>
          <img src={gallery[zoom]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); setZoom((zoom - 1 + gallery.length) % gallery.length); }} aria-label="Previous image">←</button>
          <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); setZoom((zoom + 1) % gallery.length); }} aria-label="Next image">→</button>
          <button className="lightbox__btn lightbox__close" onClick={(e) => { e.stopPropagation(); setZoom(null); }} aria-label="Close image">✕</button>
          <p className="lightbox__cap mono">{zoom + 1} / {gallery.length}</p>
        </div>
      )}
    </div>
  );
}
