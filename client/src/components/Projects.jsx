import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';

const Projects = ({ projects }) => {
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
      // collapse if tapping same item
      setActiveProject(-1);
    } else {
      setActiveProject(index);
    }
  };

  return (
    <>
      <style>{`
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes expandDown{from{opacity:0;max-height:0}to{opacity:1;max-height:600px}}
        .font-syne{font-family:'Syne',sans-serif}
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
        .mobile-drawer.open{max-height:600px;opacity:1}
        .chevron-icon{transition:transform .35s cubic-bezier(.23,1,.32,1)}
        .proj-item.active .chevron-icon{transform:rotate(180deg)}
      `}</style>

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
            {String(Math.max(activeProject,0) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
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
                <div className="item-num font-mono-c text-[10px] tracking-[.2em] text-white/20 mb-1.5 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="proj-item-name item-name font-bold text-white/35 transition-colors duration-300 leading-[1.15] mb-2">
                  {project.name}
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
                <button key={i} onClick={() => setActiveProject(i)}
                  className={`h-1 rounded-full border-none cursor-pointer transition-all duration-300 ${activeProject === i ? 'w-5 bg-teal-400' : 'w-1 bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Detail */}
          {activeProject >= 0 && (
            <div className="animate-fade-slide flex flex-col" key={active.id}>
              <div className="thumb-wrap relative overflow-hidden rounded-lg bg-slate-900 border border-white/6" style={{ aspectRatio: '16/7' }}>
                <img src={active.image} alt={active.name} className="thumb-img w-full h-full object-cover opacity-80" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-900/70 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <div className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.2em] uppercase text-white/60 px-2 py-1 border border-white/10 bg-slate-950/60 backdrop-blur-sm rounded-sm">
                    <div className="animate-pulse-dot w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    Live
                  </div>
                </div>
                <div className="ghost-num absolute bottom-2 right-4 pointer-events-none select-none">
                  {String(activeProject + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="pt-6 pb-2">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div className="text-white font-extrabold leading-tight tracking-tight" style={{ fontSize: 'clamp(22px,3vw,36px)' }}>
                    {active.name}
                  </div>
                  <div className="flex gap-2 shrink-0 mt-1">
                    <a href={active.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.12em] uppercase px-3 py-2 bg-teal-400 text-slate-950 hover:bg-white transition-all duration-200 no-underline rounded-sm font-bold">
                      <ExternalLink size={11} /> Demo
                    </a>
                    <a href={active.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.12em] uppercase px-3 py-2 text-white/50 border border-white/12 hover:border-white/35 hover:text-white transition-all duration-200 no-underline rounded-sm">
                      <Github size={11} /> Code
                    </a>
                  </div>
                </div>
                <div className="font-mono-c text-[11px] text-orange-500/80 mb-3 tracking-[.05em]">// {active.tagline}</div>
                <p className="text-[13px] text-white/45 leading-relaxed mb-5 max-w-lg">{active.description}</p>
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
                      <span className="text-[12px] text-white/40 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── MOBILE layout (< lg) — accordion ── */}
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
                    {/* Accent line */}
                    <div className={`absolute left-0 w-0.5 bg-teal-400 transition-all duration-380 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                      style={{ height: isOpen ? '100%' : '0%' }} />
                    <div>
                      <div className={`font-mono-c text-[10px] tracking-[.2em] mb-1 transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-white/20'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={`font-syne font-bold leading-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/40'}`}
                        style={{ fontSize: 'clamp(16px,4vw,22px)' }}>
                        {project.name}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`chevron-icon shrink-0 ml-3 text-white/30 ${isOpen ? 'rotate-180 text-teal-400!' : ''}`}
                    style={{ transition: 'transform .35s cubic-bezier(.23,1,.32,1), color .3s' }}
                  />
                </div>

                {/* Accordion drawer */}
                <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
                  <div className="pb-6 flex flex-col gap-4">

                    {/* Thumbnail — compact on mobile */}
                    <div className="relative overflow-hidden rounded-lg bg-slate-900 border border-white/6" style={{ aspectRatio: '16/9' }}>
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-75" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-900/80 to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <div className="inline-flex items-center gap-1 font-mono-c text-[8px] tracking-[.15em] uppercase text-white/60 px-1.5 py-0.5 border border-white/10 bg-slate-950/70 rounded-sm">
                          <div className="animate-pulse-dot w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                          Live
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="font-mono-c text-[10px] text-orange-500/80 mb-2 tracking-[.05em]">// {project.tagline}</div>
                      <p className="text-[12px] text-white/45 leading-relaxed mb-4">{project.description}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies?.slice(0, 5).map((t, i) => (
                          <span key={i} className="font-mono-c text-[8px] tracking-widest uppercase px-2 py-0.5 bg-slate-900 border border-slate-800 text-teal-400/60 rounded-sm">{t}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2.5">
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.12em] uppercase px-3.5 py-2 bg-teal-400 text-slate-950 hover:bg-white transition-colors duration-200 no-underline rounded-sm font-bold">
                          <ExternalLink size={10} /> Demo
                        </a>
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono-c text-[9px] tracking-[.12em] uppercase px-3.5 py-2 text-white/50 border border-white/12 hover:border-white/35 hover:text-white transition-colors duration-200 no-underline rounded-sm">
                          <Github size={10} /> Code
                        </a>
                      </div>
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