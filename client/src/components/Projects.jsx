import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Lock, ChevronDown } from 'lucide-react';

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: 'InsightHealth',
    tagline: 'US-based AI-powered doctor appointment & patient consultation platform',
    description:
      'A US healthcare platform with dual portals — Care Connect for practitioners and LumiChat for patients. GPT-4 AI collects symptoms and auto-generates medical summaries, while practitioners manage appointments and encounters through a rich, filterable dashboard.',
    image: '/Insighthealth.jpg',
    technologies: ['React.js', 'Tailwind CSS', 'Redux', 'Axios', 'Python', 'GPT-4 LLM'],
    features: [
      'Dual portals — Care Connect (practitioners) & LumiChat (patients)',
      'AI chatbot (GPT-4) collects symptoms & generates summaries',
      'Email-triggered patient onboarding & auto appointment creation',
      'Aura AI Scribe for recording & managing encounter details',
      'Appointment management with filters, sorting & pagination',
      'Date-of-birth based patient authentication for LumiChat',
    ],
    isClient: true,
    link: null,
    github: null,
  },
  {
    id: 2,
    name: 'TrackVanta',
    tagline: 'Task management platform to streamline project workflows & team productivity',
    description:
      'A client-built task management platform where I led the frontend development using React.js and Tailwind CSS — delivering a responsive, intuitive interface for managing tasks across multiple projects. Integrated Redux for real-time state management, REST APIs via Axios for seamless data sync, and React Router for smooth multi-view navigation.', image: '/TrackVanta.jpg',
    technologies: ['React.js', 'Tailwind CSS', 'Redux', 'Axios', 'React Router', 'API Integration'],
    features: [
      'Multi-project task management interface',
      'Redux for real-time state management',
      'REST API integration via Axios',
      'React Router for smooth view navigation',
      'Dynamic filtering & sorting functionalities',
      'UI optimization for performance & UX',
      'Responsive design across all screen sizes',
      'Scalable architecture for team collaboration',
    ],
    isClient: true,
    link: null,
    github: null,
  },
  {
    id: 3,
    name: 'ReactBlog',
    tagline: 'A modern blog platform with markdown support',
    description:
      'A fully functional blog application built from scratch using React and Firebase. Browse and read posts through a clean, responsive UI — with Firebase powering real-time data, authentication, and hosting. Built with Vite for a fast development experience and optimised production builds.', image: '/ReactBlog.jpg',
    technologies: ['React.js', 'Firebase', 'Vite', 'JavaScript', 'Tailwind CSS'],
    features: [
      'Firebase Firestore for real-time post storage',
      'Firebase Authentication for secure access',
      'Responsive UI across all screen sizes',
      'Fast dev & build pipeline with Vite',
      'Clean, distraction-free reading experience',
      'Deployed & hosted via Firebase Hosting',
    ],
    isClient: false,
    link: 'https://react-blog-app-c6ebc.web.app/',    // ← replace with your URL
    github: 'https://github.com/itsssanu/react-blog-app', // ← replace with your URL
  },
  {
    id: 4,
    name: 'PersonalShowcase',
    tagline: 'Personal developer portfolio — designed & built from scratch',
    description:
      'A hand-crafted frontend portfolio built to showcase my projects, skills, and experience as a frontend developer. Uses React with Vite for speed, Tailwind CSS for utility-first styling, and SCSS for custom design details — featuring smooth animations, a responsive layout, and a distinctive dark aesthetic.', image: '/PersonalShowcase.jpg',
    technologies: ['React', 'Vite', 'JavaScript', 'SCSS', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Intersection Observer scroll animations',
      'Fully responsive across all devices',
      'SCSS + Tailwind CSS hybrid styling',
      'Custom ticker, accordion & project UI',
      'Dark-themed editorial design system',
      'Optimised build pipeline with Vite',
    ],
    isClient: false,
    link: 'https://anupriya-portfolio-2024.web.app/',    // ← replace with your URL
    github: 'https://github.com/itsssanu/anupriya-showcase', // ← replace with your URL
  },
];

