import axios from 'axios';
import { Project, Blog, LoginResponse, ApiResponse, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header automatically if token is present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// AUTH APIS
export const loginApi = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const getMeApi = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await api.get('/auth/me');
  return response.data;
};

// PUBLIC PROJECT APIS
export const getPublicProjectsApi = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>('/projects');
  return response.data.data || [];
};

export const getPublicProjectBySlugApi = async (slug: string): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
  if (!response.data.data) {
    throw new Error('Project not found');
  }
  return response.data.data;
};

// PUBLIC BLOG APIS
export const getPublicBlogsApi = async (): Promise<Blog[]> => {
  const response = await api.get<ApiResponse<Blog[]>>('/blogs');
  return response.data.data || [];
};

export const getPublicBlogBySlugApi = async (slug: string): Promise<Blog> => {
  const response = await api.get<ApiResponse<Blog>>(`/blogs/${slug}`);
  if (!response.data.data) {
    throw new Error('Blog post not found');
  }
  return response.data.data;
};

// ADMIN PROJECT APIS
export const getAdminProjectsApi = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>('/admin/projects');
  return response.data.data || [];
};

export const createProjectApi = async (projectData: Partial<Project>): Promise<Project> => {
  const response = await api.post<ApiResponse<Project>>('/admin/projects', projectData);
  return response.data.data!;
};

export const updateProjectApi = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await api.put<ApiResponse<Project>>(`/admin/projects/${id}`, projectData);
  return response.data.data!;
};

export const deleteProjectApi = async (id: string): Promise<void> => {
  await api.delete(`/admin/projects/${id}`);
};

// ADMIN BLOG APIS
export const getAdminBlogsApi = async (): Promise<Blog[]> => {
  const response = await api.get<ApiResponse<Blog[]>>('/admin/blogs');
  return response.data.data || [];
};

export const createBlogApi = async (blogData: Partial<Blog>): Promise<Blog> => {
  const response = await api.post<ApiResponse<Blog>>('/admin/blogs', blogData);
  return response.data.data!;
};

export const updateBlogApi = async (id: string, blogData: Partial<Blog>): Promise<Blog> => {
  const response = await api.put<ApiResponse<Blog>>(`/admin/blogs/${id}`, blogData);
  return response.data.data!;
};

export const deleteBlogApi = async (id: string): Promise<void> => {
  await api.delete(`/admin/blogs/${id}`);
};

export default api;
