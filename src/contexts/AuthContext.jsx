import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get stored token and user data
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth restoration error:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData, authToken) => {
    try {
      // Store in state
      setUser(userData);
      setToken(authToken);
      
      // Store in localStorage
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Demo login function - for testing without API
  const demoLogin = (email, password) => {
    // Demo credentials
    const DEMO_CREDENTIALS = {
      email: 'demo@example.com',
      password: 'demo1234'
    };
    
    // Check credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const userData = {
        id: 1,
        email: DEMO_CREDENTIALS.email,
        username: 'demouser',
        role: 'user'
      };
      
      // Use login function with demo data
      return login(userData, 'demo-jwt-token-12345');
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Navigate to login
    navigate('/');
  };

  // Registration function
  const register = (userData) => {
    try {
      // For demo purposes, generate a token and user ID
      const mockUserData = {
        id: Math.floor(Math.random() * 1000),
        email: userData.email,
        username: userData.username,
        role: 'user'
      };
      
      const mockToken = 'demo-registration-token-' + Date.now();
      
      // Use the login function to set auth state and navigate
      return login(mockUserData, mockToken);
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Define the context value
  const contextValue = {
    user,
    token,
    loading,
    login,
    demoLogin,
    logout,
    register,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext as default export
export default AuthContext;