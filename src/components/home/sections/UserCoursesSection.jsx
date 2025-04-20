import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserCoursesSection = ({ UI, getText, userCourses, getSubjectIcon }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  if (!userCourses || userCourses.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className={`text-sm rounded-md px-3 py-1 font-semibold inline-block mb-2 w-fit ${isDarkMode ? 'bg-accent/20 text-accent' : 'bg-accent/20 text-accent/80'}`}>
              {isArabic ? "التقدم" : "Progress"}
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
              {getText(UI.myCourses)}
            </h2>
          </div>
          
          <Link to="/my-courses" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} flex items-center hover:underline`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userCourses.map((course, idx) => (
            <Link 
              key={idx} 
              to={`/courses/${course.id}`} 
              className={`block rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white border border-gray-100'}`}
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={getText(course.title)} 
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
                    {course.progress}% {isArabic ? 'مكتمل' : 'Complete'}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                    {getSubjectIcon(getText(course.category), 16)}
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} ml-2 font-medium`}>
                    {getText(course.category)}
                  </span>
                </div>
                <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                  {getText(course.title)}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getText(course.level)}
                </p>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-accent h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {isArabic ? 'الدرس ' : 'Lesson '} 5/12
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2.5 bg-primary-base text-white rounded-lg font-medium text-sm transition-all hover:-translate-y-0.5 hover:bg-primary-dark shadow-sm hover:shadow-md">
                  {getText(UI.continueLearning)}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCoursesSection;
