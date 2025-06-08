import React, { useState } from 'react';
import { 
  BarChart, 
  Calendar,
  GraduationCap,
  BookOpen,
  Bell,
  Clock,
  CheckCircle,
  FileText,
  TrendingUp,
  Menu,
  ChevronRight,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Mock data
  const studentData = {
    name: "Ahmed Mohamed",
    department: "Information Systems",
    semester: "Fall 2023",
    overallGPA: 3.7,
    completedCredits: 87,
    remainingCredits: 45
  };
  
  const courseData = [
    { id: 1, code: "CS301", name: "Database Systems", progress: 68, instructor: "Dr. Heba Ahmed", nextClass: "Mon, 10:00 AM", location: "Hall B" },
    { id: 2, code: "CS315", name: "Software Engineering", progress: 75, instructor: "Dr. Mahmoud Ali", nextClass: "Tue, 1:00 PM", location: "Lab 3" },
    { id: 3, code: "CS350", name: "Computer Networks", progress: 42, instructor: "Dr. Samia Hassan", nextClass: "Wed, 11:30 AM", location: "Hall A" },
    { id: 4, code: "CS325", name: "Operating Systems", progress: 56, instructor: "Dr. Khaled Omar", nextClass: "Thu, 9:00 AM", location: "Lab 1" }
  ];
  
  const upcomingAssignments = [
    { course: "CS301", title: "ER Diagram Design", dueDate: "Oct 25, 2023", daysLeft: 3 },
    { course: "CS315", title: "Requirements Document", dueDate: "Oct 28, 2023", daysLeft: 6 },
    { course: "CS350", title: "Network Protocols Lab", dueDate: "Nov 5, 2023", daysLeft: 14 }
  ];
  
  const announcements = [
    { title: "Midterm Schedule Published", date: "Oct 10, 2023", isNew: true },
    { title: "New Database Lab Resources Available", date: "Oct 8, 2023", isNew: false },
    { title: "Academic Advising Week", date: "Oct 5, 2023", isNew: false }
  ];
  
  const upcomingExams = [
    { course: "CS301", title: "Midterm Exam", date: "Nov 10, 2023", time: "10:00 AM" },
    { course: "CS315", title: "Midterm Exam", date: "Nov 12, 2023", time: "1:00 PM" },
    { course: "CS350", title: "Quiz 3", date: "Oct 30, 2023", time: "11:30 AM" }
  ];
  
  const recentGrades = [
    { course: "CS301", assignment: "Quiz 1", grade: "18/20", date: "Oct 5, 2023" },
    { course: "CS315", assignment: "Project Proposal", grade: "27/30", date: "Oct 7, 2023" },
    { course: "CS350", assignment: "Lab Report 1", grade: "24/25", date: "Oct 12, 2023" }
  ];
  
  const attendanceData = [
    { day: "Mon", percentage: 100 },
    { day: "Tue", percentage: 100 },
    { day: "Wed", percentage: 75 },
    { day: "Thu", percentage: 100 },
    { day: "Fri", percentage: 100 }
  ];
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate overall attendance
  const overallAttendance = attendanceData.reduce((sum, day) => sum + day.percentage, 0) / attendanceData.length;
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#263238] text-[#ECEFF1]' : 'bg-[#ECEFF1] text-[#455A64]'}`}>
      {/* Top Navigation Bar */}
      <header className={`py-3 px-6 ${isDarkMode ? 'bg-[#37474F] text-white' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6" />
            <h1 className="text-xl font-bold">Eduara</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-opacity-10 hover:bg-black">
              <Bell className="h-5 w-5" />
              <span className={`absolute top-1 right-1 h-2 w-2 rounded-full ${isDarkMode ? 'bg-[#A5D6A7]' : 'bg-[#81C784]'}`}></span>
            </button>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#607D8B] rounded-full flex items-center justify-center text-white">
                {studentData.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className={`${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>{currentDate}</p>
          </div>
          
          <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-white'}`}>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Semester: <strong>{studentData.semester}</strong></span>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>Overall GPA</p>
                <p className="text-2xl font-bold mt-1">{studentData.overallGPA}</p>
              </div>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}>
                <TrendingUp className={isDarkMode ? 'text-[#A5D6A7]' : 'text-[#81C784]'} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isDarkMode ? 'bg-[#A5D6A7]' : 'bg-[#81C784]'}`} 
                  style={{ width: `${(studentData.overallGPA / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>Credit Hours</p>
                <p className="text-2xl font-bold mt-1">{studentData.completedCredits}/{studentData.completedCredits + studentData.remainingCredits}</p>
              </div>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}>
                <GraduationCap className={isDarkMode ? 'text-[#A5D6A7]' : 'text-[#81C784]'} />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isDarkMode ? 'bg-[#A5D6A7]' : 'bg-[#81C784]'}`} 
                  style={{ width: `${(studentData.completedCredits / (studentData.completedCredits + studentData.remainingCredits)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>Current Courses</p>
                <p className="text-2xl font-bold mt-1">{courseData.length}</p>
              </div>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}>
                <BookOpen className={isDarkMode ? 'text-[#A5D6A7]' : 'text-[#81C784]'} />
              </div>
            </div>
            <p className={`mt-4 text-sm ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
              {courseData.length} active courses this semester
            </p>
          </div>
          
          <div className={`p-6 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>Attendance</p>
                <p className="text-2xl font-bold mt-1">{overallAttendance.toFixed(0)}%</p>
              </div>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}>
                <CheckCircle className={isDarkMode ? 'text-[#A5D6A7]' : 'text-[#81C784]'} />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              {attendanceData.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="h-16 w-3 bg-gray-200 rounded-full overflow-hidden relative">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 ${day.percentage === 100 ? (isDarkMode ? 'bg-[#A5D6A7]' : 'bg-[#81C784]') : 'bg-yellow-400'}`} 
                      style={{ height: `${day.percentage}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs mt-1 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Courses */}
            <div className={`rounded-xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Current Courses</h3>
                
                <div className="space-y-4">
                  {courseData.map((course) => (
                    <div 
                      key={course.id} 
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-[#607D8B] text-white' : 'bg-[#B0BEC5] text-[#455A64]'} mr-2`}>
                              {course.code}
                            </span>
                            <h4 className="font-medium">{course.name}</h4>
                          </div>
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                            {course.instructor}
                          </p>
                        </div>
                        <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`} />
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}>Course Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={isDarkMode ? 'bg-[#A5D6A7]' : 'bg-[#81C784]'} 
                            style={{ width: `${course.progress}%`, height: '100%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-xs">
                        <div className={`flex items-center ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Next: {course.nextClass}</span>
                        </div>
                        <div className={`flex items-center ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{course.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recent Grades */}
            <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Recent Grades</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                        <th className="pb-3 text-sm font-medium">Course</th>
                        <th className="pb-3 text-sm font-medium">Assignment</th>
                        <th className="pb-3 text-sm font-medium">Grade</th>
                        <th className="pb-3 text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-[#455A64]' : 'divide-gray-200'}`}>
                      {recentGrades.map((grade, index) => (
                        <tr key={index}>
                          <td className="py-3 text-sm">
                            <span className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-[#607D8B] text-white' : 'bg-[#B0BEC5] text-[#455A64]'}`}>
                              {grade.course}
                            </span>
                          </td>
                          <td className="py-3 text-sm">{grade.assignment}</td>
                          <td className="py-3 text-sm font-medium">{grade.grade}</td>
                          <td className="py-3 text-sm text-gray-500">{grade.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-center">
                  <button className={`text-sm ${isDarkMode ? 'text-[#A5D6A7]' : 'text-[#607D8B]'} hover:underline`}>
                    View All Grades
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Upcoming Assignments</h3>
                  <span className={`text-xs ${isDarkMode ? 'bg-[#455A64] text-[#B0BEC5]' : 'bg-[#ECEFF1] text-[#607D8B]'} px-2 py-1 rounded-full`}>
                    {upcomingAssignments.length} Due
                  </span>
                </div>
                
                <div className="space-y-3">
                  {upcomingAssignments.map((assignment, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'} ${
                        assignment.daysLeft <= 3 ? 'border-l-4 border-red-500' : 'border-l-4 border-yellow-500'
                      }`}
                    >
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${isDarkMode ? 'bg-[#607D8B] text-white' : 'bg-[#B0BEC5] text-[#455A64]'} px-2 py-0.5 rounded`}>
                          {assignment.course}
                        </span>
                        <span className={`text-xs ${
                          assignment.daysLeft <= 3 
                            ? 'text-red-500' 
                            : (isDarkMode ? 'text-yellow-400' : 'text-yellow-600')
                        }`}>
                          {assignment.daysLeft} days left
                        </span>
                      </div>
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                        Due: {assignment.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className={`text-sm ${isDarkMode ? 'text-[#A5D6A7]' : 'text-[#607D8B]'} hover:underline`}>
                    View All Assignments
                  </button>
                </div>
              </div>
            </div>
            
            {/* Upcoming Exams */}
            <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Exams</h3>
                
                <div className="space-y-3">
                  {upcomingExams.map((exam, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#455A64]' : 'bg-[#ECEFF1]'}`}
                    >
                      <div className="flex justify-between mb-1">
                        <span className={`text-xs ${isDarkMode ? 'bg-[#607D8B] text-white' : 'bg-[#B0BEC5] text-[#455A64]'} px-2 py-0.5 rounded`}>
                          {exam.course}
                        </span>
                      </div>
                      <p className="font-medium text-sm">{exam.title}</p>
                      <div className="flex justify-between mt-2 text-xs">
                        <div className={`flex items-center ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{exam.date}</span>
                        </div>
                        <div className={`flex items-center ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{exam.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Announcements */}
            <div className={`rounded-xl shadow-sm ${isDarkMode ? 'bg-[#37474F]' : 'bg-white'}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Announcements</h3>
                
                <div className="space-y-3">
                  {announcements.map((announcement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 ${announcement.isNew ? 
                        (isDarkMode ? 'bg-[#455A64] border-l-4 border-[#A5D6A7]' : 'bg-[#ECEFF1] border-l-4 border-[#81C784]') : 
                        (isDarkMode ? 'bg-[#455A64]/50' : 'bg-[#ECEFF1]/50')
                      } rounded-lg`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">
                            {announcement.title}
                            {announcement.isNew && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-[#A5D6A7] text-[#455A64]">New</span>
                            )}
                          </p>
                          <p className={`text-xs mt-1 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`}>
                            {announcement.date}
                          </p>
                        </div>
                        <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-[#B0BEC5]' : 'text-[#78909C]'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;