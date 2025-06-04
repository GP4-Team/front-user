// src/pages/auth/Register.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';
import RegisterForm from '../../components/auth/RegisterForm';

/**
 * Register Page Component
 * Handles user registration with API integration and multi-tenancy support
 * 
 * @returns {JSX.Element} - Register page component
 */
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { tenant } = useTenant();
  
  // Extract redirect URL from query parameters or use default
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  
  // State for registration message
  const [registerMessage, setRegisterMessage] = useState({
    type: '',
    text: ''
  });
  
  // If user is already authenticated, redirect to dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectUrl} replace />;
  }

  /**
   * Handle successful registration
   * 
   * @param {Object} response - Registration API response
   */
  const handleRegisterSuccess = (response) => {
    setRegisterMessage({
      type: 'success',
      text: response.message || 'Registration successful! Please log in to continue.'
    });
    
    // Show success message for 2 seconds before redirecting
    setTimeout(() => {
      // If login is automatic, redirect to dashboard or specified URL
      if (response.token) {
        navigate(redirectUrl);
      } else {
        // Otherwise redirect to login page
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please log in with your new account.',
            email: response.email
          } 
        });
      }
    }, 2000);
  };

  /**
   * Handle registration error
   * 
   * @param {Object} error - Error object
   */
  const handleRegisterError = (error) => {
    setRegisterMessage({
      type: 'error',
      text: error.message || 'Registration failed. Please try again.'
    });
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      setRegisterMessage({ type: '', text: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Tenant branding */}
        <div className="text-center">
          {tenant.logo && (
            <img
              className="mx-auto h-16 w-auto"
              src={tenant.logo}
              alt={tenant.name}
            />
          )}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
        
        {/* Registration message */}
        {registerMessage.text && (
          <div className={`rounded-md p-4 ${
            registerMessage.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-400' 
              : 'bg-red-50 text-red-800 border border-red-400'
          }`}>
            <p className="text-sm font-medium">{registerMessage.text}</p>
          </div>
        )}
        
        {/* Registration form */}
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterError}
          redirectPath={redirectUrl}
        />
      </div>
    </div>
  );
};

export default Register;