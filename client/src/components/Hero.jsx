import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, FileDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{`
        .grid-bg{background-image:linear-gradient(rgba(45,212,191,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(45,212,191,.03) 1px,transparent 1px);background-size:60px 60px}
      `}</style>
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-slate-950">
        <div className="grid-bg absolute inset-0 pointer-events-none z-1" />
        <div className="container mx-auto relative z-2">
          <div
            className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
          >
            <div
              className="inline-block mb-4 transition-all duration-500 delay-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <p className="text-teal-400 text-sm md:text-base font-medium tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Hello, I'm
              </p>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-500 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                background: 'linear-gradient(135deg, #14b8a6 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {data.name}
            </h1>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 transition-all duration-500 delay-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {data.title}
            </h2>

            <p
              className="text-slate-400 text-base sm:text-lg md:text-lg max-w-2xl mx-auto mb-8 transition-all duration-500 delay-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {data.tagline}
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-500 delay-600"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50"
              >
                Get In Touch
              </Button>
            </div>

            <div
              className="flex items-center justify-center space-x-4 transition-all duration-500 delay-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <a
                href={data.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href={data.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`}
                className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href={data.socials.portfolio}
                download
                className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                aria-label="Download Resume"
              >
                <FileDown size={20} />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-teal-400 transition-all duration-300 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </section>
    </>
  );
};

export default Hero;
