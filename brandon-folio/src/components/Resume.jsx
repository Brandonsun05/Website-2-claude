import { profile, experience, education, highlights } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Resume() {
  return (
    <section className="section resume" id="resume">
      <div className="container">
        <div className="resume__head">
          <div className="section__head">
            <Reveal as="p" className="section__kicker mono">(04) — resume</Reveal>
            <Reveal as="h2" className="section__title" delay={80}>
              The <em>short</em> version
            </Reveal>
          </div>
          <Reveal className="resume__actions" delay={140}>
            <a className="btn btn--lime btn--lg" href={profile.resumePdf} target="_blank" rel="noreferrer">
              View PDF ↗
            </a>
            <a className="btn btn--ink btn--lg" href={profile.resumePdf} download="Taishang-Brandon-Sun-CV.pdf">
              Download ↓
            </a>
          </Reveal>
        </div>

        <div className="resume__grid">
          <div className="resume__col">
            <h3 className="resume__h mono">Experience</h3>
            <ol className="timeline">
              {experience.map((e, i) => (
                <Reveal as="li" key={e.org} className="tl" delay={i * 70}>
                  <span className="tl__when mono">{e.when}</span>
                  <div className="tl__body">
                    <h4 className="tl__role">{e.role}</h4>
                    <p className="tl__org">{e.org} <span className="mono">· {e.where}</span></p>
                    <ul className="tl__points">
                      {e.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="resume__col">
            <h3 className="resume__h mono">Education</h3>
            <Reveal className="edu">
              <span className="tl__when mono">{education.when}</span>
              <h4 className="tl__role">{education.title}</h4>
              <p className="tl__org">{education.org}</p>
              <ul className="tl__points">
                {education.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </Reveal>

            <h3 className="resume__h mono">Project highlights</h3>
            <ul className="hl-list">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h.title} className="hl" delay={i * 70}>
                  <span className="mono hl__when">{h.when}</span>
                  <strong>{h.title}</strong>
                  <span className="hl__note">{h.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
