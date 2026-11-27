import { useState } from 'react';
import { profile, links } from '../data.js';
import Marquee from './Marquee.jsx';
import Reveal from './Reveal.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__blobs" aria-hidden="true">
        <span className="blob blob--pink" />
        <span className="blob blob--violet" />
        <span className="blob blob--lime" />
      </div>

      <Marquee items={['open to work', 'freelance & full-time', 'say hi', '你好']} speed={22} reverse className="contact__marquee" />

      <div className="container contact__inner">
        <Reveal as="p" className="section__kicker mono">
          (06) — contact
        </Reveal>

        <Reveal as="h2" className="contact__title" delay={80}>
          Let&apos;s make
          <br />
          something <span className="contact__loud">loud.</span>
        </Reveal>

        <Reveal className="contact__mail" delay={160}>
          <a href={`mailto:${profile.email}`} className="contact__email">
            {profile.email}
          </a>
          <div className="contact__mail-actions">
            <button className="btn btn--lime" onClick={copy}>
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
            <a className="btn btn--ghost" href={profile.phoneHref}>
              {profile.phone}
            </a>
          </div>
        </Reveal>

        <div className="contact__links">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 80} className="contact__link-wrap">
              <a href={l.href} target="_blank" rel="noreferrer" className={`link-card link-card--${l.color}`}>
                <span className="link-card__label">{l.label}</span>
                <span className="link-card__handle mono">{l.handle}</span>
                <span className="link-card__arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <footer className="container footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="footer__mid">Designed &amp; built with React + Vite</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
