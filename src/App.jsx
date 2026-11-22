import { useEffect, useState } from 'react'
import NetworkBg from './NetworkBg'
import './App.css'

const SKILL_GROUPS = [
  { title: 'Languages', note: 'Programming foundations & practical development', items: ['C#', 'C', 'C++', 'Java', 'Python', 'JavaScript'] },
  { title: 'Backend & APIs', note: 'Application architecture and service development', items: ['ASP.NET Core', 'REST APIs', 'JWT / Identity', 'Entity Framework Core', 'SignalR', 'Clean Architecture'] },
  { title: 'Frontend & UI', note: 'Interfaces, responsive layouts, and interaction', items: ['Blazor', 'React', 'HTML5', 'CSS3', 'Responsive Design', 'UI Prototyping'] },
  { title: 'Databases', note: 'Relational data and persistence', items: ['Microsoft SQL Server', 'MySQL', 'Database Design', 'SQL Queries', 'Migrations'] },
  { title: 'AI / ML & Data', note: 'Areas I have worked with or am actively exploring', items: ['Machine Learning', 'NLP', 'Image Processing', 'LLMs & AI tools', 'Data Preparation', 'Anaconda / Jupyter'] },
  { title: 'Tools & Workflow', note: 'Development tools and creative experimentation', items: ['Visual Studio', 'VS Code', 'Git / GitHub', 'Postman', 'Anaconda', 'Creative Tools'] },
]

