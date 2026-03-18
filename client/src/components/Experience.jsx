import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = ({ experiences }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .grid-bg{background-image:linear-gradient(rgba(45,212,191,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(45,212,191,.03) 1px,transparent 1px);background-size:60px 60px}
      `}</style>
      <section id="experience" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="grid-bg absolute inset-0 pointer-events-none z-1" />
        <div className="container mx-auto max-w-6xl relative z-2">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Work <span className="text-teal-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto mb-12"></div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-800"></div>

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative mb-12 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`md:flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className="md:w-1/2 md:px-8">
                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-orange-500 font-medium">{exp.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs font-medium border border-teal-500/30">
                          {exp.type}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-teal-400" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} className="text-teal-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4">{exp.description}</p>

                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                            <span className="text-teal-400 mt-1 shrink-0">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-teal-500 rounded-full items-center justify-center z-10">
                    <Briefcase size={20} className="text-teal-400" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Experience;
