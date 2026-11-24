import { useState } from 'react';

/*
  A toolbox that pops open and throws its cards out.
  - Desktop: opens on hover (or keyboard focus).
  - Touch: tap to open / close.
*/
export default function Toolbox({ title, items, color = 'lime', kind = 'skill' }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const isOpen = open || hover;

  return (
    <div
      className={`tb tb--${color} ${isOpen ? 'tb--open' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
    >
      <ul className="tb__cards" aria-label={title}>
        {items.map((it, i) => (
          <li
            key={it}
            className={`tb__card tb__card--${kind} tb__card--c${i % 4}`}
            style={{ '--i': i, '--r': `${((i * 47) % 13) - 6}deg` }}
          >
            {it}
          </li>
        ))}
      </ul>

      <button
        className="tb__box"
        aria-expanded={isOpen}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <span className="tb__lid" aria-hidden="true">
          <span className="tb__handle" />
        </span>
        <span className="tb__front">
          <span className="tb__title">{title}</span>
          <span className="tb__meta mono">
            {items.length} items · <span className="tb__hint">{isOpen ? 'close' : 'open me'}</span>
          </span>
          <span className="tb__latch" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