const PROJECTS = [
  { number: '01', name: 'NEXORA', type: 'FLAGSHIP · ACTIVE DEVELOPMENT', status: 'IN PROGRESS', featured: true, summary: 'A professional digital studio and talent network where people can build public studios, showcase portfolios, discover talent, connect, collaborate, and find opportunities.', details: 'Features developed across the platform include identity and profiles, portfolio foundations, public studio visibility, messaging and real-time presence, collaboration foundations, dashboard, jobs, and applications.', stack: ['C#', '.NET 10', 'ASP.NET Core', 'Blazor', 'SQL Server', 'EF Core', 'SignalR'], link: '', linkLabel: 'CASE STUDY SOON' },
  { number: '02', name: 'Portfolio OS', type: 'PERSONAL · FRONTEND', status: 'CURRENT PROJECT', summary: 'A cinematic portfolio interface combining responsive design, interactive canvas particles, theme switching, motion, and a visual developer identity.', details: 'This portfolio itself is a continuing design and engineering experiment. The goal is to refine the experience over time and document what I learn.', stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Canvas'], link: '', linkLabel: 'YOU ARE HERE' },
  { number: '03', name: 'NLP Text Explorer', type: 'AI / NLP · CONCEPT', status: 'PLANNED EXPERIMENT', summary: 'A small learning application for exploring text preprocessing, tokenization, sentiment, keyword extraction, and basic text classification.', details: 'Planned as a hands-on way to compare traditional NLP workflows and modern language-model approaches with visual explanations.', stack: ['Python', 'NLP', 'Jupyter', 'Anaconda'], link: '', linkLabel: 'PROJECT IDEA' },
  { number: '04', name: 'Image Processing Lab', type: 'COMPUTER VISION · CONCEPT', status: 'PLANNED EXPERIMENT', summary: 'An interactive playground for image filters, enhancement, edge detection, segmentation experiments, and comparing image-processing techniques.', details: 'A future project for learning image processing concepts with clear before/after views and adjustable controls.', stack: ['Python', 'Image Processing', 'OpenCV (planned)', 'Jupyter'], link: '', linkLabel: 'PROJECT IDEA' },
  { number: '05', name: 'API Playground', type: 'BACKEND · CONCEPT', status: 'PLANNED EXPERIMENT', summary: 'A developer-facing sandbox to explore API requests, response payloads, authentication patterns, and error handling.', details: 'The planned scope includes sample endpoints, request history, response formatting, and safe demo authentication flows.', stack: ['C#', 'ASP.NET Core', 'REST', 'Postman'], link: '', linkLabel: 'PROJECT IDEA' },
  { number: '06', name: 'Smart Study Companion', type: 'AI · FUTURE BUILD', status: 'IDEA / ROADMAP', summary: 'A personal learning tool that organizes notes, generates practice prompts, and helps users revisit concepts they are learning.', details: 'A future exploration of practical AI-assisted learning, with an emphasis on useful workflows rather than novelty alone.', stack: ['Python', 'AI APIs', 'NLP', 'Web UI'], link: '', linkLabel: 'PROJECT IDEA' },
  { number: '07', name: 'Developer Utilities Hub', type: 'PRODUCTIVITY · FUTURE BUILD', status: 'IDEA / ROADMAP', summary: 'A collection of small web utilities for developers—formatters, converters, snippet helpers, and documentation shortcuts—in one clean workspace.', details: 'A modular project idea that could grow incrementally as individual tools are built and validated.', stack: ['React', 'APIs', 'JavaScript', 'UI Design'], link: '', linkLabel: 'PROJECT IDEA' },
  { number: '08', name: 'Data Visualizer', type: 'DATA · FUTURE BUILD', status: 'IDEA / ROADMAP', summary: 'A lightweight dashboard for turning datasets into charts, filters, and understandable visual summaries.', details: 'Planned learning project for working with data pipelines, visual encoding, and responsive dashboard layouts.', stack: ['Python', 'SQL', 'Data Visualization'], link: '', linkLabel: 'PROJECT IDEA' },
]

const JOURNEY = [
  { phase: 'FOUNDATIONS', heading: 'Learning the fundamentals', copy: 'Building programming logic, problem-solving habits, and understanding how software is structured.' },
  { phase: 'PROGRAMMING', heading: 'Exploring languages', copy: 'Working across C, C++, Java, Python, and C# to broaden my programming foundations and perspective.' },
  { phase: 'WEB & BACKEND', heading: 'Building applications and APIs', copy: 'Focusing on .NET, ASP.NET Core, data persistence, authentication, API design, and frontend integration.' },
  { phase: 'PRODUCT BUILDING', heading: 'Taking on a larger challenge', copy: 'Developing NEXORA as a multi-feature platform, learning to connect features into a coherent product.' },
  { phase: 'AI & EXPLORATION', heading: 'Expanding the learning frontier', copy: 'Exploring machine learning, NLP, image processing, AI tools, creative technology, and new workflows.' },
]

const INTERESTS = [
  { icon: '⌘', name: 'Building software', text: 'I enjoy creating applications, experimenting with architecture, solving problems, and turning concepts into something usable.' },
  { icon: '✳', name: 'AI & machine learning', text: 'Exploring ML, NLP, image processing, AI-assisted workflows, and how intelligent features can be applied to real products.' },
  { icon: '◈', name: 'Creative technology', text: 'Trying visual tools, interface concepts, futuristic aesthetics, and creative ways to communicate technical ideas.' },
  { icon: '↗', name: 'Learning & research', text: 'Following new technologies, tutorials, documentation, and ideas that help me grow as a developer.' },
  { icon: '▣', name: 'Design & UI experiments', text: 'Playing with layouts, typography, interaction patterns, motion, and the details that make software feel polished.' },
  { icon: '◎', name: 'Exploring tools', text: 'Experimenting with IDEs, AI tools, developer utilities, notebooks, and different ways to build more effectively.' },
]

const SOCIALS = {
  email: 'YOUR_EMAIL@example.com',
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/YOUR_PROFILE',
}

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => el.classList.add('revealed'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    targets.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function SkillPanel({ group, index }) {
  return <article className="skill-panel reveal"><span className="panel-number">0{index + 1}</span><h3>{group.title}</h3><p className="skill-note">{group.note}</p><div className="skill-chips">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>
}

function ProjectCard({ project }) {
  return <article className={`project-card reveal ${project.featured ? 'featured-project' : ''}`}>
    <div className="project-top"><span className="project-number">{project.number}</span><span className="project-category">{project.type}</span></div>
    <div className="project-main"><div><h3>{project.name}</h3><p>{project.summary}</p><details className="project-details"><summary>MORE ABOUT THIS PROJECT</summary><p>{project.details}</p></details><div className="project-stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
    <div className="project-aside"><span className={`project-status ${project.status.includes('PLANNED') || project.status.includes('IDEA') ? 'status-planned' : ''}`}>{project.status}</span>{project.link ? <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>↗</a> : <span className="project-link-label">{project.linkLabel}</span>}</div></div>
  </article>
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ahmed-portfolio-theme') || 'dark' } catch { return 'dark' }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  useReveal()
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('ahmed-portfolio-theme', theme) } catch {}
  }, [theme])
  const closeMenu = () => setMenuOpen(false)

  return <div className="portfolio-app">
    <NetworkBg />
    <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" /><div className="background-grid" aria-hidden="true" />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ahmed Ali home"><span className="brand-mark">A<span>.</span></span><span>AHMED<span className="brand-muted">ALI</span></span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? 'CLOSE ×' : 'MENU ☰'}</button>
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
        {[['About','#about'],['Skills','#skills'],['Projects','#projects'],['CV','#cv'],['Interests','#interests'],['Contact','#contact']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme" title="Toggle theme">{theme === 'dark' ? '☼' : '☾'}</button>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> SOFTWARE DEVELOPER · ALWAYS LEARNING</div>
          <h1>AHMED<br /><span>ALI </span></h1>
          <p className="hero-role">I BUILD <span>IDEAS INTO DIGITAL EXPERIENCES.</span></p>
          <p className="hero-intro">Software developer focused on building applications, backend systems, and creative digital experiences. I work with a wide range of programming technologies, while currently focusing on <strong>C# / .NET</strong> and developing <strong>NEXORA</strong>.</p>
          <div className="hero-buttons"><a className="button button-primary" href="#projects">EXPLORE PROJECTS <span>↗</span></a><a className="button button-secondary" href="#cv">VIEW MY CV</a></div>
          <div className="hero-meta"><span><i>01</i> ENGINEERING</span><span><i>02</i> AI EXPLORATION</span><span><i>03</i> CONTINUOUS LEARNING</span></div>
        </div>
        <div className="hero-art" aria-label="Portrait of Ahmed Ali">
          <div className="portrait-frame"><img src="./portrait.png" alt="Ahmed Ali portrait" onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('portrait-fallback') }} /><div className="portrait-fallback-text">ADD YOUR<br />PORTRAIT<br /><span>/public/portrait.png</span></div><div className="portrait-scan" /></div>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="floating-card card-status"><span className="mini-label">CURRENT FOCUS</span><strong>NEXORA</strong><span className="status-active">● ACTIVE DEVELOPMENT</span></div>
          <div className="floating-card card-stack"><span className="mini-label">TECH AREAS</span><strong>SOFTWARE · AI</strong><span>BACKEND / UI / DATA</span></div>
          <span className="art-coordinate coordinate-a">IDEAS → SYSTEMS</span><span className="art-coordinate coordinate-b">BUILD · LEARN · ITERATE</span>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
      </section>

    <section className="ticker" aria-label="Technologies and interests"><div className="ticker-track"><span>C#</span><b>✳</b><span>C / C++</span><b>✳</b><span>JAVA</span><b>✳</b><span>PYTHON</span><b>✳</b><span>ASP.NET CORE</span><b>✳</b><span>SQL</span><b>✳</b><span>NLP</span><b>✳</b><span>IMAGE PROCESSING</span><b>✳</b><span>AI / ML</span><b>✳</b><span>C#</span><b>✳</b><span>C / C++</span><b>✳</b><span>JAVA</span><b>✳</b><span>PYTHON</span><b>✳</b><span>ASP.NET CORE</span><b>✳</b><span>SQL</span><b>✳</b><span>NLP</span><b>✳</b><span>IMAGE PROCESSING</span><b>✳</b><span>AI / ML</span></div></section>

    <section id="about" className="section-wrap section-block">
      <div className="section-heading reveal"><span className="section-index">01 / ABOUT</span><h2>Curiosity drives.<br /><span>Code brings it to life.</span></h2></div>
      <div className="about-grid reveal"><div className="about-statement"><span className="decor-line" /><p>I'm a developer who enjoys understanding how things work, learning new technologies, and turning ideas into practical software.</p></div><div className="about-details"><p>My current focus is building backend systems and applications with C# and .NET—working with APIs, authentication, databases, application architecture, and frontend integration. I also explore programming in other languages and enjoy experimenting with data, AI, machine learning, NLP, and image processing.</p><p>I like the entire journey of creating something: researching an idea, learning the tools, designing the solution, writing code, testing, improving, and eventually sharing it with others.</p><div className="about-tags"><span>PROBLEM SOLVING</span><span>PRODUCT THINKING</span><span>BUILD · LEARN · ITERATE</span><span>CREATIVE EXPERIMENTS</span></div></div></div>
    </section>

    <section id="skills" className="section-wrap section-block">
      <div className="section-heading reveal"><span className="section-index">02 / SKILLS & TOOLKIT</span><h2>Many tools.<br /><span>One curiosity.</span></h2><p className="section-note">Grouped by technology area rather than percentage bars. Some are hands-on tools; others are topics I continue to study and experiment with.</p></div>
      <div className="skills-grid">{SKILL_GROUPS.map((group, i) => <SkillPanel group={group} index={i} key={group.title} />)}</div>
      <div className="skill-footnote reveal"><span className="live-dot" /> Current primary focus: C# · .NET · ASP.NET Core · Blazor · SQL Server</div>
    </section>

    <section id="projects" className="section-wrap section-block">
      <div className="section-heading reveal"><span className="section-index">03 / PROJECT ARCHIVE</span><h2>Built, building,<br /><span>and imagining.</span></h2><p className="section-note">The project board separates active work from concepts and future experiments. Planned projects are ideas—not claims of completed work.</p></div>
      <div className="projects-list">{PROJECTS.map(project => <ProjectCard project={project} key={project.number} />)}</div>
      <div className="nexora-note reveal"><span className="section-index">FLAGSHIP / ACTIVE BUILD</span><div><h3>NEXORA — from idea to platform.</h3><p>A long-running project bringing together public studios, portfolios, talent discovery, messaging, real-time presence, collaboration, a dashboard, jobs, and applications. I am building it incrementally with a focus on architecture, maintainability, and real functionality.</p></div><span className="nexora-wordmark">NEXORA<span>®</span></span></div>
    </section>

    <section id="journey" className="section-wrap section-block">
      <div className="section-heading reveal"><span className="section-index">04 / LEARNING JOURNEY</span><h2>Still in progress.<br /><span>By design.</span></h2><p className="section-note">A broad overview of my development path. Edit stages or dates to match your actual timeline before publishing.</p></div>
      <div className="timeline">{JOURNEY.map((item, i) => <article className="timeline-row reveal" key={item.phase}><span className="timeline-marker">{String(i+1).padStart(2,'0')}</span><span className="timeline-stage">{item.phase}</span><div><h3>{item.heading}</h3><p>{item.copy}</p></div></article>)}</div>
    </section>

    <section id="interests" className="section-wrap section-block">
      <div className="section-heading reveal"><span className="section-index">05 / INTERESTS & HOBBIES</span><h2>What keeps me<br /><span>curious.</span></h2></div>
      <div className="interest-grid">{INTERESTS.map(item => <article className="interest-card reveal" key={item.name}><span className="interest-icon">{item.icon}</span><h3>{item.name}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section id="cv" className="section-wrap section-block cv-section">
      <div className="section-heading reveal"><span className="section-index">06 / CURRICULUM VITAE</span><h2>A concise snapshot.<br /><span>A deeper story in the CV.</span></h2><p className="section-note">Add your final PDF file to the public folder when ready. The preview and download buttons use that file.</p></div>
      <div className="cv-panel reveal"><div className="cv-preview"><div className="cv-paper"><span className="cv-label">CURRICULUM VITAE</span><h3>Ahmed Ali</h3><p>Software Developer · Backend / Full-Stack Interests</p><div className="cv-rule" /><div className="cv-columns"><div><b>FOCUS</b><span>C# / .NET</span><span>APIs & Backend</span><span>SQL & Data</span></div><div><b>EXPLORING</b><span>AI / ML</span><span>NLP</span><span>Image Processing</span></div></div><div className="cv-paper-footer">PORTFOLIO DOCUMENT · PDF PREVIEW</div></div></div><div className="cv-copy"><span className="mini-label">DOCUMENT / PDF</span><h3>My CV</h3><p>Download a printable version of my CV or open it in a new tab to preview. Replace the placeholder PDF with your actual, up-to-date CV before publishing.</p><div className="cv-actions"><a className="button button-primary" href="/Ahmed Ali Resume.pdf" download>DOWNLOAD CV ↧</a><a className="button button-secondary" href="/Ahmed Ali Resume.pdf" target="_blank" rel="noreferrer">PREVIEW PDF ↗</a></div><p className="cv-reminder"></p></div></div>
    </section>

    <section id="contact" className="section-wrap contact-section section-block reveal"><div className="contact-shell"><span className="section-index">07 / CONTACT</span><p className="contact-overline">HAVE AN IDEA, PROJECT, OR OPPORTUNITY?</p><h2>Let's make something<br /><span>meaningful.</span></h2><p className="contact-text">I'm open to connecting with people who enjoy technology, learning, creative problem-solving, and building ambitious things. Feel free to reach out.</p><a className="button button-primary" href={`mailto:${SOCIALS.email}`}>SEND ME AN EMAIL <span>↗</span></a><div className="social-links"><a href={SOCIALS.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div></section>
    </main>
    <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">A<span>.</span></span><span>AHMED<span className="brand-muted">ALI</span></span></a><span>DESIGNED & BUILT WITH CURIOSITY.</span><span>© {new Date().getFullYear()} AHMED ALI</span></footer>
  </div>
}
