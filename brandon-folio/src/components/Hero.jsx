import { useEffect, useRef, useState } from 'react';
import { media, profile, expertise, tools } from '../data.js';
import Marquee from './Marquee.jsx';

// Skills (display type) interleaved with tools (mono type) for the ticker.
const tickerItems = (() => {
  const out = [];
  const n = Math.max(expertise.length, tools.length);
  for (let i = 0; i < n; i++) {
    if (expertise[i]) out.push({ text: expertise[i], kind: 'skill' });
    if (tools[i]) out.push({ text: tools[i], kind: 'tool' });
  }
  return out;
})();

export default function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true); // browsers only autoplay muted video
  // Smaller file for phones; chosen once on mount.
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches
      ? media('hero-mobile.mp4')
      : media('hero.mp4')
  );

  // The reel is never cropped: it stays 16:9 and scales with the window,
  // and a blurred copy of the same reel fills any leftover space.
  const ambientRef = useRef(null);
  // Keep the blurred background in step with the main video.
  const syncAmbient = (play) => {
    const a = ambientRef.current;
    const v = videoRef.current;
    if (!a || !v) return;
    if (play) {
      a.currentTime = v.currentTime;
      a.play().catch(() => {});
    } else a.pause();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play().catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <section className="hero" id="top">
      <div className="hero__stage">
      <div className="hero__media">
        <video
          ref={ambientRef}
          className="hero__ambient"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero__frame">
          <video
            ref={videoRef}
            onPlay={() => syncAmbient(true)}
            onPause={() => syncAmbient(false)}
            className="hero__video"
            src={src}
            poster={media('hero-poster.jpg')}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Brandon Sun showreel"
          />
        </div>
        <div className="hero__shade" aria-hidden="true" />
      </div>

      <h1 className="sr-only">Brandon (Taishang) Sun — Digital Media Designer</h1>

      <div className="container hero__bar">
        <div className="hero__left">
          <p className="hero__tag mono">
            <span className="dot" /> {profile.tagline} — {profile.location}
          </p>
          <div className="hero__actions">
          <a href="#projects" className="btn btn--pink btn--lg">
            View projects <span aria-hidden="true">↓</span>
          </a>
          <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
            Resume <span aria-hidden="true">↗</span>
          </a>
          </div>
        </div>

        <div className="hero__controls">
          <button
            className={`ctrl ${muted ? '' : 'ctrl--on'}`}
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              {muted ? (
                <path d="m17 9 5 6m0-6-5 6" />
              ) : (
                <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
              )}
            </svg>
            <span className="mono">{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
          <button
            className="ctrl ctrl--icon"
            onClick={togglePlay}
            aria-label={playing ? 'Pause showreel' : 'Play showreel'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {playing ? <path d="M8 5v14M16 5v14" /> : <path d="M7 5l12 7-12 7V5Z" />}
            </svg>
          </button>
        </div>
      </div>
      </div>

      <Marquee
        className="hero__marquee"
        speed={45}
        items={tickerItems.map((t) => t.text)}
        render={(i) => (
          <span className={`tick tick--${tickerItems[i].kind}`}>{tickerItems[i].text}</span>
        )}
      />
    </section>
  );
}
