import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Twitter, Dribbble, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-100 border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="font-bold text-lg text-slate-900">
                ORBITLY<span className="text-indigo-600 font-light ml-1">STUDIO</span>
              </span>
            </Link>
            <p className="text-slate-600 max-w-sm text-sm leading-relaxed">
              Craft-driven digital design & product studio. We help ambitious startups turn bold ideas into high-conversion digital experiences.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                title="Twitter"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="GitHub"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="Dribbble"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Dribbble className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wide text-xs uppercase mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavClick('work')} className="hover:text-indigo-600 transition-colors">Work</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors">Services</button></li>
              <li><button onClick={() => handleNavClick('about')} className="hover:text-indigo-600 transition-colors">About Us</button></li>
              <li><button onClick={() => handleNavClick('blog')} className="hover:text-indigo-600 transition-colors">Blog</button></li>
              <li><button onClick={() => handleNavClick('contact')} className="hover:text-indigo-600 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wide text-xs uppercase mb-4">Services</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors text-left">Brand Identity</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors text-left">UI/UX Design</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors text-left">Web Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors text-left">App Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="hover:text-indigo-600 transition-colors text-left">Product Strategy</button></li>
            </ul>
          </div>

          {/* Admin & Contact */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wide text-xs uppercase mb-4">Office & Portal</h4>
            <p className="text-xs text-slate-500 mb-2">San Francisco, CA & Remote Global</p>
            <a href="mailto:hello@orbitly.studio" className="text-indigo-600 hover:underline block text-xs font-medium mb-4">
              hello@orbitly.studio
            </a>
            <div className="pt-2 border-t border-slate-200">
              <Link to="/admin/login" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                Admin Portal Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Orbitly Studio Inc. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
