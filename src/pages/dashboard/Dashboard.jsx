import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for enrolled courses
const mockEnrolledCourses = [
  {
    id: 1,
    title: 'Introduction to UI/UX Design',
    instructor: 'Emma Davis',
    progress: 45,
    nextLesson: 'User Research Methods',
    thumbnail: '/api/placeholder/400/200',
    lastAccessed: '2 days ago'
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    instructor: 'Michael Wong',
    progress: 72,
    nextLesson: 'CSS Layouts and Flexbox',
    thumbnail: '/api/placeholder/400/200',
    lastAccessed: 'Yesterday'
  }
];

// Mock data for recommended courses
const mockRecommendedCourses = [
  {
    id: 3,
    title: 'Advanced UI Animation',
    instructor: 'Jessica Parker',
    rating: 4.8,
    students: 3240,
    thumbnail: '/api/placeholder/400/200',
    price: 79.99
  },
  {
    id: 4,
    title: 'JavaScript for Designers',
    instructor: 'Alex Johnson',
    rating: 4.6,
    students: 2180,
    thumbnail: '/api/placeholder/400/200',
    price: 59.99
  },
  {
    id: 5,
    title: 'Mobile App Design Workshop',
    instructor: 'Ryan Martinez',
    rating: 4.9,
    students: 1895,
    thumbnail: '/api/placeholder/400/200',
    price: 89.99
  }
];

// Mock data for upcoming events
const mockUpcomingEvents = [
  {
    id: 1,
    title: 'Live Q&A: Design Systems',
    date: '2025-03-15T15:00:00',
    instructor: 'Emma Davis',
    type: 'webinar'
  },
  {
    id: 2,
    title: 'Portfolio Review Session',
    date: '2025-03-18T14:30:00',
    instructor: 'Michael Wong',
    type: 'workshop'
  }
];

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        setEnrolledCourses(mockEnrolledCourses);
        setRecommendedCourses(mockRecommendedCourses);
        setUpcomingEvents(mockUpcomingEvents);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Format date for upcoming events
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-black mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl text-gray-900">Skilloo</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                  <span>{user?.name || 'Student'}</span>
                  <img 
                    src="/api/placeholder/40/40" 
                    alt={user?.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <div className="bg-white shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              My Courses
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'calendar' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </button>
            <button 
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certificates' 
                  ? 'border-black text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('certificates')}
            >
              Certificates
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
          <p className="text-gray-600">Continue learning where you left off.</p>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Courses Enrolled</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Hours Learned</p>
                <p className="text-2xl font-bold">12.5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Certificates</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enrolled courses section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Courses</h2>
            <Link to="/my-courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3">
                    <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5 md:w-2/3">
                    <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">Instructor: {course.instructor}</p>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</span>
                      <Link 
                        to={`/course/${course.id}`} 
                        className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming events section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link to="/calendar" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View calendar</Link>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {upcomingEvents.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-5 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className={`p-3 rounded-full ${
                          event.type === 'webinar' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {event.type === 'webinar' ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-gray-600 mb-2">Instructor: {event.instructor}</p>
                        <p className="text-gray-500 text-sm">{formatEventDate(event.date)}</p>
                      </div>
                      <div className="ml-4">
                        <button className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No upcoming events scheduled.
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended courses section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Browse all courses</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white shadow rounded-lg overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{course.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({course.students.toLocaleString()} students)</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">${course.price}</span>
                    <Link 
                      to={`/course/${course.id}`}
                      className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 Skilloo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;