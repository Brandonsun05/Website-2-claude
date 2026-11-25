import Nav from './components/Nav.jsx';
import Intro from './components/Intro.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Playground from './components/Playground.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Cursor from './components/Cursor.jsx';

export default function App() {
  return (
    <>
      <a href="#projects" className="skip-link">Skip to projects</a>
      <Cursor />
      <Nav />
      <main>
        <Intro />
        <Hero />
        <About />
        <Projects />
        <Playground />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
