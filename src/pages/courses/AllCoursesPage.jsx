import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../utils/colors';

// Components
import Navbar from '../../components/navigation/Navbar';
import SimplifiedCourseCard from '../../components/courses/SimplifiedCourseCard';

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
    level: ''
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
          en: 'Comprehensive mathematics course for 2nd secondary grade.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade11',
      },
      {
        id: 'arabic-basic-secondary',
        title: {
          ar: 'اللغة العربية الأساسية',
          en: 'Basic Arabic Language',
        },
        description: {
          ar: 'دورة أساسية في قواعد اللغة العربية للمرحلة الثانوية تساعدك على إتقان اللغة.',
          en: 'Basic course in Arabic grammar for the secondary stage.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade10',
      },
      {
        id: 'chemistry-3rd-secondary',
        title: {
          ar: 'كيمياء ثالثة ثانوي',
          en: 'Chemistry - 3rd Secondary',
        },
        description: {
          ar: 'دورة متكاملة في الكيمياء للصف الثالث الثانوي تؤهلك للتفوق في امتحان الثانوية العامة.',
          en: 'Integrated chemistry course for the 3rd secondary grade.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade12',
      },
      {
        id: 'physics-3rd-secondary',
        title: {
          ar: 'فيزياء ثالثة ثانوي',
          en: 'Physics - 3rd Secondary',
        },
        description: {
          ar: 'كورس متميز للفيزياء للصف الثالث الثانوي مع شرح تفصيلي لجميع أجزاء المنهج.',
          en: 'Distinguished physics course for the 3rd secondary grade.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade12',
      },
      {
        id: 'english-secondary',
        title: {
          ar: 'اللغة الإنجليزية الثانوية',
          en: 'Secondary English Language',
        },
        description: {
          ar: 'كورس اللغة الإنجليزية للمرحلة الثانوية مع التركيز على قواعد اللغة.',
          en: 'English language course for the secondary stage.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade10',
      },
      {
        id: 'science-secondary',
        title: {
          ar: 'العلوم للمرحلة الثانوية',
          en: 'Secondary Science',
        },
        description: {
          ar: 'كورس علوم متكامل للمرحلة الثانوية مصمم بطريقة تفاعلية وممتعة.',
          en: 'Integrated science course for secondary school.',
        },
        image: '/api/placeholder/400/225',
        levelId: 'grade11',
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
          getText(course.description.ar, course.description.en).toLowerCase().includes(query)
      );
    }
    
    // تطبيق فلتر المرحلة الدراسية
    if (filters.level) {
      result = result.filter((course) => course.levelId === filters.level);
    }
    

    
    setFilteredCourses(result);
  }, [courses, searchQuery, filters, language]);
  
  /**
   * معالجة تغيير الفلاتر
   * @param {string} filterType - نوع الفلتر (level, category)
   * @param {string} value - قيمة الفلتر
   */
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        level: ''
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
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3949AB]"></div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212] text-[#E0E0E0]' : 'bg-[#F0F4F8] text-[#37474F]'}`}>
      {/* Navbar */}
      <Navbar />
      
      {/* سنضيف مسافة أعلى لتجنب تداخل النافبار الثابت */}
      <div className="pt-20"></div>
      
      {/* رأس الصفحة */}
      <div className={`${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-[#3949AB]'} py-12 text-white`}>
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
              placeholder={getText('ابحث عن الدورات...', 'Search for courses...')}
              className={`w-full py-3 px-12 rounded-full border ${isDarkMode ? 'bg-[#333333] border-[#444444] text-white placeholder-gray-400' : 'bg-white border-gray-300 text-[#37474F]'} focus:outline-none focus:ring-2 focus:ring-[#7986CB] focus:border-transparent shadow-sm`}
            />
            <Search size={20} className={`absolute top-3.5 ${isRTL ? 'right-4' : 'left-4'} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>
      </div>
      
      {/* محتوى رئيسي */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* جانب الفلاتر */}
          <div className="lg:w-1/4">
            <div className={`${isDarkMode ? 'bg-[#1E1E1E] border-[#333333]' : 'bg-white border-gray-200'} rounded-lg shadow-md p-4 border sticky top-24`}>
              <h2 className="text-xl font-bold mb-4">
                {getText('الفلتر', 'Filter')}
              </h2>
              
              {/* فلتر المرحلة الدراسية */}
              <div className="mb-6">
                <h3 className={`font-medium mb-2 pb-2 border-b ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
                  {getText('المرحلة الدراسية', 'Educational Level')}
                </h3>
                <div className="space-y-2 mt-3">
                  <label className="block">
                    <input
                      type="radio"
                      name="level"
                      value="grade10"
                      checked={filters.level === 'grade10'}
                      onChange={() => handleFilterChange('level', 'grade10')}
                      className="mr-2 rtl:ml-2"
                    />
                    {getText('الصف الأول الثانوي', '1st Grade Secondary')}
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="level"
                      value="grade11"
                      checked={filters.level === 'grade11'}
                      onChange={() => handleFilterChange('level', 'grade11')}
                      className="mr-2 rtl:ml-2"
                    />
                    {getText('الصف الثاني الثانوي', '2nd Grade Secondary')}
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="level"
                      value="grade12"
                      checked={filters.level === 'grade12'}
                      onChange={() => handleFilterChange('level', 'grade12')}
                      className="mr-2 rtl:ml-2"
                    />
                    {getText('الصف الثالث الثانوي', '3rd Grade Secondary')}
                  </label>
                </div>
              </div>
              

              
              {/* زر إعادة تعيين الفلاتر */}
              <button
                onClick={() => handleFilterChange('reset')}
                className={`w-full py-2 px-4 rounded-md ${isDarkMode ? 'bg-[#333333] hover:bg-[#444444] text-white' : 'bg-gray-200 hover:bg-gray-300 text-[#37474F]'} transition duration-200`}
              >
                {getText('إعادة تعيين', 'Reset')}
              </button>
            </div>
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
                  <SimplifiedCourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className={`${isDarkMode ? 'bg-[#1E1E1E] text-[#E0E0E0]' : 'bg-white text-[#37474F]'} rounded-lg shadow-md p-8 text-center`}>
                <p>
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
                      category: '',
                    });
                  }}
                  className={`mt-4 ${isDarkMode ? 'bg-[#3949AB] hover:bg-[#1A237E]' : 'bg-[#3949AB] hover:bg-[#1A237E]'} text-white font-medium py-2 px-4 rounded-md transition duration-200`}
                >
                  {getText('إعادة تعيين البحث', 'Reset Search')}
                </button>
              </div>
            )}
            
            {/* زر تحميل المزيد - يظهر فقط إذا كان هناك المزيد من الكورسات */}
            {filteredCourses.length > 0 && filteredCourses.length % 6 === 0 && (
              <div className="text-center mt-8">
                <button className={`${isDarkMode ? 'bg-[#1E1E1E] border-[#7986CB] text-[#7986CB] hover:bg-[#333333]' : 'bg-white border-[#3949AB] text-[#3949AB] hover:bg-gray-100'} border font-medium py-2 px-6 rounded-md transition-colors`}>
                  {getText('تحميل المزيد', 'Load More')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* تم إزالة الفوتر بالكامل */}
    </div>
  );
};

export default AllCoursesPage;