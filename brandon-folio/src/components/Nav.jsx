import { useEffect, useState } from 'react';
import { profile, media } from '../data.js';

const items = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#playground', label: 'Playground' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" onClick={close} aria-label="Brandon — Digital Media Designer, back to top">
          <img className="nav__logo-mark" src={media('logo-mark.jpg')} alt="" width="52" height="52" />
          <span className="nav__lockup">
            <span className="nav__lockup-name">
              Brandon<span className="nav__lockup-colon">:</span>
            </span>
            <span className="nav__lockup-role">Digital Media Designer</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Main">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="nav__link">
              {it.label}
            </a>
          ))}
        </nav>

        <a href={`mailto:${profile.email}`} className="btn btn--lime nav__cta">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>

        <button
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

    </header>

    {/* Menu lives outside the header: the header's blur would otherwise trap this fixed overlay inside the nav bar. */}
      <div id="mobile-menu" className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <div className="container menu__inner">
          {items.map((it, i) => (
            <a
              key={it.href}
              href={it.href}
              className="menu__link"
              onClick={close}
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
            >
              <span className="menu__num">0{i + 1}</span>
              {it.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="btn btn--lime menu__cta" onClick={close} tabIndex={open ? 0 : -1}>
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}
