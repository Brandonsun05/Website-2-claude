// Infinite horizontal ticker. Content is duplicated so the loop is seamless.
// Optional `render(i)` lets callers style each item; `items` stays plain text
// for screen readers.
export default function Marquee({ items, render, speed = 30, reverse = false, className = '' }) {
  const row = (
    <div className="marquee__row" aria-hidden="true">
      {items.map((it, i) => (
        <span className="marquee__item" key={i}>
          {render ? render(i) : it}
          <span className="marquee__star">✺</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee ${reverse ? 'marquee--rev' : ''} ${className}`}
      style={{ '--speed': `${speed}s` }}
    >
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
