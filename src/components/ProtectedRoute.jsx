import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Aquí verificas si el usuario está autenticado
  // Por ahora lo haremos simple chequeando el localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    // Si no está autenticado, lo mandamos al login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;