// ─── Shared Styles ────────────────────────────────────────────────────────────
const CSS = `
  @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.3}}
  .font-syne{font-family:'inter',sans-serif}
  .font-mono-c{font-family:'Space Mono',monospace}
  .animate-ticker{animation:ticker 22s linear infinite}
  .animate-fade-slide{animation:fadeSlide .45s cubic-bezier(.23,1,.32,1) forwards}
  .animate-pulse-dot{animation:pulseDot 2s ease-in-out infinite}
  .proj-title{font-size:clamp(42px,6vw,88px);font-weight:800;line-height:.9;letter-spacing:-.03em}
  .proj-title em{font-style:normal;-webkit-text-stroke:1px rgba(45,212,191,.5);color:transparent}
  .proj-item-name{font-size:clamp(17px,2vw,26px)}
  .ghost-num{font-size:96px;font-weight:800;-webkit-text-stroke:1px rgba(255,255,255,.05);color:transparent;line-height:1}
  .grid-bg{background-image:linear-gradient(rgba(45,212,191,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(45,212,191,.03) 1px,transparent 1px);background-size:60px 60px}
  .proj-item.active{padding-left:16px}
  .proj-item.active .accent-bar{transform:scaleY(1)}
  .proj-item.active .item-num{color:#ff5f1f}
  .proj-item.active .item-name,.proj-item:hover .item-name{color:#fff}
  .proj-item.active .item-tags{max-height:60px;opacity:1}
  .thumb-img{transition:transform .6s cubic-bezier(.23,1,.32,1),opacity .4s}
  .thumb-wrap:hover .thumb-img{transform:scale(1.04);opacity:.9}
  .mobile-drawer{overflow:hidden;max-height:0;opacity:0;transition:max-height .45s cubic-bezier(.23,1,.32,1),opacity .3s}
  .mobile-drawer.open{max-height:700px;opacity:1}
  .chevron-icon{transition:transform .35s cubic-bezier(.23,1,.32,1)}
  .client-badge{
    display:inline-flex;align-items:center;gap:5px;
    font-family:'Poppins', serif;font-size:9px;letter-spacing:.15em;
    text-transform:uppercase;padding:5px 10px;
    border:1px solid rgba(255,95,31,.35);color:rgba(255,95,31,.8);
    border-radius:3px;background:rgba(255,95,31,.07);white-space:nowrap;
  }
  .personal-tag{
    display:inline-flex;align-items:center;gap:5px;
    font-family:'Poppins', serif;font-size:9px;letter-spacing:.15em;
    text-transform:uppercase;padding:5px 10px;
    border:1px solid rgba(45,212,191,.3);color:rgba(45,212,191,.75);
    border-radius:3px;background:rgba(45,212,191,.05);white-space:nowrap;
  }
`;

