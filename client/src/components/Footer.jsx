import React from 'react';
import { Github, Linkedin, Mail, Heart, FileText } from 'lucide-react';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-white hover:text-teal-400 transition-colors duration-300 mb-2"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              &lt;AP /&gt;
            </button>
            <p className="text-slate-400 text-sm">
              Crafted with <Heart size={14} className="inline text-orange-500" fill="currentColor" /> modern React UI & a Node.js-powered Contact API
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`}
              className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href={data.socials.portfolio}
              download
              className="text-slate-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              aria-label="Download Resume"
            >
              <FileText size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">
              © {currentYear} {data.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
