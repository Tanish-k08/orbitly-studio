import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Layout,
  Code,
  Compass,
  Star,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  Clock,
  Send,
  Check,
} from 'lucide-react';
import { Project, Blog } from '../types';
import { getPublicProjectsApi, getPublicBlogsApi } from '../services/api';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);

  // Contact Form Controlled State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    service: 'UI/UX Design',
    budget: '$15k - $30k',
    details: '',
  });
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactFormError, setContactFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const data = await getPublicProjectsApi();
        setProjects(data);
      } catch (err: any) {
        setProjectError(err.message || 'Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const data = await getPublicBlogsApi();
        setBlogs(data);
      } catch (err: any) {
        setBlogError(err.message || 'Failed to load blog posts');
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchProjects();
    fetchBlogs();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormError(null);

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.details.trim()) {
      setContactFormError('Please fill out all required fields.');
      return;
    }

    setSubmittingContact(true);
    setTimeout(() => {
      setSubmittingContact(false);
      setContactSuccess(true);
      setContactForm({
        name: '',
        email: '',
        service: 'UI/UX Design',
        budget: '$15k - $30k',
        details: '',
      });
    }, 1200);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Ambient Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>BOUTIQUE DIGITAL PRODUCT STUDIO</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
                Turning bold ideas into products <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">people love.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed font-medium">
                Orbitly Studio designs and builds high-conversion digital products, brand identities, and scalable full-stack applications for ambitious startups.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('work')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleScrollTo('contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 transition-all shadow-sm"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">$45M+</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">Client Capital Raised</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">On-Time Ship Rate</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9/5.0</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Mock */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl glass-panel p-6 sm:p-8 space-y-6 shadow-xl border border-white">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">orbitly.studio/v2.0</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/90 border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                          OS
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">Sprint Velocity Engine</div>
                          <div className="text-xs text-slate-500">Shipped 34 components</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Live
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500">Avg. Page Speed</div>
                        <div className="text-lg font-bold text-slate-900 mt-1">99 / 100</div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                          <div className="bg-indigo-600 h-1.5 rounded-full w-[99%]" />
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500">Conversion Impact</div>
                        <div className="text-lg font-bold text-emerald-600 mt-1">+41% Growth</div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                          <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-indigo-900">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <span>Craft-first execution guarantee</span>
                      </div>
                      <p className="text-slate-600 pl-6">
                        From pixel-perfect Figma designs to high-performance TypeScript code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-28">
        <div id="about" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              End-to-end craft for ambitious founders.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We bridge strategy, design, and full-stack engineering to build products that captivate users and drive commercial growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="glass-card p-8 rounded-2xl space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Brand Identity
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Logos, visual systems, typographic guidelines, and brand positioning that elevate your company above industry clutter.
              </p>
            </div>

            {/* Service 2 */}
            <div className="glass-card p-8 rounded-2xl space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                UI/UX Design
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Intuitive web & mobile interfaces focused on clarity, accessibility, seamless user journeys, and tactile micro-interactions.
              </p>
            </div>

            {/* Service 3 */}
            <div className="glass-card p-8 rounded-2xl space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Web Development
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ultra-fast, responsive web applications built with TypeScript, React, Next.js, and clean REST/GraphQL APIs.
              </p>
            </div>

            {/* Service 4 */}
            <div className="glass-card p-8 rounded-2xl space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Product Strategy
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                MVP scoping, user research, roadmap planning, and metrics optimization to ensure fast product-market fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS / CASE STUDIES SECTION */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Featured Work</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Selected Case Studies
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Explore how we’ve helped high-growth companies design, launch, and scale transformative digital products.
          </p>
        </div>

        {/* Loading Shimmer Skeletons */}
        {loadingProjects && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="glass-card rounded-2xl overflow-hidden space-y-4 p-6">
                <div className="w-full aspect-[16/9] rounded-xl skeleton-shimmer" />
                <div className="h-6 w-3/4 skeleton-shimmer rounded-md" />
                <div className="h-4 w-full skeleton-shimmer rounded-md" />
                <div className="h-4 w-1/2 skeleton-shimmer rounded-md" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {projectError && (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-base">Error Loading Projects</div>
              <div className="text-sm text-red-600">{projectError}</div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingProjects && !projectError && projects.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel text-slate-500">
            No published projects available at the moment.
          </div>
        )}

        {/* Projects Grid */}
        {!loadingProjects && !projectError && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1 transition-all"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. BLOG SECTION */}
      <section id="blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Insights & Perspective</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Latest Articles
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Thought-leadership on design systems, full-stack engineering, product strategy, and modern digital craft.
          </p>
        </div>

        {/* Loading Shimmer Skeletons */}
        {loadingBlogs && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card rounded-2xl overflow-hidden space-y-4 p-5">
                <div className="w-full aspect-[16/10] rounded-xl skeleton-shimmer" />
                <div className="h-5 w-full skeleton-shimmer rounded-md" />
                <div className="h-4 w-3/4 skeleton-shimmer rounded-md" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {blogError && (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-base">Error Loading Blog</div>
              <div className="text-sm text-red-600">{blogError}</div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingBlogs && !blogError && blogs.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel text-slate-500">
            No published blog posts available.
          </div>
        )}

        {/* Blog Grid */}
        {!loadingBlogs && !blogError && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className={`group glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                  blog.featured
                    ? 'border-indigo-300 ring-2 ring-indigo-500/20 bg-indigo-50/30'
                    : ''
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  {blog.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Endorsements</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What our client partners say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card p-8 rounded-2xl space-y-6 relative">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-base leading-relaxed italic">
              "Orbitly helped us turn a complicated product into an experience our customers immediately understood. Their speed and pixel craft are unmatched."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                AK
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Alex Kosta</div>
                <div className="text-xs text-slate-500">Founder & CEO, FinFlow</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-card p-8 rounded-2xl space-y-6 relative">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-base leading-relaxed italic">
              "Working with Orbitly Studio felt like having an elite in-house design and engineering team. They delivered our clinical app 3 weeks ahead of schedule."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                DR
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Dr. Sarah Lin</div>
                <div className="text-xs text-slate-500">Chief Medical Officer, NovaHealth</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="glass-card p-8 rounded-2xl space-y-6 relative">
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-700 text-base leading-relaxed italic">
              "The design system and headless e-commerce store Orbitly built directly contributed to our 41% spike in holiday sales. Truly world-class craft."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                MV
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Marcus Vance</div>
                <div className="text-xs text-slate-500">Head of Growth, Arc Commerce</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE CONTACT / CTA SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-28">
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-14 border border-white/80 shadow-2xl glow-accent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>START A CONVERSATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Have an idea worth building?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg">
                We are currently accepting new client projects. Tell us about your product goals, and we'll reply within 24 hours.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Fast 48-hour response & discovery call</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Fixed-scope MVP roadmap & pricing</span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              {contactSuccess ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thanks for reaching out to Orbitly Studio. Our design partners will review your project details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
                  {contactFormError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                      {contactFormError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Primary Service Needed
                      </label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                      >
                        <option>UI/UX Design</option>
                        <option>Brand Identity</option>
                        <option>Web Development</option>
                        <option>App Development</option>
                        <option>Product Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                      >
                        <option>\$15k - \$30k</option>
                        <option>\$30k - \$60k</option>
                        <option>\$60k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.details}
                      onChange={(e) => setContactForm({ ...contactForm, details: e.target.value })}
                      placeholder="Tell us briefly about your product goals, timeline, and challenges..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingContact}
                    className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submittingContact ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 text-slate-300" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
