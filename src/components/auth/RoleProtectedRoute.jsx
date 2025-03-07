import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

// Public route wrapper component
// Redirects to dashboard if already authenticated
const PublicRoute = () => {
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

  // If authenticated, redirect to dashboard
  // If not authenticated, render the requested route
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;