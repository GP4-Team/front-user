import React from "react";
import { Link } from "react-router-dom";
import { Star, Users, Clock } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedCoursesSection = ({ UI, getText, FEATURED_COURSES, getSubjectIcon }) => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  return (
    <section className={`py-12 px-4 ${isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className={`text-sm rounded-md px-3 py-1 font-semibold inline-block mb-2 w-fit ${isDarkMode ? 'bg-primary-dark/50 text-primary-light' : 'bg-primary-light/30 text-primary-dark'}`}>
              {isArabic ? "كورسات مميزة" : "Featured"}
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
              {getText(UI.featuredCourses)}
            </h2>
          </div>
          <Link to="/courses" className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} flex items-center hover:underline`}>
            {isArabic ? 'عرض الكل' : 'View All'}
            {isRTL ? (
              <ChevronLeft size={16} className="mr-1" />
            ) : (
              <ChevronRight size={16} className="ml-1" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURED_COURSES.map((course, idx) => (
            <Link 
              key={idx} 
              to={`/courses/${course.id}`} 
              className={`group block rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2 hover:shadow-xl ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-white border border-gray-100'}`}
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={getText(course.title)} 
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {course.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium shadow-sm" style={{ 
                    backgroundColor: course.badgeColor || '#3949AB',
                    color: 'white' 
                  }}>
                    {getText(course.badge)}
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={`${i < Math.floor(course.rating) ? 'text-accent' : 'text-gray-300'} ${i === Math.floor(course.rating) ? 'group-hover:animate-pulse' : ''}`} 
                          fill={i < Math.floor(course.rating) ? (isDarkMode ? '#FFC107' : '#FFC107') : 'none'} 
                        />
                      ))}
                    </div>
                    <span className="text-white text-xs ml-1 font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
                    {getSubjectIcon(getText(course.category), 16)}
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-primary-base'} ml-2 font-medium`}>
                    {getText(course.category)}
                  </span>
                </div>
                <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-text-dark'} group-hover:text-primary-base transition-colors`}>
                  {getText(course.title)}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {getText(course.level)}
                </p>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                        {course.students}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                        {isArabic ? '12 ساعة' : '12 hours'}
                      </span>
                    </div>
                    <div>
                      {course.price.amount > 0 ? (
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-text-dark'}`}>
                          {course.price.amount} {course.price.currency}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          {getText(UI.free)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
