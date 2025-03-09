import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { 
  BarChart, 
  User, 
  GraduationCap, 
  BookOpen,
  Calendar, 
  Award, 
  Clock,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit,
  Bell
} from 'lucide-react';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const student = {
    name: "Ahmed Mohamed",
    id: "S-2023-4502",
    email: "ahmed.mohamed@example.com",
    phone: "+20 123 456 7890",
    address: "15 Tahrir Street, Cairo, Egypt",
    avatar: "/api/placeholder/200/200",
    program: "Bachelor of Computer Science",
    department: "Information Systems",
    year: 3,
    gpa: 3.7,
    totalCredits: 87,
    remainingCredits: 45,
    advisorName: "Dr. Nabil Ibrahim",
    enrollmentDate: "Sep 2021"
  };

  const currentCourses = [
    { code: "CS301", name: "Database Systems", credits: 3, grade: "In Progress", instructor: "Dr. Heba Ahmed" },
    { code: "CS315", name: "Software Engineering", credits: 4, grade: "In Progress", instructor: "Dr. Mahmoud Ali" },
    { code: "CS350", name: "Computer Networks", credits: 3, grade: "In Progress", instructor: "Dr. Samia Hassan" },
    { code: "CS325", name: "Operating Systems", credits: 4, grade: "In Progress", instructor: "Dr. Khaled Omar" }
  ];

  const completedCourses = [
    { code: "CS101", name: "Introduction to Programming", credits: 3, grade: "A", semester: "Fall 2021" },
    { code: "CS201", name: "Data Structures", credits: 4, grade: "A-", semester: "Spring 2022" },
    { code: "CS210", name: "Algorithms", credits: 3, grade: "B+", semester: "Fall 2022" },
    { code: "CS220", name: "Computer Architecture", credits: 3, grade: "A", semester: "Spring 2023" },
    { code: "CS250", name: "Discrete Mathematics", credits: 3, grade: "B", semester: "Fall 2022" },
    { code: "CS260", name: "Theory of Computation", credits: 3, grade: "B+", semester: "Spring 2023" }
  ];

  const upcomingAssignments = [
    { course: "CS301", title: "ER Diagram Design", dueDate: "Oct 25, 2023", status: "Pending" },
    { course: "CS315", title: "Requirements Document", dueDate: "Oct 28, 2023", status: "Pending" },
    { course: "CS350", title: "Network Protocols Lab", dueDate: "Nov 5, 2023", status: "Pending" }
  ];

  const announcements = [
    { title: "Midterm Schedule Published", date: "Oct 10, 2023", read: false },
    { title: "New Database Lab Resources Available", date: "Oct 8, 2023", read: true },
    { title: "Academic Advising Week", date: "Oct 5, 2023", read: true }
  ];

  return (
    <div className="w-full bg-[#ECEFF1] dark:bg-[#263238] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image and Basic Info */}
            <div className="md:w-1/3 p-6 bg-[#607D8B] dark:bg-[#455A64] text-white">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-[#37474F]"
                  />
                  <button className="absolute bottom-0 right-0 bg-[#A5D6A7] p-2 rounded-full">
                    <Edit size={16} className="text-[#455A64]" />
                  </button>
                </div>
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p className="text-[#B0BEC5]">{student.id}</p>
                <p className="mt-2 text-center font-medium">{student.program}</p>
                <div className="flex items-center mt-1">
                  <GraduationCap size={16} className="mr-1" />
                  <span className="text-sm">{student.department}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="mr-3 text-[#B0BEC5]" />
                  <span className="text-sm">{student.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-3 text-[#B0BEC5]" />
                  <span className="text-sm">{student.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-3 text-[#B0BEC5]" />
                  <span className="text-sm">{student.address}</span>
                </div>
              </div>
            </div>

            {/* Academic Progress and Stats */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#455A64] dark:text-white">Academic Progress</h2>
                <div className="flex space-x-2">
                  <button className="p-2 bg-[#ECEFF1] dark:bg-[#455A64] rounded-full">
                    <Bell size={18} className="text-[#607D8B] dark:text-[#B0BEC5]" />
                  </button>
                  <button className="p-2 bg-[#ECEFF1] dark:bg-[#455A64] rounded-full">
                    <FileText size={18} className="text-[#607D8B] dark:text-[#B0BEC5]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#ECEFF1] dark:bg-[#455A64] p-4 rounded-lg">
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mb-1">Current GPA</p>
                  <p className="text-2xl font-bold text-[#455A64] dark:text-white">{student.gpa}</p>
                </div>
                <div className="bg-[#ECEFF1] dark:bg-[#455A64] p-4 rounded-lg">
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mb-1">Year</p>
                  <p className="text-2xl font-bold text-[#455A64] dark:text-white">{student.year}<span className="text-base font-normal">rd</span></p>
                </div>
                <div className="bg-[#ECEFF1] dark:bg-[#455A64] p-4 rounded-lg">
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mb-1">Completed Credits</p>
                  <p className="text-2xl font-bold text-[#455A64] dark:text-white">{student.totalCredits}</p>
                </div>
                <div className="bg-[#ECEFF1] dark:bg-[#455A64] p-4 rounded-lg">
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-[#455A64] dark:text-white">{student.remainingCredits}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5]">Academic Advisor</p>
                  <p className="font-medium text-[#455A64] dark:text-white">{student.advisorName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5]">Enrollment Date</p>
                  <p className="font-medium text-[#455A64] dark:text-white">{student.enrollmentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-[#607D8B] dark:text-[#B0BEC5]">Expected Graduation</p>
                  <p className="font-medium text-[#455A64] dark:text-white">Jun 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white dark:bg-[#37474F] p-1 rounded-lg mb-6 flex space-x-1">
            <TabsTrigger value="overview" className="flex-1 py-2 data-[state=active]:bg-[#607D8B] data-[state=active]:text-white">
              <BarChart size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex-1 py-2 data-[state=active]:bg-[#607D8B] data-[state=active]:text-white">
              <BookOpen size={16} className="mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex-1 py-2 data-[state=active]:bg-[#607D8B] data-[state=active]:text-white">
              <FileText size={16} className="mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex-1 py-2 data-[state=active]:bg-[#607D8B] data-[state=active]:text-white">
              <Bell size={16} className="mr-2" />
              Announcements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Courses Card */}
              <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden col-span-1 md:col-span-2">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#455A64] dark:text-white mb-4">Current Courses</h3>
                  <div className="space-y-4">
                    {currentCourses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between border-b border-[#ECEFF1] dark:border-[#455A64] pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium text-[#455A64] dark:text-white">{course.name}</p>
                          <div className="flex items-center">
                            <span className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mr-2">{course.code}</span>
                            <span className="text-xs bg-[#ECEFF1] dark:bg-[#455A64] text-[#607D8B] dark:text-[#B0BEC5] py-0.5 px-2 rounded-full">{course.credits} credits</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-[#607D8B] dark:text-[#B0BEC5] mr-3">{course.instructor}</span>
                          <ChevronRight size={18} className="text-[#607D8B] dark:text-[#B0BEC5]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Assignments Card */}
              <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#455A64] dark:text-white mb-4">Upcoming Assignments</h3>
                  <div className="space-y-4">
                    {upcomingAssignments.map((assignment, index) => (
                      <div key={index} className="bg-[#ECEFF1] dark:bg-[#455A64] p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-[#455A64] dark:text-white">{assignment.title}</p>
                          <span className="text-xs bg-[#A5D6A7] text-[#455A64] py-0.5 px-2 rounded-full">{assignment.course}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock size={14} className="text-[#607D8B] dark:text-[#B0BEC5] mr-1" />
                            <span className="text-xs text-[#607D8B] dark:text-[#B0BEC5]">Due: {assignment.dueDate}</span>
                          </div>
                          <span className="text-xs text-[#607D8B] dark:text-[#B0BEC5]">{assignment.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#455A64] dark:text-white">Course History</h3>
                  <div className="flex items-center space-x-2">
                    <select className="bg-[#ECEFF1] dark:bg-[#455A64] text-[#455A64] dark:text-white text-sm rounded-md px-3 py-1.5 border-0">
                      <option>All Terms</option>
                      <option>Fall 2023</option>
                      <option>Spring 2023</option>
                      <option>Fall 2022</option>
                      <option>Spring 2022</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-[#ECEFF1] dark:bg-[#455A64] text-left">
                        <th className="px-4 py-3 text-sm font-medium text-[#607D8B] dark:text-[#B0BEC5] rounded-l-lg">Course Code</th>
                        <th className="px-4 py-3 text-sm font-medium text-[#607D8B] dark:text-[#B0BEC5]">Course Name</th>
                        <th className="px-4 py-3 text-sm font-medium text-[#607D8B] dark:text-[#B0BEC5]">Credits</th>
                        <th className="px-4 py-3 text-sm font-medium text-[#607D8B] dark:text-[#B0BEC5]">Grade</th>
                        <th className="px-4 py-3 text-sm font-medium text-[#607D8B] dark:text-[#B0BEC5] rounded-r-lg">Semester</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ECEFF1] dark:divide-[#455A64]">
                      {completedCourses.map((course, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm font-medium text-[#455A64] dark:text-white">{course.code}</td>
                          <td className="px-4 py-4 text-sm text-[#455A64] dark:text-white">{course.name}</td>
                          <td className="px-4 py-4 text-sm text-[#607D8B] dark:text-[#B0BEC5]">{course.credits}</td>
                          <td className="px-4 py-4">
                            <span className={`text-sm py-1 px-2 rounded-full ${
                              course.grade === 'A' || course.grade === 'A-' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : course.grade.startsWith('B') 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-[#607D8B] dark:text-[#B0BEC5]">{course.semester}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-0">
            <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#455A64] dark:text-white mb-6">All Assignments</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <button className="bg-[#607D8B] text-white px-3 py-1 rounded-md text-sm">All</button>
                    <button className="bg-[#ECEFF1] dark:bg-[#455A64] text-[#607D8B] dark:text-[#B0BEC5] px-3 py-1 rounded-md text-sm">Pending</button>
                    <button className="bg-[#ECEFF1] dark:bg-[#455A64] text-[#607D8B] dark:text-[#B0BEC5] px-3 py-1 rounded-md text-sm">Completed</button>
                  </div>
                  
                  <div className="flex items-center">
                    <select className="bg-[#ECEFF1] dark:bg-[#455A64] text-[#455A64] dark:text-white text-sm rounded-md px-3 py-1.5 border-0">
                      <option>All Courses</option>
                      {currentCourses.map((course, idx) => (
                        <option key={idx}>{course.code}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  {[...upcomingAssignments, 
                    { course: "CS220", title: "Processor Design Project", dueDate: "Sep 25, 2023", status: "Completed" },
                    { course: "CS201", title: "Binary Tree Implementation", dueDate: "May 15, 2023", status: "Completed" },
                    { course: "CS250", title: "Logic Proof Assignment", dueDate: "Apr 12, 2023", status: "Completed" }
                  ].map((assignment, index) => (
                    <div key={index} className={`bg-[#ECEFF1] dark:bg-[#455A64] p-4 rounded-lg flex justify-between items-center ${
                      assignment.status === 'Completed' ? 'border-l-4 border-[#A5D6A7]' : 'border-l-4 border-[#FFA726]'
                    }`}>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs bg-[#607D8B] text-white py-0.5 px-2 rounded-full mr-2">{assignment.course}</span>
                          <p className="font-medium text-[#455A64] dark:text-white">{assignment.title}</p>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="text-[#607D8B] dark:text-[#B0BEC5] mr-1" />
                          <span className="text-xs text-[#607D8B] dark:text-[#B0BEC5]">{assignment.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`text-xs py-1 px-3 rounded-full ${
                          assignment.status === 'Completed' 
                            ? 'bg-[#A5D6A7]/20 text-[#A5D6A7]' 
                            : 'bg-[#FFA726]/20 text-[#FFA726]'
                        }`}>
                          {assignment.status}
                        </span>
                        <button className="ml-4 text-[#607D8B] dark:text-[#B0BEC5]">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <div className="bg-white dark:bg-[#37474F] rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#455A64] dark:text-white mb-6">Announcements & Notifications</h3>
                
                <div className="space-y-4">
                  {[...announcements, 
                    { title: "Winter Break Schedule", date: "Sep 30, 2023", read: true },
                    { title: "Library Hours Update", date: "Sep 25, 2023", read: true }
                  ].map((announcement, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded-r-lg ${
                      announcement.read 
                        ? 'border-[#B0BEC5] bg-[#ECEFF1]/50 dark:bg-[#455A64]/50' 
                        : 'border-[#A5D6A7] bg-[#ECEFF1] dark:bg-[#455A64]'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium ${
                            announcement.read 
                              ? 'text-[#607D8B] dark:text-[#B0BEC5]' 
                              : 'text-[#455A64] dark:text-white'
                          }`}>
                            {announcement.title}
                            {!announcement.read && (
                              <span className="ml-2 bg-[#A5D6A7] text-[#455A64] text-xs px-2 py-0.5 rounded-full">New</span>
                            )}
                          </h4>
                          <p className="text-xs text-[#607D8B] dark:text-[#B0BEC5] mt-1">{announcement.date}</p>
                        </div>
                        <button className="text-[#607D8B] dark:text-[#B0BEC5]">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;