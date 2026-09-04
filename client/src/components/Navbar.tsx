import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
              ORBITLY<span className="text-indigo-600 font-light ml-1">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('work')}
              className="hover:text-indigo-600 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-indigo-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-indigo-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="hover:text-indigo-600 transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-indigo-600 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {token && user?.role === 'admin' ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('work')}
              className="text-left py-2 hover:text-indigo-600 transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 hover:text-indigo-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-indigo-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 hover:text-indigo-600 transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-indigo-600 transition-colors"
            >
              Contact
            </button>

            {token && user?.role === 'admin' ? (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-200">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-slate-500 hover:text-slate-800"
                >
                  Admin Portal Login
                </Link>
              </div>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-md"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
