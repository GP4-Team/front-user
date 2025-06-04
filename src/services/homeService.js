// src/services/homeService.js
import api from './api';
import { FEATURED_COURSES, TOP_EXAMS } from '../data/mockData';

// وضع التطوير - تعيين إلى true لاستخدام البيانات الوهمية
// سيتم تغييره إلى false عندما يتم إصلاح الباك إند
const DEVELOPMENT_MODE = true;

/**
 * خدمة صفحة الهوم
 * تستخدم لربط واجهة المستخدم بالخادم
 */
const HomeService = {
  /**
   * الحصول على الدورات المميزة
   * @returns {Promise} - Promise مع قائمة الدورات المميزة
   */
  getFeaturedCourses: async () => {
    if (DEVELOPMENT_MODE) {
      // استخدام البيانات الوهمية في وضع التطوير
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        message: "تم جلب الدورات المميزة بنجاح",
        data: FEATURED_COURSES
      };
    }
    
    try {
      const response = await api.get('/courses/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      
      // في حالة خطأ "QueryBuilder not found" تحديداً، استخدام البيانات الوهمية
      if (error.response?.data?.message?.includes('QueryBuilder') || 
          error.response?.status === 500) {
        console.log('Using fallback data due to backend issue');
        
        return {
          success: true,
          message: "تم جلب الدورات المميزة بنجاح (من البيانات الوهمية)",
          data: FEATURED_COURSES
        };
      }
      
      throw error;
    }
  },

  /**
   * الحصول على فئات الدورات
   * @returns {Promise} - Promise مع قائمة الفئات
   */
  getCategories: async () => {
    if (DEVELOPMENT_MODE) {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // استخدام البيانات الوهمية
      return {
        success: true,
        message: "تم جلب الفئات بنجاح",
        data: [
          {
            id: 1,
            name: "تطوير البرمجيات",
            icon: "code",
            courses_count: 45
          },
          {
            id: 2,
            name: "تطوير الويب",
            icon: "web",
            courses_count: 32
          },
          {
            id: 3,
            name: "تطوير تطبيقات الجوال",
            icon: "smartphone",
            courses_count: 18
          },
          {
            id: 4,
            name: "التصميم",
            icon: "palette",
            courses_count: 27
          },
          {
            id: 5,
            name: "التسويق",
            icon: "campaign",
            courses_count: 15
          },
          {
            id: 6,
            name: "الأعمال",
            icon: "business",
            courses_count: 22
          }
        ]
      };
    }
    
    try {
      const response = await api.get('/courses/education-categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // في حالة فشل الخادم، استخدام البيانات الوهمية
      if (error.response?.status === 500) {
        return {
          success: true,
          message: "تم جلب الفئات بنجاح (من البيانات الوهمية)",
          data: [
            {
              id: 1,
              name: "تطوير البرمجيات",
              icon: "code",
              courses_count: 45
            },
            {
              id: 2,
              name: "تطوير الويب",
              icon: "web",
              courses_count: 32
            },
            {
              id: 3,
              name: "تطوير تطبيقات الجوال",
              icon: "smartphone",
              courses_count: 18
            },
            {
              id: 4,
              name: "التصميم",
              icon: "palette",
              courses_count: 27
            },
            {
              id: 5,
              name: "التسويق",
              icon: "campaign",
              courses_count: 15
            },
            {
              id: 6,
              name: "الأعمال",
              icon: "business",
              courses_count: 22
            }
          ]
        };
      }
      
      throw error;
    }
  },

  /**
   * الحصول على الاختبارات المميزة
   * @returns {Promise} - Promise مع قائمة الاختبارات
   */
  getTopExams: async () => {
    if (DEVELOPMENT_MODE) {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        success: true,
        message: "تم جلب الاختبارات بنجاح",
        data: TOP_EXAMS
      };
    }
    
    try {
      const response = await api.get('/exams/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching top exams:', error);
      
      // في حالة فشل الخادم، استخدام البيانات الوهمية
      if (error.response?.status === 500) {
        return {
          success: true,
          message: "تم جلب الاختبارات بنجاح (من البيانات الوهمية)",
          data: TOP_EXAMS
        };
      }
      
      throw error;
    }
  },

  /**
   * الحصول على دورات المستخدم
   * @returns {Promise} - Promise مع قائمة دورات المستخدم
   */
  getUserCourses: async () => {
    if (DEVELOPMENT_MODE) {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // استخدام دورات وهمية للمستخدم
      return {
        success: true,
        message: "تم جلب دورات المستخدم بنجاح",
        data: [
          {
            id: 1,
            title: "أساسيات البرمجة للمبتدئين",
            description: "تعلم أساسيات البرمجة وتطوير المنطق البرمجي من الصفر",
            thumbnail: "/images/courses/programming-basics.jpg",
            instructor: "أحمد محمد",
            progress: 65,
            last_accessed: "2023-12-15"
          },
          {
            id: 3,
            title: "التصميم الجرافيكي للمبتدئين",
            description: "تعلم أساسيات التصميم الجرافيكي وبرامج Adobe الأساسية",
            thumbnail: "/images/courses/graphic-design.jpg",
            instructor: "محمد أحمد",
            progress: 32,
            last_accessed: "2023-12-18"
          }
        ]
      };
    }
    
    try {
      const response = await api.get('/courses/enrolled');
      return response.data;
    } catch (error) {
      console.error('Error fetching user courses:', error);
      
      // في حالة فشل الخادم، استخدام البيانات الوهمية
      if (error.response?.status === 500) {
        return {
          success: true,
          message: "تم جلب دورات المستخدم بنجاح (من البيانات الوهمية)",
          data: [
            {
              id: 1,
              title: "أساسيات البرمجة للمبتدئين",
              description: "تعلم أساسيات البرمجة وتطوير المنطق البرمجي من الصفر",
              thumbnail: "/images/courses/programming-basics.jpg",
              instructor: "أحمد محمد",
              progress: 65,
              last_accessed: "2023-12-15"
            },
            {
              id: 3,
              title: "التصميم الجرافيكي للمبتدئين",
              description: "تعلم أساسيات التصميم الجرافيكي وبرامج Adobe الأساسية",
              thumbnail: "/images/courses/graphic-design.jpg",
              instructor: "محمد أحمد",
              progress: 32,
              last_accessed: "2023-12-18"
            }
          ]
        };
      }
      
      throw error;
    }
  }
};

export default HomeService;