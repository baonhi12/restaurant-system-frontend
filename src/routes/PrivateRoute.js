// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Nếu không có token => chưa login => về /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu route này cần role Admin mà user role != Admin => về /not-found
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/not-found" replace />;
  }

  // Hợp lệ => render ra component con
  return children;
}

export default PrivateRoute;
