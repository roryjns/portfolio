import './App.css'
import ReactCardCarousel from 'react-card-carousel';
import { useEffect, useState } from 'react';

function SectionTitle({ children }) {
  return (
    <div className="section-title-container">
      <h1 className="section-title">{children}</h1>
      <div className="underline">
        <div className="line"></div>
        <div className="hexagon"></div>
        <div className="line"></div>
      </div>
    </div>
  )
}

function App() {
  const skills = ['Unity', 'C#', 'Git', 'React', 'Python', 'Java'];
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { src: '/Platforming roguelite.gif', alt: 'Mutagenesis' },
    { src: '/Platforming roguelite.gif', alt: 'A Blank Planet' },
    { src: '/Platforming roguelite.gif', alt: 'PickMyNextGame' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % cards.length;
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const projects = [
    {
      thumbnail: '/Rudawful.gif',
      duration: '1 Week',
      engine: 'SDL 2 (C++)',
      title: 'Rudawful',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      thumbnail: '/Rhyver.gif',
      duration: '6 Months',
      engine: 'SDL 2 (C++)',
      title: 'Rhyver',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      thumbnail: '/Brie Afraid.gif',
      duration: '1 Week',
      engine: 'SDL 2 (C++)',
      title: 'Brie Afraid',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      thumbnail: '/Lowertones.gif',
      duration: '10 Weeks',
      engine: 'SDL 2 (C++)',
      title: 'Lowertones',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  return (
    <>
      <header className="header">
        <p>Rory Simpson</p>
        <a className="resumeButton" href="/CV.pdf">Resume ↓</a>
      </header>

      <main className="main-content">
        <section id="about" className="about-section">
          <div className="about-content">
            <img src="/Profile pic.jpg" alt="Profile pic" className="profile-pic"/>
            <div className="about-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className="skills-container">Technical experience:
                {skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="highlights">
          <SectionTitle>Highlights</SectionTitle>
          <p>Click or tap on a project to learn more. Source code for my projects can be found on my{' '}
            <a className="link" href="https://github.com/RoryJNS?tab=repositories">GitHub</a>{' '}page.
          </p>  
          <div className="carousel-container">
            <ReactCardCarousel autoplay={true} autoplay_speed={3000}>
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`card ${activeIndex === index ? 'active-card' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <img className="card-img" src={card.src} alt={card.alt} />
                  <div className="card-text">{card.alt}</div>
                  <div className="card-overlay">
                    <span>+</span>
                  </div>
                </div>
              ))}
            </ReactCardCarousel>
          </div>
        </section>

        <section id="otherProjects">
          <SectionTitle>Other Projects</SectionTitle>
          <div className="project-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-card-img">
                  <img className="card-img" src={project.thumbnail} alt={project.title}/>
                  <div className="card-overlay">
                      <span>+</span>
                  </div>
                </div>
                <div className="project-card-text">
                  <h3 className="link">{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Rory Simpson. All rights reserved.</p>
        <div>
          <a className="button" href="mailto:roryjns123@gmail.com">Email</a>
          <a className="button" href="https://www.linkedin.com/in/rory-simpson">LinkedIn</a>
          <a className="button" href="https://github.com/RoryJNS">GitHub</a>
          <a className="button" href="https://rory-simpson.itch.io/">itch.io</a>
        </div>
      </footer>
    </>
  )
}

export default App