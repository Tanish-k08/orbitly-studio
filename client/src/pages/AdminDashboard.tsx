import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Project, Blog, Inquiry } from '../types';
import {
  getAdminProjectsApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
  getAdminBlogsApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  getAdminInquiriesApi,
  deleteAdminInquiryApi,
} from '../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'blogs' | 'inquiries'>('overview');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form states for Project
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    thumbnail: '',
    shortDescription: '',
    problem: '',
    solution: '',
    outcome: '',
    tagsStr: '',
    status: 'published' as 'draft' | 'published',
  });

  // Form states for Blog
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    coverImage: '',
    content: '',
    featured: false,
    status: 'published' as 'draft' | 'published',
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [projData, blogData, inqData] = await Promise.all([
        getAdminProjectsApi(),
        getAdminBlogsApi(),
        getAdminInquiriesApi(),
      ]);
      setProjects(projData);
      setBlogs(blogData);
      setInquiries(inqData);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
        return;
      }
      setError(err.response?.data?.message || 'Failed to fetch admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  // --- PROJECT CRUD HANDLERS ---
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      shortDescription: '',
      problem: '',
      solution: '',
      outcome: '',
      tagsStr: 'UI/UX, TypeScript, Design System',
      status: 'published',
    });
    setFormError(null);
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (p: Project) => {
    setEditingProject(p);
    setProjectForm({
      title: p.title,
      slug: p.slug,
      thumbnail: p.thumbnail,
      shortDescription: p.shortDescription,
      problem: p.problem,
      solution: p.solution,
      outcome: p.outcome,
      tagsStr: p.tags ? p.tags.join(', ') : '',
      status: p.status,
    });
    setFormError(null);
    setProjectModalOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const tags = projectForm.tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const payload = {
        title: projectForm.title,
        slug: projectForm.slug,
        thumbnail: projectForm.thumbnail,
        shortDescription: projectForm.shortDescription,
        problem: projectForm.problem,
        solution: projectForm.solution,
        outcome: projectForm.outcome,
        tags,
        status: projectForm.status,
      };

      if (editingProject) {
        await updateProjectApi(editingProject._id, payload);
      } else {
        await createProjectApi(payload);
      }

      setProjectModalOpen(false);
      await loadData();
    } catch (err: any) {
      setFormError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to save project'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"?`)) return;
    try {
      await deleteProjectApi(id);
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  // --- BLOG CRUD HANDLERS ---
  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      content: '### Article Title\n\nWrite your markdown content here...',
      featured: false,
      status: 'published',
    });
    setFormError(null);
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (b: Blog) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      coverImage: b.coverImage,
      content: b.content,
      featured: b.featured,
      status: b.status,
    });
    setFormError(null);
    setBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const payload = {
        title: blogForm.title,
        slug: blogForm.slug,
        excerpt: blogForm.excerpt,
        coverImage: blogForm.coverImage,
        content: blogForm.content,
        featured: blogForm.featured,
        status: blogForm.status,
      };

      if (editingBlog) {
        await updateBlogApi(editingBlog._id, payload);
      } else {
        await createBlogApi(payload);
      }

      setBlogModalOpen(false);
      await loadData();
    } catch (err: any) {
      setFormError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to save blog post'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the blog post "${title}"?`)) return;
    try {
      await deleteBlogApi(id);
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete blog post');
    }
  };

  // --- INQUIRY CRUD HANDLERS ---
  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the inquiry from "${name}"?`)) return;
    try {
      await deleteAdminInquiryApi(id);
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete inquiry');
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInquiries = inquiries.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-8">
          {/* Studio Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm text-white">
              OS
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              ORBITLY <span className="text-indigo-600 font-light">ADMIN</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-base font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-semibold text-base ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-semibold text-base ${
                activeTab === 'projects'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderKanban className="w-5 h-5" />
              <span>Projects</span>
              <span className="ml-auto bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-mono font-bold">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-semibold text-base ${
                activeTab === 'blogs'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Blogs</span>
              <span className="ml-auto bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-mono font-bold">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-semibold text-base ${
                activeTab === 'inquiries'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Inbox className="w-5 h-5" />
              <span>Inquiries</span>
              {inquiries.length > 0 && (
                <span className="ml-auto bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-mono font-bold shadow-sm">
                  {inquiries.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 text-sm font-bold border border-slate-200 hover:border-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Global Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-base font-medium">Syncing CMS records from database...</p>
          </div>
        )}

        {/* Global Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-base flex items-center gap-3 mb-6 font-semibold">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Top Bar / Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 capitalize">
                  {activeTab} Management
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage live portfolio case studies, editorial blog articles, and client inquiries.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {activeTab === 'projects' && (
                  <button
                    onClick={openNewProjectModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                )}

                {activeTab === 'blogs' && (
                  <button
                    onClick={openNewBlogModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Blog Post</span>
                  </button>
                )}
              </div>
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div className="glass-card p-6 rounded-2xl space-y-2">
                    <div className="text-xs tracking-wider uppercase text-slate-500 font-bold">Total Projects</div>
                    <div className="text-3xl font-black text-slate-900">{projects.length}</div>
                    <div className="text-xs text-indigo-600 font-semibold pt-1">
                      {projects.filter((p) => p.status === 'published').length} published, {projects.filter((p) => p.status === 'draft').length} draft
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl space-y-2">
                    <div className="text-xs tracking-wider uppercase text-slate-500 font-bold">Total Articles</div>
                    <div className="text-3xl font-black text-slate-900">{blogs.length}</div>
                    <div className="text-xs text-indigo-600 font-semibold pt-1">
                      {blogs.filter((b) => b.status === 'published').length} published, {blogs.filter((b) => b.status === 'draft').length} draft
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl space-y-2">
                    <div className="text-xs tracking-wider uppercase text-slate-500 font-bold">Client Inquiries</div>
                    <div className="text-3xl font-black text-indigo-600">{inquiries.length}</div>
                    <div className="text-xs text-slate-500 pt-1">Received from contact form</div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl space-y-2">
                    <div className="text-xs tracking-wider uppercase text-slate-500 font-bold">Public Security</div>
                    <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 mt-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Draft Protection Active</span>
                    </div>
                    <div className="text-xs text-slate-500">Public APIs enforce status="published"</div>
                  </div>
                </div>

                {/* Quick Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Projects */}
                  <div className="glass-panel p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-lg">Recent Projects</h3>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="text-sm font-bold text-indigo-600 hover:underline"
                      >
                        View All &rarr;
                      </button>
                    </div>
                    <div className="space-y-3">
                      {projects.slice(0, 4).map((p) => (
                        <div
                          key={p._id}
                          onClick={() => openEditProjectModal(p)}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 text-sm shadow-sm hover:border-indigo-300 cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="text-lg font-semibold text-slate-900">{p.title}</div>
                            <div className="text-sm text-slate-500 font-mono">/{p.slug}</div>
                          </div>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              p.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Blog Posts */}
                  <div className="glass-panel p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-lg">Recent Articles</h3>
                      <button
                        onClick={() => setActiveTab('blogs')}
                        className="text-sm font-bold text-indigo-600 hover:underline"
                      >
                        View All &rarr;
                      </button>
                    </div>
                    <div className="space-y-3">
                      {blogs.slice(0, 4).map((b) => (
                        <div
                          key={b._id}
                          onClick={() => openEditBlogModal(b)}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 text-sm shadow-sm hover:border-indigo-300 cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="text-lg font-semibold text-slate-900">{b.title}</div>
                            <div className="text-sm text-slate-500 font-mono">/{b.slug}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {b.featured && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                                Featured
                              </span>
                            )}
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                b.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-sm"
                  />
                </div>

                {/* Table */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Slug</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Created Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredProjects.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                              No projects found matching search query.
                            </td>
                          </tr>
                        ) : (
                          filteredProjects.map((p) => (
                            <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-lg font-semibold text-slate-900">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.thumbnail}
                                    alt=""
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                                  />
                                  <span className="line-clamp-1">{p.title}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-mono text-slate-500 text-sm">/{p.slug}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                    p.status === 'published'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm">
                                {new Date(p.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditProjectModal(p)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-colors border border-slate-200"
                                  title="Edit Project"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p._id, p.title)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white transition-colors border border-slate-200"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-sm"
                  />
                </div>

                {/* Table */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Featured</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Created Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredBlogs.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                              No articles found matching search query.
                            </td>
                          </tr>
                        ) : (
                          filteredBlogs.map((b) => (
                            <tr key={b._id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={b.coverImage}
                                    alt=""
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                                  />
                                  <div>
                                    <div className="line-clamp-1 text-lg font-semibold text-slate-900">{b.title}</div>
                                    <div className="text-sm font-mono text-slate-500">/{b.slug}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {b.featured ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold">
                                    ★ Featured
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs">Standard</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                    b.status === 'published'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm">
                                {new Date(b.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <button
                                  onClick={() => openEditBlogModal(b)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-colors border border-slate-200"
                                  title="Edit Blog"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(b._id, b.title)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white transition-colors border border-slate-200"
                                  title="Delete Blog"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search inquiries by client name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 shadow-sm"
                  />
                </div>

                {/* Table */}
                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">Client Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Budget</th>
                          <th className="px-6 py-4">Project Details</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredInquiries.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                              No client inquiries found.
                            </td>
                          </tr>
                        ) : (
                          filteredInquiries.map((inq) => (
                            <tr key={inq._id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-lg font-semibold text-slate-900">
                                {inq.name}
                              </td>
                              <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                                <a href={`mailto:${inq.email}`} className="text-indigo-600 hover:underline">
                                  {inq.email}
                                </a>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                                  {inq.service}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-700 font-semibold text-sm">
                                {inq.budget}
                              </td>
                              <td className="px-6 py-4 text-slate-600 text-sm max-w-xs">
                                <p className="line-clamp-2 leading-relaxed">{inq.details}</p>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                                {new Date(inq.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteInquiry(inq._id, inq.name)}
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 text-slate-700 hover:text-white transition-colors border border-slate-200"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* --- PROJECT FORM MODAL --- */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white p-6 sm:p-8 space-y-6 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingProject ? 'Edit Project Case Study' : 'Create New Project Case Study'}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleProjectSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => {
                      setProjectForm({
                        ...projectForm,
                        title: e.target.value,
                        slug: editingProject ? projectForm.slug : generateSlug(e.target.value),
                      });
                    }}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                    placeholder="e.g. FinFlow Ecosystem"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-indigo-600"
                    placeholder="finflow-ecosystem"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  required
                  value={projectForm.thumbnail}
                  onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  placeholder="Brief summary displayed on project cards"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">The Problem</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.problem}
                    onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Solution</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Outcome</label>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.outcome}
                    onChange={(e) => setProjectForm({ ...projectForm, outcome: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.tagsStr}
                    onChange={(e) => setProjectForm({ ...projectForm, tagsStr: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                    placeholder="Fintech, React, Design System"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Publication Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  >
                    <option value="published">Published (Visible Publicly)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-sm border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BLOG FORM MODAL --- */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel w-full max-w-3xl rounded-3xl border border-white p-6 sm:p-8 space-y-6 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
              </h3>
              <button
                onClick={() => setBlogModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleBlogSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => {
                      setBlogForm({
                        ...blogForm,
                        title: e.target.value,
                        slug: editingBlog ? blogForm.slug : generateSlug(e.target.value),
                      });
                    }}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                    placeholder="e.g. Crafting High Conversion Products"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-indigo-600"
                    placeholder="crafting-high-conversion-products"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={blogForm.coverImage}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  placeholder="Summary snippet displayed on blog grid cards"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Article Content (Markdown Supported)
                </label>
                <textarea
                  required
                  rows={8}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono focus:border-indigo-600 leading-relaxed"
                  placeholder="Use Markdown: # Heading, **bold**, - list items, > quotes..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featuredToggle"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="featuredToggle" className="text-slate-700 font-bold cursor-pointer">
                    Feature this article on homepage
                  </label>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Publication Status</label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-indigo-600"
                  >
                    <option value="published">Published (Visible Publicly)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-sm border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingBlog ? 'Update Article' : 'Create Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
