import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

// Components
import Navbar from '../../components/navigation/Navbar';
import CourseCard from '../../components/courses/CourseCard';
import CoursesFilter from '../../components/courses/CoursesFilter';
import SimpleFooter from '../../components/home/SimpleFooter';

/**
 * صفحة عرض جميع الكورسات المتاحة
 * @returns {JSX.Element} - صفحة عرض جميع الكورسات
 */
const AllCoursesPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    level: '',
    price: '',
    category: '',
  });
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // محاكاة جلب البيانات من API
  useEffect(() => {
    // في تطبيق حقيقي، هذا سيكون استدعاء API
    const mockCourses = [
      {
        id: 'math-secondary-2',
        title: {
          ar: 'الرياضيات الثانوية',
          en: 'Secondary Mathematics',
        },
        description: {
          ar: 'دورة شاملة في الرياضيات للصف الثاني الثانوي تغطي جميع المفاهيم الأساسية والمتقدمة.',
          en: 'Comprehensive mathematics course for 2nd secondary grade covering all basic and advanced concepts.',
        },
        category: {
          ar: 'الرياضيات الثانوية',
          en: 'Secondary Mathematics',
        },
        instructor: {
          ar: 'د. شايلي جوتمان',
          en: 'Prof. Shaylee Gutmann',
        },
        instructorTitle: {
          ar: 'أستاذ الرياضيات',
          en: 'Mathematics Professor',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الثاني الثانوي',
          en: '2nd Grade Secondary',
        },
        levelId: 'grade11',
        price: {
          amount: 46.56,
          currency: 'EGP',
        },
        priceCategory: 'paid',
        image: '/api/placeholder/400/225',
        badgeColor: '#3B82F6',
        categoryType: 'chapters',
        code: 'PGK',
      },
      {
        id: 'arabic-basic-secondary',
        title: {
          ar: 'اللغة العربية الأساسية',
          en: 'Basic Arabic Language',
        },
        description: {
          ar: 'دورة أساسية في قواعد اللغة العربية للمرحلة الثانوية تساعدك على إتقان اللغة.',
          en: 'Basic course in Arabic grammar for the secondary stage to help you master the language.',
        },
        category: {
          ar: 'اللغة العربية الأساسية',
          en: 'Basic Arabic Language',
        },
        instructor: {
          ar: 'آرا ساواين',
          en: 'Ara Sawayn',
        },
        instructorTitle: {
          ar: 'أستاذ اللغة العربية',
          en: 'Arabic Language Professor',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الأول الثانوي',
          en: '1st Grade Secondary',
        },
        levelId: 'grade10',
        price: {
          amount: 0,
          currency: 'EGP',
        },
        priceCategory: 'free',
        image: '/api/placeholder/400/225',
        badgeColor: '#4CAF50',
        categoryType: 'months',
        code: 'PLN',
      },
      {
        id: 'chemistry-3rd-secondary',
        title: {
          ar: 'كيمياء ثالثة ثانوي',
          en: 'Chemistry - 3rd Secondary',
        },
        description: {
          ar: 'دورة متكاملة في الكيمياء للصف الثالث الثانوي تؤهلك للتفوق في امتحان الثانوية العامة.',
          en: 'Integrated chemistry course for the 3rd secondary grade that qualifies you to excel in the high school exam.',
        },
        category: {
          ar: 'كيمياء ثالثة ثانوي',
          en: 'Chemistry - 3rd Secondary',
        },
        instructor: {
          ar: 'عبدالرحمن مصطفى محمود',
          en: 'Abdelrahman Mostafa Mahmoud',
        },
        instructorTitle: {
          ar: 'مدرس كيمياء',
          en: 'Chemistry Teacher',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الثالث الثانوي',
          en: '3rd Grade Secondary',
        },
        levelId: 'grade12',
        price: {
          amount: 0,
          currency: 'EGP',
        },
        priceCategory: 'free',
        image: '/api/placeholder/400/225',
        badgeColor: '#FFC107',
        categoryType: 'classes',
        code: 'EGP',
      },
      {
        id: 'physics-3rd-secondary',
        title: {
          ar: 'فيزياء ثالثة ثانوي',
          en: 'Physics - 3rd Secondary',
        },
        description: {
          ar: 'كورس متميز للفيزياء للصف الثالث الثانوي مع شرح تفصيلي لجميع أجزاء المنهج.',
          en: 'Distinguished physics course for the 3rd secondary grade with a detailed explanation of all parts of the curriculum.',
        },
        category: {
          ar: 'فيزياء ثالثة ثانوي',
          en: 'Physics - 3rd Secondary',
        },
        instructor: {
          ar: 'د. زلما هيني',
          en: 'Dr. Zelma Heaney',
        },
        instructorTitle: {
          ar: 'أستاذ الفيزياء',
          en: 'Physics Professor',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الثالث الثانوي',
          en: '3rd Grade Secondary',
        },
        levelId: 'grade12',
        price: {
          amount: 75.30,
          currency: 'EGP',
        },
        priceCategory: 'paid',
        image: '/api/placeholder/400/225',
        badgeColor: '#9C27B0',
        categoryType: 'chapters',
        code: 'GMD',
      },
      {
        id: 'english-preparatory',
        title: {
          ar: 'اللغة الإنجليزية الإعدادية',
          en: 'Preparatory English Language',
        },
        description: {
          ar: 'كورس اللغة الإنجليزية للمرحلة الإعدادية مع التركيز على قواعد اللغة والتحدث والاستماع.',
          en: 'English language course for the preparatory stage with a focus on grammar, speaking and listening.',
        },
        category: {
          ar: 'اللغة الإنجليزية الإعدادية',
          en: 'Preparatory English Language',
        },
        instructor: {
          ar: 'كارمل كوفاسيك',
          en: 'Carmel Kovacek',
        },
        instructorTitle: {
          ar: 'مدرس لغة إنجليزية',
          en: 'English Teacher',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الثالث الإعدادي',
          en: '3rd Grade Preparatory',
        },
        levelId: 'grade9',
        price: {
          amount: 35.99,
          currency: 'EGP',
        },
        priceCategory: 'paid',
        image: '/api/placeholder/400/225',
        badgeColor: '#FF5722',
        categoryType: 'months',
        code: 'SHP',
      },
      {
        id: 'science-elementary',
        title: {
          ar: 'العلوم للمرحلة الابتدائية',
          en: 'Elementary Science',
        },
        description: {
          ar: 'كورس علوم للمرحلة الابتدائية مصمم بطريقة تفاعلية وممتعة للأطفال.',
          en: 'Science course for elementary school designed in an interactive and fun way for children.',
        },
        category: {
          ar: 'العلوم الابتدائية',
          en: 'Elementary Science',
        },
        instructor: {
          ar: 'نيل ساور',
          en: 'Nelle Sauer',
        },
        instructorTitle: {
          ar: 'مدرس علوم',
          en: 'Science Teacher',
        },
        instructorAvatar: '/api/placeholder/100/100',
        level: {
          ar: 'الصف الرابع الابتدائي',
          en: '4th Grade Elementary',
        },
        levelId: 'grade4',
        price: {
          amount: 0,
          currency: 'EGP',
        },
        priceCategory: 'free',
        image: '/api/placeholder/400/225',
        badgeColor: '#00BCD4',
        categoryType: 'classes',
        code: 'BYN',
      },
    ];
    
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    setIsLoading(false);
  }, []);
  
  // تطبيق الفلاتر والبحث على الكورسات
  useEffect(() => {
    let result = [...courses];
    
    // تطبيق فلتر البحث
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          getText(course.title.ar, course.title.en).toLowerCase().includes(query) ||
          getText(course.description.ar, course.description.en).toLowerCase().includes(query) ||
          getText(course.category.ar, course.category.en).toLowerCase().includes(query) ||
          getText(course.instructor.ar, course.instructor.en).toLowerCase().includes(query)
      );
    }
    
    // تطبيق فلتر المرحلة الدراسية
    if (filters.level) {
      result = result.filter((course) => course.levelId === filters.level);
    }
    
    // تطبيق فلتر السعر
    if (filters.price) {
      result = result.filter((course) => course.priceCategory === filters.price);
    }
    
    // تطبيق فلتر التصنيف
    if (filters.category) {
      result = result.filter((course) => course.categoryType === filters.category);
    }
    
    setFilteredCourses(result);
  }, [courses, searchQuery, filters, language]);
  
  /**
   * معالجة تغيير الفلاتر
   * @param {string} filterType - نوع الفلتر (level, price, category)
   * @param {string} value - قيمة الفلتر
   */
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        level: '',
        price: '',
        category: '',
      });
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* سنضيف مسافة أعلى لتجنب تداخل النافبار الثابت */}
      <div className="pt-20"></div>
      
      {/* رأس الصفحة */}
      <div className="bg-[#f0f4f8] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            {getText('استكشف الدورات التعليمية', 'Explore Educational Courses')}
          </h1>
          
          {/* شريط البحث */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getText('ابحث عن الدورات أو المدرسين...', 'Search for courses or instructors...')}
              className="w-full py-3 px-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3949AB] focus:border-transparent shadow-sm"
            />
            <Search size={20} className={`absolute top-3.5 ${isRTL ? 'right-4' : 'left-4'} text-gray-400`} />
          </div>
        </div>
      </div>
      
      {/* محتوى رئيسي */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* جانب الفلاتر */}
          <div className="lg:w-1/4">
            <CoursesFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* جانب الكورسات */}
          <div className="lg:w-3/4">
            {/* عنوان ونتائج البحث */}
            <div className="mb-6">
              <h2 className="text-xl font-bold">
                {filteredCourses.length > 0
                  ? getText(
                      `تم العثور على ${filteredCourses.length} دورة`,
                      `Found ${filteredCourses.length} courses`
                    )
                  : getText('لم يتم العثور على نتائج', 'No results found')}
              </h2>
            </div>
            
            {/* قائمة الكورسات */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">
                  {getText(
                    'لم يتم العثور على دورات مطابقة لمعايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.',
                    'No courses found matching your search criteria. Please try different criteria.'
                  )}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      level: '',
                      price: '',
                      category: '',
                    });
                  }}
                  className="mt-4 bg-[#3949AB] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  {getText('إعادة تعيين البحث', 'Reset Search')}
                </button>
              </div>
            )}
            
            {/* زر تحميل المزيد - يظهر فقط إذا كان هناك المزيد من الكورسات */}
            {filteredCourses.length > 0 && filteredCourses.length % 6 === 0 && (
              <div className="text-center mt-8">
                <button className="bg-white border border-[#3949AB] text-[#3949AB] hover:bg-[#f0f4f8] font-medium py-2 px-6 rounded-md transition-colors">
                  {getText('تحميل المزيد', 'Load More')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <SimpleFooter />
    </div>
  );
};

export default AllCoursesPage;