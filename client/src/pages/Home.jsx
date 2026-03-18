import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { portfolioData } from '../mockData';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <Header activeSection={activeSection} />
      <main>
        <Hero data={portfolioData.personal} />
        <About data={portfolioData.personal} />
        <Experience experiences={portfolioData.experience} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Education education={portfolioData.education} certifications={portfolioData.certifications} />
        <Contact data={portfolioData.personal} />
      </main>
      <Footer data={portfolioData.personal} />
    </div>
  );
};

export default Home;
