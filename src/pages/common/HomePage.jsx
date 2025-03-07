import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="py-4 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">Skilloo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-gray-600 transition-colors duration-200">Home</Link>
          <Link to="/courses" className="font-medium hover:text-gray-600 transition-colors duration-200">Courses</Link>
          <Link to="/mentors" className="font-medium hover:text-gray-600 transition-colors duration-200">Mentors</Link>
          <Link to="/about" className="font-medium hover:text-gray-600 transition-colors duration-200">About</Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center">
                <span className="mr-2">{user?.name || 'User'}</span>
                <img 
                  src="/api/placeholder/40/40" 
                  alt={user?.name} 
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
              </div>
              
              <div className="relative group">
                <button className="font-medium hover:text-gray-600 transition-colors duration-200">
                  Dashboard
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>
                  )}
                  {user?.role === 'instructor' && (
                    <Link to="/instructor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Instructor Panel</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium hover:text-gray-600 transition-colors duration-200">Sign In</Link>
              <Link 
                to="/register" 
                className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4">
          <Link to="/" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Home</Link>
          <Link to="/courses" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Courses</Link>
          <Link to="/mentors" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Mentors</Link>
          <Link to="/about" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">About</Link>
          
          <div className="mt-4 pt-4 border-t border-gray-300">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 flex items-center">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt={user?.name} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium">{user?.name || 'User'}</span>
                </div>
                <Link to="/dashboard" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Dashboard</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Admin Panel</Link>
                )}
                {user?.role === 'instructor' && (
                  <Link to="/instructor" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Instructor Panel</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Sign In</Link>
                <Link to="/register" className="block py-2 px-4 font-medium hover:bg-gray-100 hover:text-gray-900">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-6 md:py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Learn from anywhere around the globe with us
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Get quality courses with us with the best price. Now you can get the best course from us. We have top mentors around the globe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/courses" 
                className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Get Started
              </Link>
              <button className="flex items-center px-6 py-3 rounded-full bg-white text-black font-medium border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
                <span className="mr-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </span>
                How it works?
              </button>
            </div>
            
            <div className="mt-12">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`/api/placeholder/40/40`} 
                      alt={`Mentor ${i}`} 
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-lg">100+</div>
                  <div className="text-sm text-gray-600">Top Class Mentors</div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/api/placeholder/500/500" 
                alt="Student with headphones" 
                className="rounded-lg shadow-xl mx-auto"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-black font-bold">110K</div>
                <div className="text-gray-500 text-sm">Active Students</div>
              </div>
            </div>
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-40 h-40 bg-yellow-300 rounded-full -z-10 opacity-70"></div>
          </div>
        </div>
      </section>

      {/* Why We Are Different Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Why We Are Different From Others?</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We have highly professional mentors around the globe. We have great features than any other platform.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Best Quality</h3>
            <p className="text-gray-600">
              Our courses are reviewed by industry experts to ensure the highest quality and relevance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Time Flexibility</h3>
            <p className="text-gray-600">
              Learn at your own pace with lifetime access to courses and flexible scheduling.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Fast Support</h3>
            <p className="text-gray-600">
              Get answers to your questions quickly with our 24/7 support and active community.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our most popular & demanded courses</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img src="/api/placeholder/400/200" alt="Course thumbnail" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Branding & Logo</h3>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">Learn how to create beautiful and memorable brand identities that stand out in the market.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/api/placeholder/40/40" alt="Instructor" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-sm text-gray-600">John Smith</span>
                  </div>
                  <div className="text-yellow-500 font-bold">$69.99</div>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img src="/api/placeholder/400/200" alt="Course thumbnail" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Poster Design</h3>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">Master the art of eye-catching poster design with practical techniques and creative approaches.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/api/placeholder/40/40" alt="Instructor" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-sm text-gray-600">Emma Davis</span>
                  </div>
                  <div className="text-yellow-500 font-bold">$59.99</div>
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img src="/api/placeholder/400/200" alt="Course thumbnail" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Advanced Graphics Design</h3>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">Take your design skills to the next level with advanced techniques in industry-standard tools.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="/api/placeholder/40/40" alt="Instructor" className="w-8 h-8 rounded-full mr-2" />
                    <span className="text-sm text-gray-600">Michael Wong</span>
                  </div>
                  <div className="text-yellow-500 font-bold">$79.99</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/courses" className="inline-block px-8 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-300">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Skilloo</h3>
            <p className="text-gray-600 mb-4">
              Learn from the best instructors and advance your skills with practical, industry-relevant courses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184A4.92 4.92 0 0016.327 2a4.935 4.935 0 00-4.93 4.93c0 .386.023.762.07 1.127A14.087 14.087 0 011.695 3.05a4.926 4.926 0 001.523 6.573 4.868 4.868 0 01-2.23-.616v.06a4.935 4.935 0 003.95 4.835 4.968 4.968 0 01-2.223.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Development</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Marketing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Business</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Photography</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Copyright</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300 text-center">
          <p className="text-gray-600">© 2025 Skilloo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;