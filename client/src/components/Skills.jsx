import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, TestTube, Palette, Wrench, Layers, Brain } from 'lucide-react';

const Skills = ({ skills }) => {
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

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      items: skills.frontend,
      color: 'teal'
    },
    {
      title: 'State Management',
      icon: Layers,
      items: skills.stateManagement,
      color: 'orange'
    },
    {
      title: 'API & Testing',
      icon: TestTube,
      items: skills.apiAndTesting,
      color: 'teal'
    },
    {
      title: 'UI Libraries',
      icon: Palette,
      items: skills.uiLibraries,
      color: 'orange'
    },
    {
      title: 'Tools & Build',
      icon: Wrench,
      items: skills.tools,
      color: 'teal'
    },
    {
      title: 'Design & UX',
      icon: Database,
      items: skills.design,
      color: 'orange'
    },
    {
      title: 'AI & Real-time',
      icon: Brain,
      items: skills.ai,
      color: 'purple'
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Technical <span className="text-teal-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.title}
                  className={`transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-slate-950 rounded-lg p-6 border border-slate-800 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 h-full group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${
                        category.color === 'teal' ? 'bg-teal-500/10' : 
                        category.color === 'orange' ? 'bg-orange-500/10' : 'bg-purple-500/10'
                      }`}>
                        <IconComponent
                          size={24}
                          className={
                            category.color === 'teal' ? 'text-teal-400' : 
                            category.color === 'orange' ? 'text-orange-500' : 'text-purple-400'
                          }
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default ${
                            category.color === 'teal'
                              ? 'bg-slate-800 text-teal-400 hover:bg-teal-500/20 border border-slate-700 hover:border-teal-500'
                              : category.color === 'orange'
                              ? 'bg-slate-800 text-orange-400 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500'
                              : 'bg-slate-800 text-purple-400 hover:bg-purple-500/20 border border-slate-700 hover:border-purple-500'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
