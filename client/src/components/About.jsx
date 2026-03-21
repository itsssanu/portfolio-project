import React, { useEffect, useRef, useState } from 'react';

const TypingText = () => {
  const text = `> whoami
Anupriya - Frontend Developer

> experience
3+ years building scalable UI

> skills
React | Redux | Next.js | JavaScript (ES6+) | Tailwind CSS | HTML5 | CSS3 | Vite | REST APIs | Axios | Git | GitHub | Responsive Design | Performance Optimization | Code Splitting | Lazy Loading | UI/UX Design | Figma | Debugging | Testing (Playwright)

> passion
Crafting smooth & modern UI`;

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting) {
        setDisplayedText(text.slice(0, i));
        i++;

        if (i > text.length) {
          isDeleting = true;
          setTimeout(type, 1200); // pause before delete
          return;
        }
      } else {
        setDisplayedText(text.slice(0, i));
        i--;

        if (i === 0) {
          isDeleting = false;
        }
      }

      setTimeout(type, isDeleting ? 15 : 25); // ⚡ faster typing + deleting
    };

    type();
  }, []);

  return (
    <pre className="whitespace-pre-wrap">
      {displayedText}
<span className="w-2 h-4.5 bg-teal-400 animate-pulse"></span>    </pre>
  );
};

const About = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            About <span className="text-teal-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            
            {/* 🔥 Terminal UI */}
            <div
              className={`transform transition-all duration-700 delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-teal-500 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>

                <div className="relative bg-slate-900 rounded-lg p-6 aspect-square flex flex-col justify-center font-mono text-sm overflow-hidden border border-slate-800 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>

                  {/* Typing Content */}
                  <div className="text-slate-300 leading-relaxed md:text-base text-sm">
                    <TypingText />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`transform transition-all duration-700 delay-300 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Passionate Developer with a Creative Edge
              </h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                {data.summary}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-teal-500 transition-colors duration-300">
                  <p className="text-teal-400 text-2xl font-bold">3+</p>
                  <p className="text-slate-400 text-sm">Years Experience</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-teal-500 transition-colors duration-300">
                  <p className="text-teal-400 text-2xl font-bold">2+</p>
                  <p className="text-slate-400 text-sm">Major Projects</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React.js", "Redux", "JavaScript", "Socket.io", "Tailwind CSS", "Ant Design", "Figma", "Cursor", "Copilot", "Git"].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-slate-800 text-teal-400 rounded-full text-sm border border-slate-700 hover:bg-teal-500/10 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;