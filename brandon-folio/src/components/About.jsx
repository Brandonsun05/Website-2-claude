import { profile, stats, expertise, tools, languages } from '../data.js';
import Reveal from './Reveal.jsx';
import Toolbox from './Toolbox.jsx';

export default function About() {
  return (
    <section className="section about-sec" id="about">
      <div className="container">
        <Reveal as="p" className="section__kicker mono">(02) — about me</Reveal>

        <div className="about-grid">
          <Reveal className="about-photo">
            <img src={profile.photo} alt={profile.fullName} loading="lazy" />
            <span className="sticker sticker--pink about-photo__sticker mono">hi, I&apos;m brandon ☻</span>
            <span className="sticker sticker--lime about-photo__sticker2 mono">{profile.location}</span>
          </Reveal>

          <div className="about-body">
            <Reveal as="h2" className="about-lead" delay={80}>
              Digital <em>Media</em> Designer
            </Reveal>
            <Reveal as="p" className="about-text" delay={140}>
              {profile.about}
            </Reveal>

            <Reveal className="stats" delay={200}>
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__value">{s.value}</span>
                  <span className="stat__label mono">{s.label}</span>
                </div>
              ))}
            </Reveal>

            {/* sits at the bottom of the text column, level with the bottom of the photo */}
            <Reveal className="about-skills__head" delay={240}>
              <h3 className="mono about-lists__h">Skills &amp; tools ↓</h3>
              <p className="about-langs mono">
                {languages.map((l, i) => (
                  <span key={l.name}>
                    {i > 0 && ' · '}
                    <strong>{l.name}</strong> {l.level.toLowerCase()}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>
        </div>

        {/* same width as the photo + text row above */}
        <Reveal className="toolboxes" delay={120}>
          <Toolbox title="Skills" items={expertise} color="lime" kind="skill" />
          <Toolbox title="Tools" items={tools} color="pink" kind="tool" />
        </Reveal>
      </div>
    </section>
  );
}
