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
    <footer className="bg-slate-100 border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="font-bold text-xl text-slate-900">
                ORBITLY<span className="text-indigo-600 font-light ml-1">STUDIO</span>
              </span>
            </Link>
            <p className="text-slate-600 max-w-sm text-base leading-relaxed">
              Craft-driven digital design & product studio. We help ambitious startups turn bold ideas into high-conversion digital experiences.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                title="Twitter"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="GitHub"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Github className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="Dribbble"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Dribbble className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                title="LinkedIn"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wider text-base uppercase mb-4">Navigation</h4>
            <ul className="space-y-3 text-base">
              <li><button onClick={() => handleNavClick('work')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium">Work</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium">Services</button></li>
              <li><button onClick={() => handleNavClick('about')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium">About Us</button></li>
              <li><button onClick={() => handleNavClick('blog')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium">Blog</button></li>
              <li><button onClick={() => handleNavClick('contact')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium">Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wider text-base uppercase mb-4">Services</h4>
            <ul className="space-y-3 text-base">
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium text-left">Brand Identity</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium text-left">UI/UX Design</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium text-left">Web Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium text-left">App Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-base text-slate-600 hover:text-slate-950 transition-colors font-medium text-left">Product Strategy</button></li>
            </ul>
          </div>

          {/* Admin & Contact */}
          <div>
            <h4 className="font-bold text-slate-900 tracking-wider text-base uppercase mb-4">Office & Portal</h4>
            <p className="text-base text-slate-700 mb-2">San Francisco, CA & Remote Global</p>
            <a href="mailto:hello@orbitly.studio" className="text-indigo-600 hover:underline block text-base font-medium mb-4">
              hello@orbitly.studio
            </a>
            <div className="pt-3 border-t border-slate-200">
              <Link to="/admin/login" className="text-base font-semibold text-slate-700 hover:text-slate-950 transition-colors">
                Admin Portal Login &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Orbitly Studio Inc. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
