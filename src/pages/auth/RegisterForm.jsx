import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulated API function
const simulateApiRegister = (userData) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Email validation
      if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        reject({
          success: false,
          message: 'Please provide a valid email address'
        });
        return;
      }

      // Password validation
      if (!userData.password || userData.password.length < 6) {
        reject({
          success: false,
          message: 'Password must be at least 6 characters'
        });
        return;
      }

      // Password match validation
      if (userData.password !== userData.confirmPassword) {
        reject({
          success: false,
          message: 'Passwords do not match'
        });
        return;
      }

      // Username validation
      if (!userData.firstName || !userData.lastName) {
        reject({
          success: false,
          message: 'Please provide your full name'
        });
        return;
      }

      // For demo purposes, accept any valid input
      resolve({
        success: true,
        user: {
          id: 'user-' + Math.random().toString(36).substring(2),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          accountType: userData.accountType,
          token: 'simulated-jwt-token-' + Math.random().toString(36).substring(2)
        }
      });
    }, 1500); // 1.5 second delay to simulate network request
  });
};

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    accountType: 'student',
    interests: [],
    agreeToTerms: false
  });
  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  // Available interest categories
  const interestCategories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Data Science',
    'Machine Learning',
    'Digital Marketing',
    'Graphic Design',
    'Business',
    'Photography',
    'Music'
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'agreeToTerms') {
        setFormData({
          ...formData,
          [name]: checked
        });
      } else {
        // Handle interests checkboxes
        const updatedInterests = [...formData.interests];
        if (checked) {
          updatedInterests.push(value);
        } else {
          const index = updatedInterests.indexOf(value);
          if (index > -1) {
            updatedInterests.splice(index, 1);
          }
        }
        setFormData({
          ...formData,
          interests: updatedInterests
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.phone && !/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step !== 3) {
      nextStep();
      return;
    }
    
    if (!validateStep3()) {
      return;
    }
    
    // Clear previous messages
    setRegisterError(null);
    setRegisterSuccess(false);
    
    setIsLoading(true);
    
    try {
      // Call the simulated API
      const response = await simulateApiRegister(formData);
      
      // Set success message
      setRegisterSuccess(true);
      
      // Log success
      console.log('Registration successful:', response);
      
      // Optional: Automatically save user data and redirect
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.user.token);
      
      // Wait 1.5 seconds before redirecting to allow user to see success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      // Set error message
      setRegisterError(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Render step 1 (Personal Information)
  const renderStep1 = () => (
    <>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">I am registering as a:</label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${formData.accountType === 'student' ? 'border-black bg-blue-50' : 'border-gray-300'}`}>
            <input
              type="radio"
              name="accountType"
              value="student"
              className="hidden"
              checked={formData.accountType === 'student'}
              onChange={handleChange}
              disabled={isLoading || registerSuccess}
            />
            <span className="ml-2">Student</span>
          </label>
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${formData.accountType === 'instructor' ? 'border-black bg-blue-50' : 'border-gray-300'}`}>
            <input
              type="radio"
              name="accountType"
              value="instructor"
              className="hidden"
              checked={formData.accountType === 'instructor'}
              onChange={handleChange}
              disabled={isLoading || registerSuccess}
            />
            <span className="ml-2">Instructor</span>
          </label>
        </div>
      </div>
    </>
  );
  
  // Render step 2 (Security & Contact)
  const renderStep2 = () => (
    <>
      <div className="mb-6">
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number (optional)"
            className={`w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading || registerSuccess}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </>
  );
  
  // Render step 3 (Interests & Confirmation)
  const renderStep3 = () => (
    <>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">What are you interested in? (optional)</label>
        <div className="grid grid-cols-2 gap-2">
          {interestCategories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                name="interests"
                value={category}
                checked={formData.interests.includes(category)}
                onChange={handleChange}
                className="mr-2"
                disabled={isLoading || registerSuccess}
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 mr-2"
            disabled={isLoading || registerSuccess}
          />
          <span className="text-sm">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
      </div>
    </>
  );
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex flex-col md:flex-row-reverse min-h-screen">
        {/* Right side - Yellow section */}
        <div className="w-full md:w-5/12 bg-yellow-50 p-8 flex flex-col justify-center items-center">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Skilloo!</h1>
            <p className="text-gray-700 text-lg mb-8">Already have an account?</p>
            <a href="/login" className="inline-block border-2 border-gray-900 text-gray-900 font-semibold py-2 px-10 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300">
              Login
            </a>
          </div>
        </div>
        
        {/* Left side - Form section */}
        <div className={`w-full md:w-7/12 p-8 flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-md w-full">
            <div className="text-right mb-4">
              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
            
            <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div 
                    key={stepNumber}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= stepNumber 
                        ? 'bg-black text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {stepNumber}
                  </div>
                ))}
              </div>
              <div className="flex mt-2 text-sm">
                <div className="flex-1 text-center">Personal Info</div>
                <div className="flex-1 text-center">Security</div>
                <div className="flex-1 text-center">Finish</div>
              </div>
            </div>
            
            {registerError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {registerError}
              </div>
            )}
            
            {registerSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                Registration successful! Redirecting to dashboard...
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                    disabled={isLoading || registerSuccess}
                  >
                    Back
                  </button>
                ) : (
                  <div></div> // Empty div to maintain spacing
                )}
                
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                  disabled={isLoading || registerSuccess}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    step < 3 ? 'Continue' : 'Create Account'
                  )}
                </button>
              </div>
            </form>
            
            {step === 1 && (
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <div className={`flex-grow h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  <span className={`mx-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>or register with</span>
                  <div className={`flex-grow h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    type="button"
                    className={`flex items-center justify-center p-3 border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-md transition-colors duration-300`}
                    onClick={() => console.log('Google register clicked')}
                    disabled={isLoading || registerSuccess}
                  >
                    <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"></path>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>
                  
                  <button 
                    type="button"
                    className={`flex items-center justify-center p-3 border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-md transition-colors duration-300`}
                    onClick={() => console.log('Facebook register clicked')}
                    disabled={isLoading || registerSuccess}
                  >
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                  
                  <button 
                    type="button"
                    className={`flex items-center justify-center p-3 border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-md transition-colors duration-300`}
                    onClick={() => console.log('GitHub register clicked')}
                    disabled={isLoading || registerSuccess}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;