// ─── Conditional Action Buttons ───────────────────────────────────────────────
const ActionButtons = ({ project, size = 'md' }) => {
  const iconSize = size === 'sm' ? 10 : 11;
  const cls = size === 'sm'
    ? 'text-[9px] px-3.5 py-2'
    : 'text-[9px] px-3 py-2';

  if (project.isClient) {
    return (
      <div className="flex items-center">
        <span className="client-badge">
          <Lock size={iconSize} />
          Client Project — NDA
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 shrink-0">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-mono-c tracking-[.12em] uppercase bg-teal-400 text-slate-950 hover:bg-white transition-all duration-200 no-underline rounded-sm font-bold ${cls}`}
      >
        <ExternalLink size={iconSize} /> Demo
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-mono-c tracking-[.12em] uppercase text-white/50 border border-white/12 hover:border-white/35 hover:text-white transition-all duration-200 no-underline rounded-sm ${cls}`}
      >
        <Github size={iconSize} /> Code
      </a>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = projects[activeProject];

  const handleSelect = (index) => {
    if (isMobile && activeProject === index) {
      setActiveProject(-1);
    } else {
      setActiveProject(index);
    }
  };

  return (
    <>
      <style>{CSS}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="font-syne relative overflow-hidden min-h-screen py-24 bg-slate-950"
      >
        <div className="grid-bg absolute inset-0 pointer-events-none z-1" />

        {/* Ticker */}
        <div className="relative z-2 overflow-hidden border-y border-teal-400/20 py-2.5 mb-16">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...Array(2)].map((_, i) =>
              projects.map((p, j) => (
                <React.Fragment key={`${i}-${j}`}>
                  <span className="font-mono-c text-[11px] tracking-[.2em] uppercase text-teal-400/40 px-10">{p.name}</span>
                  <span className="font-mono-c text-[11px] text-orange-500/60">✦</span>
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        {/* Header */}
        <div className={`relative z-2 px-[6vw] flex items-end justify-between flex-wrap gap-5 mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="font-mono-c text-xs tracking-[.3em] uppercase text-orange-500 mb-3 flex items-center gap-2.5 before:content-[''] before:w-5 before:h-px before:bg-orange-500">
              Selected Work
            </div>
            <div className="proj-title text-white">
              Feat<em>ured</em><br />Proj<em>ects</em>
            </div>
          </div>
          <div className="font-mono-c text-[11px] tracking-widest text-white/25">
            {String(Math.max(activeProject, 0) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>

        {/* ── DESKTOP layout (lg+) ── */}
        <div className={`hidden lg:grid relative z-2 px-[6vw] grid-cols-[45%_55%] gap-8 transition-opacity duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

          {/* Left: List */}
          <div className="flex flex-col">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`proj-item relative border-t border-white/6 py-6 cursor-pointer transition-all duration-380 ease-[cubic-bezier(.23,1,.32,1)] last:border-b last:border-white/6 ${activeProject === index ? 'active' : ''}`}
                onClick={() => setActiveProject(index)}
              >
                <div className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 bg-teal-400 scale-y-0 origin-top transition-transform duration-380 ease-[cubic-bezier(.23,1,.32,1)]" />

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="item-num font-mono-c text-[10px] tracking-[.2em] text-white/20 mb-1.5 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="proj-item-name item-name font-bold text-white/35 transition-colors duration-300 leading-[1.15] mb-2">
                      {project.name}
                    </div>
                  </div>
                  {/* Type badge on list row */}
                  <div className="shrink-0 mt-1">
                    {project.isClient
                      ? <span className="client-badge"><Lock size={8} />Client</span>
                      : <span className="personal-tag">Open</span>
                    }
                  </div>
                </div>

                <div className="item-tags flex flex-wrap gap-1.5 max-h-0 overflow-hidden opacity-0 transition-all duration-380 ease-[cubic-bezier(.23,1,.32,1)]">
                  {project.technologies.slice(0, 4).map((t, i) => (
                    <span key={i} className="font-mono-c text-[9px] tracking-[.12em] uppercase px-2 py-0.5 border border-teal-400/25 text-teal-400/60 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2.5 pt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProject(i)}
                  className={`h-1 rounded-full border-none cursor-pointer transition-all duration-300 ${activeProject === i ? 'w-5 bg-teal-400' : 'w-1 bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Detail panel */}
          {activeProject >= 0 && (
            <div className="animate-fade-slide flex flex-col" key={active.id}>

              {/* Thumbnail */}
              <div className="thumb-wrap relative overflow-hidden rounded-lg bg-slate-900 border border-white/6" style={{ aspectRatio: '16/8' }}>
                <img src={active.image} alt={active.name} className="thumb-img w-full h-full object-cover opacity-80" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-900/70 to-transparent" />

                {/* Live / Client badge overlay */}
                <div className="absolute top-3.5 left-3.5">
                  {active.isClient ? (
                    <div className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.2em] uppercase text-orange-400/90 px-2 py-1 border border-orange-500/30 bg-slate-950/70 backdrop-blur-sm rounded-sm">
                      <Lock size={9} className="shrink-0" />
                      Client Work
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.2em] uppercase text-white/60 px-2 py-1 border border-white/10 bg-slate-950/60 backdrop-blur-sm rounded-sm">
                      <div className="animate-pulse-dot w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      Live
                    </div>
                  )}
                </div>

                <div className="ghost-num absolute bottom-2 right-4 pointer-events-none select-none">
                  {String(activeProject + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Info */}
              <div className="pt-6 pb-2">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div className="text-white font-extrabold leading-tight tracking-tight" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>
                    {active.name}
                  </div>
                  {/* ← Conditional buttons here */}
                  <div className="shrink-0 mt-1">
                    <ActionButtons project={active} />
                  </div>
                </div>
                <div className="font-mono-c text-[11px] text-orange-500/80 mb-3 tracking-[.05em]">// {active.tagline}</div>
                <p className="text-[14px] text-white/60 leading-relaxed mb-5 max-w-lg">{active.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {active.technologies?.map((t, i) => (
                    <span key={i} className="font-mono-c text-[9px] tracking-widest uppercase px-2.5 py-1 bg-slate-900 border border-slate-800 text-teal-400/60 rounded-sm">{t}</span>
                  ))}
                </div>
              </div>

              {active.features?.length > 0 && (
                <div className="mt-5 pt-5 border-t border-white/6 grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {active.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono-c text-teal-400/60 text-[11px] mt-0.5 shrink-0">→</span>
                      <span className="text-[14px] text-white/60 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── MOBILE layout — accordion ── */}
        <div className={`lg:hidden relative z-2 px-4 sm:px-6 transition-opacity duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {projects.map((project, index) => {
            const isOpen = activeProject === index;
            return (
              <div key={project.id} className="border-t border-white/6 last:border-b last:border-white/6">

                {/* Row trigger */}
                <div
                  className={`flex items-center justify-between py-5 cursor-pointer transition-all duration-300 ${isOpen ? 'pl-3.5' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div>
                      <div className={`font-mono-c text-[10px] tracking-[.2em] mb-1 transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-white/20'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div
                        className={`font-syne font-bold leading-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/40'}`}
                        style={{ fontSize: 'clamp(16px,4vw,22px)' }}
                      >
                        {project.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 ml-3">
                    {project.isClient
                      ? <span className="client-badge hidden sm:inline-flex"><Lock size={8} />Client</span>
                      : <span className="personal-tag hidden sm:inline-flex">Open</span>
                    }
                    <ChevronDown
                      size={16}
                      style={{
                        color: isOpen ? 'rgb(45 212 191)' : 'rgba(255,255,255,.3)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform .35s cubic-bezier(.23,1,.32,1), color .3s',
                      }}
                    />
                  </div>
                </div>

                {/* Accordion drawer */}
                <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
                  <div className="pb-6 flex flex-col gap-4">

                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-lg bg-slate-900 border border-white/6" style={{ aspectRatio: '16/8' }}>
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-75" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-900/80 to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        {project.isClient ? (
                          <div className="inline-flex items-center gap-1 font-mono-c text-[8px] tracking-[.15em] uppercase text-orange-400/80 px-1.5 py-0.5 border border-orange-500/25 bg-slate-950/70 rounded-sm">
                            <Lock size={8} className="shrink-0" />
                            Client
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 font-mono-c text-[8px] tracking-[.15em] uppercase text-white/60 px-1.5 py-0.5 border border-white/10 bg-slate-950/70 rounded-sm">
                            <div className="animate-pulse-dot w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                            Live
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="font-mono-c text-[10px] text-orange-500/80 mb-2 tracking-[.05em]">// {project.tagline}</div>
                      <p className="text-[12px] text-white/45 leading-relaxed mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies?.slice(0, 5).map((t, i) => (
                          <span key={i} className="font-mono-c text-[8px] tracking-widest uppercase px-2 py-0.5 bg-slate-900 border border-slate-800 text-teal-400/60 rounded-sm">{t}</span>
                        ))}
                      </div>

                      {/* ← Conditional buttons */}
                      <ActionButtons project={project} size="sm" />
                    </div>

                    {/* Features */}
                    {project.features?.length > 0 && (
                      <div className="pt-3 border-t border-white/6 grid grid-cols-1 gap-2">
                        {project.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="font-mono-c text-teal-400/60 text-[10px] mt-0.5 shrink-0">→</span>
                            <span className="text-[11px] text-white/40 leading-snug">{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>
    </>
  );
};

export default Projects;