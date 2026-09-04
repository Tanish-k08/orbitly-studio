import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle, Calendar, Sparkles, Clock } from 'lucide-react';
import { Blog } from '../types';
import { getPublicBlogBySlugApi } from '../services/api';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getPublicBlogBySlugApi(slug);
        setBlog(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Blog post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-24 text-slate-500 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[70vh] max-w-3xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 max-w-md">
          {error || "The article you requested does not exist or is currently in draft state."}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium text-sm shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-base font-medium text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Header Info */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {blog.featured && (
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-semibold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Article</span>
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>5 min read</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
          {blog.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-700 font-medium italic border-l-4 border-indigo-600 pl-4 py-1">
          {blog.excerpt}
        </p>
      </header>

      {/* Cover Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-slate-200/70 shadow-sm">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none pt-6 border-t border-slate-200">
        <MarkdownRenderer content={blog.content} />
      </div>

      {/* Footer Share / Back */}
      <div className="pt-12 border-t border-slate-200 flex items-center justify-between">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-base font-medium text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Articles</span>
        </Link>
        <span className="text-sm text-slate-500">Published by Orbitly Studio Editorial</span>
      </div>
    </article>
  );
};
