export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  shortDescription: string;
  problem: string;
  solution: string;
  outcome: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: { field: string; message: string }[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
