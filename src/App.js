import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthPage from './pages/auth/LoginPage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Home from './pages/common/HomePage.jsx';
import Profile from './pages/user/ProfilePage.jsx';
import NotFound from './pages/common/NotFound.jsx';
import Unauthorized from './pages/common/Unauthorized.jsx';
import ServerError from './pages/common//ServerError.jsx';

// Simple route guard implementation
const ProtectedRoute = ({ children }) => {
  // This is a simplified version - replace with your auth check logic
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<Home />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Error pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;