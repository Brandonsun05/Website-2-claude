import { useEffect, useRef, useState } from 'react';

const VIEWER_SRC = 'https://cdn.spline.design/@splinetool/viewer@2.0.220/build/spline-viewer.js';

// Loads the <spline-viewer> web component once, only when needed.
let viewerPromise;
function loadViewer() {
  if (!viewerPromise) {
    viewerPromise = new Promise((resolve, reject) => {
      if (customElements.get('spline-viewer')) return resolve();
      const s = document.createElement('script');
      s.type = 'module';
      s.src = VIEWER_SRC;
      s.onload = () => customElements.whenDefined('spline-viewer').then(resolve);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return viewerPromise;
}

/*
  Playable Spline scene.
  - scene: exported ".splinecode" URL (Spline → Export → Code → Vanilla JS) → uses <spline-viewer>
  - embed: public "my.spline.design/..." link → used in an iframe until a scene URL is set
  Shows a cover + "Play" button first, so the 3D only loads when someone wants it.
*/
export default function SplinePlayer({ scene, embed, cover, title, cta = 'Play it here', hint = 'click, then press keys to make music · best on a laptop' }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const boxRef = useRef(null);
  const useViewer = Boolean(scene);

  useEffect(() => {
    if (!on || !useViewer) return;
    let alive = true;
    loadViewer().then(() => alive && setReady(true)).catch(() => alive && setReady(false));
    return () => { alive = false; };
  }, [on, useViewer]);

  // put keyboard focus into the scene so key presses play notes straight away
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => boxRef.current?.querySelector('iframe, spline-viewer, canvas')?.focus?.(), 600);
    return () => clearTimeout(t);
  }, [on, ready]);

  return (
    <div className="spl" ref={boxRef}>
      {!on ? (
        <button className="spl__facade" onClick={() => setOn(true)} aria-label={`Play ${title} in the browser`}>
          {cover && <img src={cover} alt="" />}
          <span className="spl__cta">
            <span className="spl__play" aria-hidden="true">►</span>
            <span className="spl__txt">
              <strong>{cta}</strong>
              <span className="mono">{hint}</span>
            </span>
          </span>
        </button>
      ) : useViewer ? (
        ready ? (
          // eslint-disable-next-line react/no-unknown-property
          <spline-viewer url={scene} loading-anim-type="none" tabIndex={0} />
        ) : (
          <div className="spl__loading mono">Loading 3D scene…</div>
        )
      ) : (
        <iframe src={embed} title={title} allow="autoplay; fullscreen; xr-spatial-tracking; clipboard-write" allowFullScreen tabIndex={0} />
      )}
    </div>
  );
}
