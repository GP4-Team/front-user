import React, { useState, useContext } from 'react';
import { Form, Input } from 'antd';
import AuthContext from '../../contexts/AuthContext';

const AuthPage = () => {
  // Get auth context functions
  const auth = useContext(AuthContext);
  const { demoLogin, register } = auth;

  const [isLoginView, setIsLoginView] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Demo credentials
  const DEMO_CREDENTIALS = {
    email: 'demo@example.com',
    password: 'demo1234',
    username: 'demouser'
  };

  // Handle toggle animation
  const toggleView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLoginView(!isLoginView);
      setIsAnimating(false);
    }, 600); // Match this with the CSS transition duration
  };

  const validateEmail = (rule, value) => {
    if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return Promise.reject('Please enter a valid email address');
    } else {
      return Promise.resolve();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    setAuthError(null);
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Use the demoLogin function from context
        const loginSuccess = demoLogin(email, password);
        
        if (!loginSuccess) {
          // Show demo login info for testing
          setAuthError('Login failed. Use demo credentials: Email: demo@example.com / Password: demo1234');
        }
      } catch (error) {
        console.error('Login error:', error);
        setAuthError('An error occurred during login. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onFinishRegister = async (values) => {
    setIsLoading(true);
    
    try {
      // Use register function from context
      register({
        username: values.username,
        email: values.email,
        password: values.password
      });
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill demo credentials on button click
  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-amber-50">
      {/* Demo credentials banner */}
      <div className="absolute top-0 left-0 right-0 bg-green-100 text-green-800 px-4 py-2 text-center">
        Demo Mode: Use email <strong>demo@example.com</strong> and password <strong>demo1234</strong> or click "Fill Demo Credentials"
      </div>

      {/* Container with fixed width that will animate */}
      <div 
        className={`w-full flex transition-transform duration-600 ease-in-out ${
          isAnimating ? 'transform duration-600' : ''
        } ${isLoginView ? '' : 'transform -translate-x-full'}`}
        style={{ marginTop: '40px' }} // Add space for the demo banner
      >
        {/* Login View (Blue on left, form on right) */}
        <div className="flex min-w-full">
          {/* Blue Section */}
          <div className="w-full md:w-5/12 bg-black p-8 flex flex-col justify-center items-center rounded-br-[50px] md:rounded-none md:rounded-r-[50px]">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Hello, Welcome!</h1>
              <p className="text-white text-lg mb-8">Don't have an account?</p>
              <button 
                onClick={toggleView}
                className="inline-block border-2 border-white text-white font-semibold py-2 px-10 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full md:w-7/12 p-8 flex flex-col justify-center items-center bg-white">
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-6">Login</h2>
              
              {authError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {authError}
                </div>
              )}
              
              <button 
                onClick={fillDemoCredentials}
                className="w-full mb-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Fill Demo Credentials
              </button>
              
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="email"
                      placeholder="Email"
                      className="w-full bg-amber-50 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading || isAnimating}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="w-full bg-blue-50 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading || isAnimating}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  <div className="text-right mt-2">
                    <a href="/forgot-password" className="text-sm text-gray-600 hover:text-black">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white font-semibold py-3 px-4 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                  disabled={isLoading || isAnimating}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
              
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="mx-4 text-sm text-gray-500">or login with social platforms</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Register View (Form on left, blue on right) */}
        <div className="flex min-w-full">
          {/* Register Form */}
          <div className="w-full md:w-7/12 p-8 flex flex-col justify-center items-center bg-white">
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-6">Registration</h2>
              
              {authError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {authError}
                </div>
              )}
              
              {/* User registration form */}
              <Form onFinish={onFinishRegister}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please enter a username' }]}
                >
                  <Input
                    placeholder="Username"
                    className="w-full bg-amber-50 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                    prefix={<i className="fa-regular fa-user text-gray-400 mr-2"></i>}
                    disabled={isLoading || isAnimating}
                  />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { validator: validateEmail }
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="w-full bg-amber-50 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                    prefix={<i className="fa-regular fa-envelope text-gray-400 mr-2"></i>}
                    disabled={isLoading || isAnimating}
                  />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please enter a password' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full bg-amber-50 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
                    prefix={<i className="fa-solid fa-lock text-gray-400 mr-2"></i>}
                    disabled={isLoading || isAnimating}
                  />
                </Form.Item>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white font-semibold py-3 px-4 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                  disabled={isLoading || isAnimating}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
              </Form>
              
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="mx-4 text-sm text-gray-500">or register with social platforms</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                    </svg>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded-md transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Blue Section */}
          <div className="w-full md:w-5/12 bg-black p-8 flex flex-col justify-center items-center rounded-tl-[50px] md:rounded-none md:rounded-l-[50px]">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
              <p className="text-white text-lg mb-8">Already have an account?</p>
              <button 
                onClick={toggleView}
                className="inline-block border-2 border-white text-white font-semibold py-2 px-10 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for the animation */}
      <style>{`
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;