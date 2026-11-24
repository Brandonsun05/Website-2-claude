import { useEffect, useRef } from 'react';
import { catLabel, profile } from '../data.js';

export default function WorkModal({ work, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('no-scroll');
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal__media">
          <img src={work.img} alt={work.title} />
        </div>
        <div className="modal__body">
          <span className={`card__tag tag--${work.cat} mono modal__tag`}>{catLabel[work.cat]}</span>
          <h3 id="modal-title" className="modal__title">{work.title}</h3>
          <p className="modal__meta mono">{work.meta}</p>
          <p className="modal__desc">{work.desc}</p>
          <ul className="modal__tags">
            {work.tags.map((t) => (
              <li key={t} className="mono">{t}</li>
            ))}
          </ul>
          <a className="btn btn--pink" href={`mailto:${profile.email}?subject=${encodeURIComponent(`About ${work.title}`)}`}>
            Ask me about this project ↗
          </a>
        </div>
      </div>
    </div>
  );
}
