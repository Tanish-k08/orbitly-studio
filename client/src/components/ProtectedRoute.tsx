import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');

  if (!token || !userJson) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(userJson);
    if (user.role !== 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
