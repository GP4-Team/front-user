// src/services/api/courses.service.js
import api from '../api';
import { handleApiError } from '../utils/errorHandler';

/**
 * Courses Service - Handle all course operations
 */
class CoursesService {
  /**
   * Get all courses with pagination (new endpoint)
   * @param {Object} params - Filter parameters (page, per_page, etc.)
   * @returns {Promise<Array>} Paginated courses
   */
  async getAllCoursesPaginated(params = {}) {
    try {
      console.log('📋 Calling getAllCoursesPaginated with params:', params);
      
      // استدعاء الـ API الجديد لجميع الكورسات مع pagination
      const response = await api.get('/courses', { params });
      
      console.log('✅ getAllCoursesPaginated API response:', response.data);
      
      // تحديد هيكل البيانات الصحيح
      let coursesData = [];
      let paginationData = {};
      
      if (response.data.success) {
        // محاولة العثور على البيانات بطرق مختلفة
        if (response.data.data && Array.isArray(response.data.data.data)) {
          // Structure: response.data.data.data (Laravel pagination)
          coursesData = response.data.data.data;
          paginationData = {
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            per_page: response.data.data.per_page,
            total: response.data.data.total,
            from: response.data.data.from,
            to: response.data.data.to,
            next_page_url: response.data.data.next_page_url,
            prev_page_url: response.data.data.prev_page_url
          };
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Structure: response.data.data (direct array)
          coursesData = response.data.data;
          paginationData = {
            current_page: response.data.current_page || 1,
            last_page: response.data.last_page || 1,
            per_page: response.data.per_page || 15,
            total: response.data.total || coursesData.length,
            from: response.data.from || 1,
            to: response.data.to || coursesData.length,
            next_page_url: response.data.next_page_url || null,
            prev_page_url: response.data.prev_page_url || null
          };
        } else {
          console.error('❌ Unexpected API response structure:', response.data);
          throw new Error('Unexpected API response structure');
        }
      } else {
        throw new Error(response.data.message || 'API request failed');
      }
      
      console.log('🚀 Courses found:', coursesData.length);
      console.log('📄 Pagination info:', paginationData);
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: true,
        data: coursesData.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: paginationData
      };
      
      console.log('✨ Transformed data ready:', {
        coursesCount: transformedData.data.length,
        currentPage: transformedData.pagination.current_page,
        totalPages: transformedData.pagination.last_page,
        total: transformedData.pagination.total
      });
      
      return transformedData;
    } catch (error) {
      console.error('❌ getAllCoursesPaginated error:', error);
      throw handleApiError(error, 'Failed to fetch courses with pagination');
    }
  }

  /**
   * Get featured courses
   * @param {number} limit - Number of courses requested
   * @returns {Promise<Array>} List of featured courses
   */
  async getFeaturedCourses(limit = 8) {
    try {
      // استدعاء الـ API الجديد للكورسات المميزة
      const response = await api.get('/courses/featured', { 
        params: { 
          page: 1,
          per_page: limit 
        } 
      });
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url
        }
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch featured courses');
    }
  }
  
  /**
   * Helper method to get category name in Arabic
   */
  getCategoryNameAr(departmentId) {
    const categories = {
      1: 'الرياضيات',
      2: 'العلوم',
      3: 'اللغة العربية',
      4: 'اللغة الإنجليزية',
      5: 'التاريخ',
      6: 'الجغرافيا'
    };
    return categories[departmentId] || 'مادة عامة';
  }
  
  /**
   * Helper method to get category name in English
   */
  getCategoryNameEn(departmentId) {
    const categories = {
      1: 'Mathematics',
      2: 'Science',
      3: 'Arabic Language',
      4: 'English Language',
      5: 'History',
      6: 'Geography'
    };
    return categories[departmentId] || 'General Subject';
  }
  
  /**
   * Helper method to get level name in Arabic
   */
  getLevelNameAr(levelId) {
    const levels = {
      1: 'الصف الأول الابتدائي',
      2: 'الصف الثاني الابتدائي',
      3: 'الصف الثالث الابتدائي',
      4: 'الصف الرابع الابتدائي',
      5: 'الصف الخامس الابتدائي',
      6: 'الصف السادس الابتدائي',
      7: 'الصف الأول المتوسط',
      8: 'الصف الثاني المتوسط',
      9: 'الصف الثالث المتوسط',
      10: 'الصف الأول الثانوي',
      11: 'الصف الثاني الثانوي',
      12: 'الصف الثالث الثانوي'
    };
    return levels[levelId] || 'مستوى عام';
  }
  
  /**
   * Helper method to get level name in English
   */
  getLevelNameEn(levelId) {
    const levels = {
      1: 'Grade 1',
      2: 'Grade 2', 
      3: 'Grade 3',
      4: 'Grade 4',
      5: 'Grade 5',
      6: 'Grade 6',
      7: 'Grade 7',
      8: 'Grade 8',
      9: 'Grade 9',
      10: 'Grade 10',
      11: 'Grade 11',
      12: 'Grade 12'
    };
    return levels[levelId] || 'General Level';
  }

  /**
   * Get all courses (alternative endpoint)
   * @param {Object} params - Filter parameters (page, per_page, etc.)
   * @returns {Promise<Array>} All available courses
   */
  async getAllCoursesComplete(params = {}) {
    try {
      // استدعاء الـ API الحقيقي لجميع الكورسات
      const response = await api.get('/courses/all', { params });
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url
        }
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch all courses');
    }
  }
  
  /**
   * Helper method to map API level IDs to filter level IDs
   */
  mapLevelIdForFilter(levelId) {
    // Map educational levels to filter categories
    if (levelId >= 10 && levelId <= 12) {
      const gradeMap = { 10: 'grade10', 11: 'grade11', 12: 'grade12' };
      return gradeMap[levelId] || 'other';
    }
    return 'other';
  }

  /**
   * Get specific course details by ID using the real API endpoint api/courses/{id}
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Complete course details
   */
  async getCourseDetails(courseId) {
    try {
      console.log('🔍 Fetching course details for ID:', courseId);
      
      const response = await api.get(`/courses/${courseId}`);
      
      console.log('✅ Course details API response:', response.data);
      
      // تحويل البيانات من API format إلى UI format
      if (response.data.success && response.data.data) {
        const course = response.data.data;
        
        const transformedData = {
          success: true,
          data: {
            id: course.id,
            name: course.name,
            code: course.code,
            color: course.color || '#4285F4',
            image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
            educational_level_id: course.educational_level_id,
            educational_department_id: course.educational_department_id,
            description: course.description,
            instructor_name: course.instructor_name,
            instructor_avatar: course.instructor_avatar,
            price: course.price,
            discounted_price: course.discounted_price,
            discount_percentage: course.discount_percentage,
            currency: course.currency,
            rating: course.rating,
            reviews_count: course.reviews_count,
            students_count: course.students_count,
            duration_hours: course.duration_hours,
            materials_count: course.materials_count,
            
            // إضافة البيانات المحولة للواجهة
            title: {
              ar: course.name,
              en: course.name
            },
            category: {
              ar: this.getCategoryNameAr(course.educational_department_id),
              en: this.getCategoryNameEn(course.educational_department_id)
            },
            level: {
              ar: this.getLevelNameAr(course.educational_level_id),
              en: this.getLevelNameEn(course.educational_level_id)
            },
            instructor: {
              ar: course.instructor_name || 'أستاذ متخصص',
              en: course.instructor_name || 'Specialized Instructor'
            },
            stats: {
              totalLessons: course.lessons_count || 24,
              totalQuizzes: course.quizzes_count || 8,
              totalProjects: course.projects_count || 3,
              estimatedHours: course.duration_hours || 40
            }
          }
        };
        
        return transformedData;
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching course details:', error);
      throw handleApiError(error, 'Failed to fetch course details');
    }
  }

  /**
   * Get course by ID (alternative method name for clarity)
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Course details
   */
  async getCourseById(courseId) {
    return this.getCourseDetails(courseId);
  }

  /**
   * Get course content (materials/lessons) by course ID
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Course content with lessons
   */
  async getCourseContent(courseId) {
    try {
      console.log('📋 Fetching course content for ID:', courseId);
      
      const response = await api.get(`/materials/course/${courseId}`);
      
      console.log('✅ Course content API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching course content:', error);
      throw handleApiError(error, 'Failed to fetch course content');
    }
  }

  /**
   * Get specific material details
   * @param {number|string} materialId - Material ID
   * @returns {Promise<Object>} Material details
   */
  async getMaterialById(materialId) {
    try {
      const response = await api.get(`/materials/${materialId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch material details');
    }
  }

  /**
   * Search courses using the new API endpoint
   * @param {string} query - Search query
   * @param {Object} params - Additional parameters (page, per_page, etc.)
   * @returns {Promise<Object>} Search results with pagination
   */
  async searchCourses(query = '', params = {}) {
    try {
      let endpoint;
      
      if (query.trim()) {
        // إذا كان هناك نص بحث، استخدم الـ endpoint مع القيمة
        endpoint = `/courses/search/${encodeURIComponent(query.trim())}`;
      } else {
        // إذا لم يكن هناك نص بحث، استخدم الـ endpoint العادي
        endpoint = '/courses/search';
      }
      
      console.log('🔍 Searching courses with endpoint:', endpoint, 'params:', params);
      
      const response = await api.get(endpoint, { params });
      
      console.log('✅ Search API response:', response.data);
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5,
          students: '120+',
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url
        }
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to search courses');
    }
  }

  /**
   * Filter courses by education levels (NEW)
   * @param {Object} params - Filter parameters including education_level_ids
   * @returns {Promise<Object>} Filtered courses with pagination
   */
  async getFilteredCourses(params = {}) {
    try {
      console.log('🔍 Calling courses filter API with params:', params);
      
      const response = await api.get('/courses/filter', { params });
      
      console.log('✅ Filter API response:', response.data);
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url
        }
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to filter courses');
    }
  }

  /**
   * Get courses by education level
   * @param {number|string} levelId - Education level ID
   * @param {Object} params - Additional parameters
   * @returns {Promise<Array>} List of courses
   */
  async getCoursesByLevel(levelId, params = {}) {
    try {
      const response = await api.get(`/courses/by-level/${levelId}`, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch courses by level');
    }
  }

  /**
   * Get course categories
   * @returns {Promise<Array>} List of categories
   */
  async getCategories() {
    try {
      const response = await api.get('/courses/education-categories');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course categories');
    }
  }

  /**
   * Get education levels
   * @param {Object} params - Optional parameters
   * @returns {Promise<Array>} List of education levels
   */
  async getEducationLevels(params = {}) {
    try {
      // استدعاء الـ API الحقيقي للمستويات التعليمية
      const response = await api.get('/courses/education-levels', { params });
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(level => ({
          id: level.id,
          name: level.name,
          code: level.code,
          color: level.color,
          educational_category_id: level.educational_category_id,
          category: level.category,
          // إضافة levelId للفلترة
          levelId: this.mapEducationLevelToFilterId(level.id, level.name)
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total
        }
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch education levels');
    }
  }

  /**
   * Filter courses by educational level ID using the new API format
   * @param {number} educationalLevelId - Educational level ID
   * @param {Object} params - Additional parameters (page, per_page, etc.)
   * @returns {Promise<Object>} Filtered courses with pagination
   */
  async getCoursesByEducationalLevel(educationalLevelId, params = {}) {
    try {
      console.log('🎯 Filtering courses by educational level ID:', educationalLevelId);
      
      // إعداد معاملات الـ API حسب الصيغة المطلوبة
      const filterParams = {
        'filter[educational_level_id]': educationalLevelId,
        page: params.page || 1,
        per_page: params.per_page || 15,
        ...params
      };
      
      console.log('📡 API request params:', filterParams);
      
      const response = await api.get('/courses/filter', { params: filterParams });
      
      console.log('✅ Educational level filter API response:', response.data);
      
      // تحديد هيكل البيانات الصحيح
      let coursesData = [];
      let paginationData = {};
      
      if (response.data.success) {
        // محاولة العثور على البيانات بطرق مختلفة
        if (response.data.data && Array.isArray(response.data.data.data)) {
          // Structure: response.data.data.data (Laravel pagination)
          coursesData = response.data.data.data;
          paginationData = {
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            per_page: response.data.data.per_page,
            total: response.data.data.total,
            from: response.data.data.from,
            to: response.data.data.to,
            next_page_url: response.data.data.next_page_url,
            prev_page_url: response.data.data.prev_page_url
          };
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Structure: response.data.data (direct array)
          coursesData = response.data.data;
          paginationData = {
            current_page: response.data.current_page || 1,
            last_page: response.data.last_page || 1,
            per_page: response.data.per_page || 15,
            total: response.data.total || coursesData.length,
            from: response.data.from || 1,
            to: response.data.to || coursesData.length,
            next_page_url: response.data.next_page_url || null,
            prev_page_url: response.data.prev_page_url || null
          };
        } else {
          console.error('❌ Unexpected API response structure for filter:', response.data);
          throw new Error('Unexpected API response structure');
        }
      } else {
        throw new Error(response.data.message || 'API filter request failed');
      }
      
      console.log('🚀 Filtered courses found:', coursesData.length);
      console.log('📄 Filter pagination info:', paginationData);
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: true,
        data: coursesData.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: paginationData,
        filters_applied: response.data.filters_applied || {}
      };
      
      return transformedData;
    } catch (error) {
      console.error('❌ Error filtering courses by educational level:', error);
      throw handleApiError(error, 'Failed to filter courses by educational level');
    }
  }
  
  /**
   * Helper method to map education level to filter ID
   */
  mapEducationLevelToFilterId(levelId, levelName) {
    console.log(`📝 Mapping level: ID=${levelId}, Name="${levelName}"`);
    
    // استخدام ID مباشر عشان يبقى بسيط وفعال
    const levelIdStr = String(levelId);
    
    // Mapping بناءً على الـ ID أو الاسم
    const result = `level_${levelIdStr}`;
    console.log(`🎯 Mapped to: ${result}`);
    
    return result;
  }

  /**
   * Get enrolled courses for current user
   * @returns {Promise<Array>} List of enrolled courses
   */
  async getEnrolledCourses() {
    try {
      const response = await api.get('/courses/enrolled');
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch enrolled courses');
    }
  }

  /**
   * Enroll in a course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Enrollment result
   */
  async enrollCourse(courseId) {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to enroll in course');
    }
  }

  /**
   * Unenroll from a course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Unenrollment result
   */
  async unenrollCourse(courseId) {
    try {
      const response = await api.delete(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to unenroll from course');
    }
  }

  /**
   * Rate a course
   * @param {number|string} courseId - Course ID
   * @param {number} rating - Rating (1-5)
   * @param {string} review - Text review
   * @returns {Promise<Object>} Rating result
   */
  async rateCourse(courseId, rating, review = '') {
    try {
      const response = await api.post(`/courses/${courseId}/rate`, {
        rating,
        review
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to rate course');
    }
  }

  /**
   * Get course reviews
   * @param {number|string} courseId - Course ID
   * @param {Object} params - Page parameters
   * @returns {Promise<Object>} List of reviews
   */
  async getCourseReviews(courseId, params = {}) {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course reviews');
    }
  }

  /**
   * Track user progress in course
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} User progress
   */
  async getCourseProgress(courseId) {
    try {
      const response = await api.get(`/courses/${courseId}/progress`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to fetch course progress');
    }
  }

  /**
   * Update user progress in material
   * @param {number|string} materialId - Material ID
   * @param {Object} progressData - Progress data
   * @returns {Promise<Object>} Update result
   */
  async updateProgress(materialId, progressData) {
    try {
      const response = await api.post(`/materials/${materialId}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw handleApiError(error, 'Failed to update progress');
    }
  }

  /**
   * Filter courses by hierarchical education structure (NEW)
   * @param {Object} params - Filter parameters including level_id and category_id
   * @returns {Promise<Object>} Filtered courses with pagination
   */
  async getHierarchicalFilteredCourses(params = {}) {
    try {
      console.log('🎯 Calling hierarchical filter API with params:', params);
      
      // إعداد معاملات الـ API حسب الصيغة المطلوبة
      const filterParams = {
        page: params.page || 1,
        per_page: params.per_page || 15
      };
      
      // إضافة فلاتر level_id و category_id مباشرة
      if (params.level_id) {
        filterParams.level_id = params.level_id;
      }
      
      if (params.category_id) {
        filterParams.category_id = params.category_id;
      }
      
      console.log('📡 Final filter params:', filterParams);
      
      let endpoint = '/courses';
      
      // إذا كان هناك فلاتر، استخدم /courses/filter
      if (params.level_id || params.category_id) {
        endpoint = '/courses/filter';
      }
      
      const response = await api.get(endpoint, { params: filterParams });
      
      console.log('✅ Hierarchical filter API response:', response.data);
      
      // تحويل البيانات من API format إلى UI format
      const transformedData = {
        success: response.data.success,
        data: response.data.data.data.map(course => ({
          id: course.id,
          title: {
            ar: course.name,
            en: course.name
          },
          description: {
            ar: `دورة شاملة في ${course.name} للمستوى ${this.getLevelNameAr(course.educational_level_id)}`,
            en: `Comprehensive course in ${course.name} for ${this.getLevelNameEn(course.educational_level_id)}`
          },
          category: {
            ar: this.getCategoryNameAr(course.educational_department_id),
            en: this.getCategoryNameEn(course.educational_department_id)
          },
          level: {
            ar: this.getLevelNameAr(course.educational_level_id),
            en: this.getLevelNameEn(course.educational_level_id)
          },
          image: course.image || 'https://academy1.gp-app.tafra-tech.com/images/material-holder.webp',
          color: course.color || '#4285F4',
          code: course.code,
          rating: 4.5, // Default rating since not provided by API
          students: '120+', // Default students count
          duration: {
            ar: '8 أسابيع',
            en: '8 weeks'
          },
          educational_level_id: course.educational_level_id,
          educational_department_id: course.educational_department_id,
          levelId: this.mapLevelIdForFilter(course.educational_level_id)
        })),
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url
        },
        filters_applied: response.data.filters_applied || {}
      };
      
      return transformedData;
    } catch (error) {
      throw handleApiError(error, 'Failed to filter courses hierarchically');
    }
  }
}

// Export single instance of the service
export default new CoursesService();
