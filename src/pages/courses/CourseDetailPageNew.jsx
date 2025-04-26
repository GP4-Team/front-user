// src/pages/courses/CourseDetailPageNew.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FileVideo, FileText, FileAudio, Image, FileCheck } from 'lucide-react';

// Components
import Navbar from "../../components/navigation/Navbar";
import SimpleFooter from "../../components/home/SimpleFooter";
import CourseHeader from "../../components/courseDetail/CourseHeader";
import CourseSectionsList from "../../components/courseDetail/CourseSectionsList";
import LessonContent from "../../components/courseDetail/LessonContent";
import CourseShare from "../../components/courseDetail/CourseShare";

/**
 * صفحة تفاصيل المادة (الكورس) المحدثة
 * @returns {JSX.Element} - صفحة تفاصيل المادة
 */
const CourseDetailPageNew = () => {
  const { courseId } = useParams();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // حالة الأقسام المفتوحة
  const [openSections, setOpenSections] = useState({
    'section-1': true,
    'section-2': false,
    'section-3': false,
  });
  // حالة الدرس النشط
  const [activeLesson, setActiveLesson] = useState(null);
  // حالة تحميل البيانات
  const [isLoading, setIsLoading] = useState(true);
  // بيانات المادة (الكورس)
  const [course, setCourse] = useState(null);
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // Color palette
  const colors = {
    primaryDark: '#1A237F',    // Primary Dark
    primaryBase: '#3949AB',    // Primary Base
    primaryLight: '#7986CB',   // Primary Light
    purple: '#6B3DD2',         // Purple (replacing blue)
    accent: '#FFC107',         // Accent/Yellow
    textDark: '#37474F',       // Text Dark
    bgLight: '#ECEFF1',        // Background Light
    white: '#FFFFFF',          // White
  };
  
  // محاكاة جلب بيانات المادة من API
  useEffect(() => {
    // في تطبيق حقيقي، هذا سيكون استدعاء API
    setTimeout(() => {
      setCourse({
        id: 'chemistry-3rd-secondary',
        title: {
          ar: 'كيمياء ثالثة ثانوي',
          en: 'Chemistry - 3rd Secondary',
        },
        description: {
          ar: 'دورة متكاملة في الكيمياء للصف الثالث الثانوي تؤهلك للتفوق في امتحان الثانوية العامة. تتضمن هذه المادة شرح تفصيلي لجميع أجزاء المنهج مع تمارين واختبارات لضمان استيعاب كامل.',
          en: 'Comprehensive chemistry course for 3rd secondary grade to help you excel in the final exams. This course includes detailed explanations of all curriculum parts with exercises and tests to ensure full understanding.',
        },
        instructor: {
          ar: 'مي هاني',
          en: 'Mai Hany',
        },
        instructorTitle: {
          ar: 'مدرس كيمياء',
          en: 'Chemistry Teacher',
        },
        level: {
          ar: 'الصف الثالث الثانوي',
          en: '3rd Grade Secondary',
        },
        image: '/api/placeholder/800/400',
        duration: {
          hours: 58,
          minutes: 17,
        },
        exercisesCount: 66,
        sections: [
          {
            id: 'section-1',
            title: {
              ar: 'قسم تجربة',
              en: 'Experimental Section',
            },
            lessonsCount: 5,
            applicationsCount: 2,
            lessons: [
              {
                id: 'lesson-1',
                type: 'video',
                title: {
                  ar: 'درس يوتيوب تجريبي',
                  en: 'Experimental YouTube Video',
                },
                duration: 45,
                status: 'completed',
                icon: <FileVideo size={20} className="text-purple-500" />
              },
              {
                id: 'lesson-2',
                type: 'pdf',
                title: {
                  ar: 'مذكرة تجريبية',
                  en: 'Experimental Notes',
                },
                status: 'completed',
                icon: <FileText size={20} className="text-red-500" />
              },
              {
                id: 'lesson-3',
                type: 'audio',
                title: {
                  ar: 'درس صوت تجربة',
                  en: 'Experimental Audio Lesson',
                },
                duration: 22,
                status: 'current',
                icon: <FileAudio size={20} className="text-green-500" />
              },
              {
                id: 'lesson-4',
                type: 'image',
                title: {
                  ar: 'صورة تجريبية',
                  en: 'Experimental Image',
                },
                status: 'current',
                icon: <Image size={20} className="text-purple-500" />
              },
              {
                id: 'lesson-5',
                type: 'exam',
                title: {
                  ar: 'امتحان تجريبي',
                  en: 'Experimental Exam',
                },
                status: 'current',
                icon: <FileCheck size={20} className="text-yellow-500" />
              }
            ]
          },
          {
            id: 'section-2',
            title: {
              ar: 'قسم تجربة 2',
              en: 'Experimental Section 2',
            },
            lessonsCount: 4,
            applicationsCount: 1,
            lessons: [
              {
                id: 'lesson-6',
                type: 'video',
                title: {
                  ar: 'مقدمة للقسم 2',
                  en: 'Introduction to Section 2',
                },
                duration: 30,
                status: 'locked',
                icon: <FileVideo size={20} className="text-purple-500" />
              }
            ]
          },
          {
            id: 'section-3',
            title: {
              ar: 'قسم جديد',
              en: 'New Section',
            },
            lessonsCount: 0,
            applicationsCount: 1,
            lessons: []
          }
        ]
      });
      setActiveLesson({
        id: 'lesson-1',
        type: 'video',
        title: {
          ar: 'درس يوتيوب تجريبي',
          en: 'Experimental YouTube Video',
        },
        duration: 45,
        status: 'completed',
        content: {
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          description: {
            ar: 'هذا درس فيديو تجريبي لشرح مفاهيم الكيمياء الأساسية. يرجى مشاهدة الفيديو بالكامل للاستفادة القصوى.',
            en: 'This is an experimental video lesson to explain basic chemistry concepts. Please watch the full video for maximum benefit.'
          }
        }
      });
      setIsLoading(false);
    }, 800);
  }, [courseId]);
  
  // فتح/إغلاق قسم
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  // اختيار درس
  const handleLessonSelect = (lesson) => {
    setActiveLesson({
      ...lesson,
      content: {
        videoUrl: lesson.type === 'video' ? 'https://www.youtube.com/embed/dQw4w9WgXcQ' : null,
        audioUrl: lesson.type === 'audio' ? '/api/placeholder/audio.mp3' : null,
        imageUrl: lesson.type === 'image' ? '/api/placeholder/600/400' : null,
        pdfUrl: lesson.type === 'pdf' ? '/api/placeholder/document.pdf' : null,
        examUrl: lesson.type === 'exam' ? '/exams/sample' : null,
        description: {
          ar: `هذا محتوى تجريبي لدرس من نوع ${lesson.type}. يرجى استخدام هذا المحتوى للتعلم.`,
          en: `This is sample content for a lesson of type ${lesson.type}. Please use this content for learning.`
        }
      }
    });
  };
  
  if (isLoading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6B3DD2]"></div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#F0F4F8] text-[#37474F]'}`}>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-16">
        {/* Course Header */}
        <CourseHeader course={course} />
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Sections and Lessons */}
            <div className="lg:w-1/3">
              <CourseSectionsList 
                sections={course.sections}
                openSections={openSections}
                toggleSection={toggleSection}
                activeLesson={activeLesson}
                onSelectLesson={handleLessonSelect}
              />
              
              {/* Share Section */}
              <CourseShare />
            </div>
            
            {/* Main Content - Lesson Display */}
            <div className="lg:w-2/3">
              <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                <LessonContent lesson={activeLesson} />
              </div>
              
              {/* Course Description */}
              <div className={`mt-6 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-lg shadow-md overflow-hidden p-4`}>
                <h2 className="text-xl font-bold mb-4">{getText('وصف المادة', 'Course Description')}</h2>
                <p className="text-sm">
                  {getText(course.description.ar, course.description.en)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <SimpleFooter />
    </div>
  );
};

export default CourseDetailPageNew;