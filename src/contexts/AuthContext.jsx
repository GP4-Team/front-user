// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/api/auth.service';
import { getToken, setToken, removeToken } from '../utils/tokenHelpers';
import api, { initCsrfToken, testApiConnection } from '../services/api';
import { addDebugCommands } from '../utils/apiDebugger';

// Create the context
export const AuthContext = createContext();

/**
 * AuthProvider component - Manages user state and authentication operations
 * Modified to not use useNavigate()
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Auth provider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize CSRF token and debugging tools on component mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing application...');
        
        // Add debug commands in development mode
        addDebugCommands();
        
        // Test API connection and initialize CSRF token
        console.log('🔧 Testing API connection...');
        await testApiConnection();
        
        console.log('✅ Application initialized successfully');
      } catch (error) {
        console.error('❌ Application initialization failed:', error);
      }
    };
    
    initializeApp();
  }, []);

  // Check authentication status on app load
  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const token = getToken();
        if (token) {
          // Try to restore user from local storage first
          const storedUserJson = localStorage.getItem('userData');
          if (storedUserJson && isMounted) {
            const storedUser = JSON.parse(storedUserJson);
            setUser(storedUser);
            setIsAuthenticated(true);
          }

          // Then update data from server (in background)
          try {
            const userData = await authService.getCurrentUser();
            if (isMounted) {
              setUser(userData);
              setIsAuthenticated(true);
              // Update stored user data
              localStorage.setItem('userData', JSON.stringify(userData));
            }
          } catch (error) {
            // If fetching from server fails, log out
            console.error('Failed to verify current user:', error);
            if (isMounted) {
              handleLogout(false); // Don't navigate during cleanup
            }
          }
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Login
   * Returns data without navigation - navigation should be handled by component
   * 
   * @param {string} email - Email
   * @param {string} password - Password
   * @param {boolean} remember - Whether to remember the login
   * @returns {Promise} - Promise with user data
   */
  const login = async (email, password, remember = false) => {
    try {
      // Make sure we have a fresh CSRF token (only in production)
      if (window.location.hostname !== 'localhost') {
        await initCsrfToken();
      }
      
      const response = await authService.login(email, password, remember);
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout
   * Modified to not use navigation directly - navigation should be handled by component
   * 
   * @param {boolean} clearStorage - Whether to clear storage
   */
  const handleLogout = async (clearStorage = true) => {
    if (clearStorage) {
      try {
        // Make sure we have a fresh CSRF token
        await initCsrfToken();
        await authService.logout();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      // Just clear local state without API call
      removeToken();
      localStorage.removeItem('userData');
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Register
   * Returns data without navigation - navigation should be handled by component
   * 
   * @param {Object} userData - User data
   * @param {boolean} loginAfterRegister - Whether to login after register
   * @returns {Promise} - Promise with registered user data
   */
  const register = async (userData, loginAfterRegister = true) => {
    try {
      // Make sure we have a fresh CSRF token (only in production)
      if (window.location.hostname !== 'localhost') {
        await initCsrfToken();
      }
      
      const response = await authService.register(userData);
      
      // Auto login after registration if requested
      if (loginAfterRegister && response.user && response.user.email) {
        await login(response.user.email, userData.password);
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  /**
   * Update user data
   * 
   * @param {Object} userData - Updated user data
   * @returns {Promise} - Promise with updated user data
   */
  const updateUserData = async (userData) => {
    try {
      // Make sure we have a fresh CSRF token
      await initCsrfToken();
      
      // Call the profile update API - we'll need to implement this
      const response = await api.put('/profile', userData);
      const updatedUser = response.data;
      setUser(updatedUser);
      // Update local storage
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  /**
   * Change password
   * 
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - Promise with success message
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // Make sure we have a fresh CSRF token
      await initCsrfToken();
      
      // Call the change password API - we'll need to implement this
      const response = await api.post('/change-password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  /**
   * Check if user has a specific role
   * 
   * @param {string} role - Role to check
   * @returns {boolean} - Whether user has the role
   */
  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  /**
   * Check if user has a specific permission
   * 
   * @param {string} permission - Permission to check
   * @returns {boolean} - Whether user has the permission
   */
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };
  
  /**
   * Check if user is logged in
   * 
   * @returns {boolean} - Whether user is logged in
   */
  const isLoggedIn = () => {
    return !!getToken() && isAuthenticated;
  };

  // Provide context value
  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    login,
    logout: handleLogout,
    register,
    updateUserData,
    changePassword,
    hasRole,
    hasPermission,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;