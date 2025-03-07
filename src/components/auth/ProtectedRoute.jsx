import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

// Protected route wrapper component
// Redirects to login if not authenticated
const ProtectedRoute = () => {
  // Use React's useContext directly with AuthContext
  const auth = useContext(AuthContext);
  const { isAuthenticated, loading } = auth;

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // If authenticated, render nested routes (Outlet)
  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;