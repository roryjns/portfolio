import './Home.css'
import { Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { lazy, Suspense, memo } from "react";

const SectionTitle = memo(function SectionTitle({ children }) {
  return (
    <div className="section-title-container">
      <h2 className="section-title">{children}</h2>
      <div className="underline">
        <div className="line"></div>
        <div className="hexagon"></div>
        <div className="line"></div>
      </div>
    </div>
  )
});

const skills = ['Unity', 'React', 'Git', 'C#', 'Javascript', 'Java'];

const highlights = [
  { title: 'Mutagenesis', url: 'mutagenesis', src: '/portfolio/mutagenesis.webm'},
];

const CarouselLazy = lazy(() => import("react-responsive-carousel").then(m => ({ default: m.Carousel })));

const projects = [
  {
    title: 'Rhyver',
    url: 'rhyver',
    thumbnail: '/portfolio/rhyver.webm',
    duration: '6 Months',
    engine: 'Unity (C#)',
    teamSize: '1',
    summary: 'A rhythm game I made for my A-level programming project, which happened to also be my first full game. The player hits notes in time with the beat to build up combos and compete for the highest score on online leaderboards.'
  },
  {
    title: 'Lowertones',
    url: 'lowertones',
    thumbnail: '/portfolio/lowertones.webm',
    duration: '10 Weeks',
    engine: 'Angular',
    teamSize: '7',
    summary: 'A music organisation and metadata insight app, providing insight on Spotify listening habits not found elsewhere. This was a university project where I worked with 6 other students to develop a full-stack application using Agile methodology.'
  },
  {
    title: 'Rudawful',
    url: 'rudawful',
    thumbnail: '/portfolio/rudawful.webm',
    duration: '1 Week',
    engine: 'Unity (C#)',
    teamSize: '1',
    summary: 'This game was made for a Christmas game jam at university. The player dodges obstacles and tries to complete levels as fast as possible. I integrated Microsoft Playfab to allow players to compete in online leaderboards.'
  },
  {
    title: 'Brie Afraid',
    url: 'brie-afraid',
    thumbnail: '/portfolio/brie-afraid.webm',
    duration: '1 Week',
    engine: 'Unity (C#)',
    teamSize: '3',
    summary: 'This was made for my first game jam. You play as a mouse, lost in a maze with cheese-themed monsters that hunt you if you get too close. I was the sole programmer, working alongside a pixel artist and a VFX artist.'
  }
];

export default function Home() {
  return (
    <>
      <section id="about" className="about-section">
        <div className="about-content">
          <img src="/portfolio/profile-pic.webp" alt="Profile picture" className="profile-pic" loading="lazy" />
          <div className="about-text">
            <p>I'm Rory, a recent AI and Computer Science graduate currently seeking roles in software engineering and games programming. I’m particularly interested in how intelligent, AI-driven systems can make gameplay more dynamic and engaging.</p>
            <div className="skills-container">Proficiencies:
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <SectionTitle>Highlight</SectionTitle>
        <p className='highlights-text'>Click or tap on a project to learn more. Source code for my projects can be found on my{' '}
          <a className="link" href="https://github.com/roryjns?tab=repositories">GitHub</a> page.
        </p>
        <div className="carousel-container">
          <Suspense fallback={<div className="carousel-placeholder" />}>
            <CarouselLazy autoPlay infiniteLoop interval={2000} showIndicators={false} showArrows={true} showStatus={false} showThumbs={false} stopOnHover>
              {highlights.map((highlight, index) => (
                <div key={index} className="card">
                  <Link to={`/${highlight.url}`}>
                    <video
                      className="card-img"
                      alt={highlight.title}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={`/portfolio/${highlight.url}.webm`} type="video/webm" />
                    </video>
                    <div className="card-overlay">+</div>
                  </Link>
                </div>
              ))}
            </CarouselLazy>
          </Suspense>
        </div>
      </section>

      <section id="otherProjects">
        <SectionTitle>Other Projects</SectionTitle>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <Link to={`/${project.url}`}>
                <div className="project-card-img">
                  <div className="card-img">
                    <video
                      className="card-img"
                      alt={project.title}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={`/portfolio/${project.url}.webm`} type="video/webm" />
                    </video>
                    <div className="card-overlay">+</div>
                  </div>
                </div>
                <div className="card-text">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="card-other-info">
                  {project.duration} - {project.engine}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}