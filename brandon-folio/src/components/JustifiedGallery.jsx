import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

/*
  Justified gallery: images keep their original proportions (never cropped),
  every image in a row shares one height, and each row fills the full width.
  Rows hold `min`–`max` images (2–3 on desktop, 1–2 on phones); the split is
  chosen so row heights stay as even as possible.
*/

// Reads each image's natural size once (cached across renders/projects).
const sizeCache = new Map();
function useAspects(srcs) {
  const [, force] = useState(0);
  useEffect(() => {
    let alive = true;
    srcs.forEach((src) => {
      if (sizeCache.has(src)) return;
      const img = new Image();
      img.onload = () => {
        sizeCache.set(src, img.naturalWidth / img.naturalHeight || 1.5);
        if (alive) force((n) => n + 1);
      };
      img.onerror = () => {
        sizeCache.set(src, 1.5);
        if (alive) force((n) => n + 1);
      };
      img.src = src;
    });
    return () => { alive = false; };
  }, [srcs]);
  const ready = srcs.every((s) => sizeCache.has(s));
  return { ready, aspects: srcs.map((s) => sizeCache.get(s) || 1.5) };
}

// Split aspects into rows (sizes min..max) so every row height is close to `target`.
function partition(aspects, width, gap, target, min, max) {
  const n = aspects.length;
  if (!n) return [];
  if (n < min) return [aspects.map((_, i) => i)];
  const best = new Array(n + 1).fill(Infinity);
  const prev = new Array(n + 1).fill(-1);
  best[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let k = min; k <= max && k <= i; k++) {
      if (best[i - k] === Infinity) continue;
      let sum = 0;
      for (let j = i - k; j < i; j++) sum += aspects[j];
      const h = (width - gap * (k - 1)) / sum;
      const cost = best[i - k] + ((h - target) / target) ** 2;
      if (cost < best[i]) { best[i] = cost; prev[i] = i - k; }
    }
  }
  if (best[n] === Infinity) {
    // can't split exactly (e.g. 1 image with min 2) → simple chunks
    const rows = [];
    for (let i = 0; i < n; i += max) rows.push(aspects.slice(i, i + max).map((_, j) => i + j));
    return rows;
  }
  const rows = [];
  for (let i = n; i > 0; i = prev[i]) {
    rows.unshift(Array.from({ length: i - prev[i] }, (_, j) => prev[i] + j));
  }
  return rows;
}

export default function JustifiedGallery({ images, alt = '', onOpen, max = 3 }) {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);
  const { ready, aspects } = useAspects(images);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const phone = width > 0 && width < 560;
  const gap = phone ? 8 : 14;
  const rows = useMemo(() => {
    if (!ready || !width) return [];
    const target = phone ? width * 0.5 : Math.min(340, width * 0.24);
    // phones show at most half as many per row (phone screens: up to 4)
    const mx = phone ? Math.max(2, Math.ceil(max / 2)) : max;
    return partition(aspects, width, gap, target, phone ? 1 : 2, mx).map((idx) => ({ idx }));
  }, [ready, width, aspects, gap, phone, max]);

  return (
    <div className="jg" ref={boxRef} style={{ '--gap': `${gap}px` }}>
      {!ready && <div className="jg__loading mono">Loading images…</div>}
      {rows.map((row, r) => (
        <div className="jg__row" key={r}>
          {row.idx.map((i) => (
            <button
              key={images[i]}
              className="jg__item"
              style={{ flexGrow: aspects[i], aspectRatio: aspects[i] }}
              onClick={() => onOpen?.(i)}
              aria-label={`Enlarge image ${i + 1}`}
            >
              <img src={images[i]} alt={`${alt} — image ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
