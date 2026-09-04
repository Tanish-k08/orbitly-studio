import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle, Target, Lightbulb, Trophy } from 'lucide-react';
import { Project } from '../types';
import { getPublicProjectBySlugApi } from '../services/api';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getPublicProjectBySlugApi(slug);
        setProject(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 text-slate-500 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium">Loading case study details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] max-w-3xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Case Study Not Found</h1>
        <p className="text-slate-600 max-w-md">
          {error || "The project you are looking for does not exist or has not been published yet."}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Work</span>
        </button>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Back Link */}
      <div>
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-base font-medium text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 max-w-3xl leading-relaxed font-normal">
          {project.shortDescription}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-slate-200/70 shadow-sm">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      {/* Detailed Sections: Problem, Solution, Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* The Problem */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">The Challenge</h2>
          <p className="text-slate-700 text-base leading-relaxed font-normal">
            {project.problem}
          </p>
        </div>

        {/* The Solution */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">What Orbitly Did</h2>
          <p className="text-slate-700 text-base leading-relaxed font-normal">
            {project.solution}
          </p>
        </div>

        {/* The Outcome */}
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">Impact & Outcome</h2>
          <p className="text-slate-700 text-base leading-relaxed font-normal">
            {project.outcome}
          </p>
        </div>
      </div>

      {/* Case Study Summary Footer */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-950 mb-1">Inspired by this result?</h3>
          <p className="text-slate-700 text-base">Let’s discuss how we can build something similar for your product.</p>
        </div>
        <Link
          to="/#contact"
          className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all shadow-md whitespace-nowrap"
        >
          Start a Project Conversation
        </Link>
      </div>
    </article>
  );
};
