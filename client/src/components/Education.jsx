import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = ({ education, certifications }) => {
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
    <section id="education" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Education & <span className="text-teal-400">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-slate-950 rounded-lg p-6 border border-slate-800 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 h-full group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg">
                      <GraduationCap size={28} className="text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-orange-500 font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} className="text-teal-400" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-teal-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-sm">CGPA:</span>
                    <span className="text-teal-400 font-semibold">{edu.cgpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Award className="text-orange-500" size={28} />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-slate-950 rounded-lg p-5 border border-slate-800 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
                        {cert.name}
                      </h4>
                      <p className="text-slate-400 text-sm">
                        <span className="text-teal-400">{cert.issuer}</span> • {cert.date}
                      </p>
                    </div>
                    <a
                      href={cert.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors duration-300"
                    >
                      View Credential →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
