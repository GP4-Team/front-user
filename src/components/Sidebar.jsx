import { useState, useEffect } from 'react';

// Nested menu item component
const MenuItemWithSubmenu = ({ item, isActive, toggleActive, currentLang, navigate }) => {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(`menu_${item.id}_expanded`) === 'true' || 
    (item.children && item.children.some(child => isActive === child.id))
  );
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    if (item.children && item.children.some(child => isActive === child.id)) {
      setIsOpen(true);
    }
  }, [isActive, item.children]);

  const handleExpandClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking expand arrow
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(`menu_${item.id}_expanded`, newState.toString());
  };

  const handleItemClick = () => {
    if (item.path) {
      navigate(item.path);
      toggleActive(item.id);
    }
  };

  return (
    <div className="mb-1">
      <div
        className={`
          flex items-center w-full px-4 py-2 text-sm rounded-lg cursor-pointer
          ${isActive === item.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 
            'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
        `}
      >
        <div 
          className="flex-1 flex items-center"
          onClick={handleItemClick}
        >
          {item.icon && (
            <span className={`${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
              <img src={item.icon} alt="" className="w-5 h-5" />
            </span>
          )}
          <span className="flex-1 text-left">{item.label}</span>
        </div>
        
        {item.children && (
          <button
            onClick={handleExpandClick}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg 
              className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {isOpen && item.children && (
        <div className={`${isRTL ? 'pr-8' : 'pl-8'} mt-1 space-y-1`}>
          {item.children.map((child) => (
            <div
              key={child.id}
              onClick={() => {
                navigate(child.path);
                toggleActive(child.id);
              }}
              className={`
                flex items-center w-full px-4 py-2 text-sm rounded-lg cursor-pointer
                ${isActive === child.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 
                  'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
              `}
            >
              <span className={`${isRTL ? 'ml-2' : 'mr-2'} w-2 h-2 rounded-full bg-gray-400`}></span>
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Regular menu item component
const MenuItem = ({ item, isActive, toggleActive, currentLang, navigate }) => {
  const isRTL = currentLang === 'ar';
  
  const handleClick = () => {
    navigate(item.path);
    toggleActive(item.id);
  };
  
  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center w-full px-4 py-2 text-sm rounded-lg mb-1 cursor-pointer
        ${isActive === item.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200' : 
          'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
      `}
    >
      {item.icon && (
        <span className={`${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`}>
          <img src={item.icon} alt="" className="w-5 h-5" />
        </span>
      )}
      <span>{item.label}</span>
    </div>
  );
};

// Section title component
const SectionTitle = ({ title }) => (
  <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
    {title}
  </h2>
);

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem('activeMenuItem') || 'overview'
  );
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('language') || 'en');
  const [translations, setTranslations] = useState(null);
  const isRTL = currentLang === 'ar';

  // Get translations
  useEffect(() => {
    // In a real app, fetch this from an API or import it
    const loadTranslations = async () => {
      try {
        // Simulate loading translations
        const data = {
          en: {
            menu: {
              main: 'Main Menu',
              users: 'Users Menu',
              learning: 'Learning Support',
              schedules: 'Schedules and Appointments',
              academic: 'Academic Curricula',
              financial: 'Financial Menu'
            },
            items: {
              overview: 'Overview',
              students: {
                all: 'All Students',
                add: 'Add Student'
              },
              teachers: {
                all: 'All Teachers',
                add: 'Add Teacher'
              },
              users: 'User Management',
              questionBank: 'Question and Bank',
              educationalContent: 'Educational Content',
              semesterManagement: 'Semester Management',
              categories: 'Categories and Stages',
              sections: 'Sections and Materials',
              academicParts: 'Academic Parts',
              onlinePayment: 'Online Payment',
              balanceCards: 'Balance Cards'
            }
          },
          ar: {
            menu: {
              main: 'القائمة الرئيسية',
              users: 'قائمة المستخدمين',
              learning: 'الدعم التعليمي',
              schedules: 'الجداول والمواعيد',
              academic: 'المناهج الدراسية',
              financial: 'القائمة المالية'
            },
            items: {
              overview: 'نظرة عامة',
              students: {
                all: 'جميع الطلاب',
                add: 'إضافة طالب'
              },
              teachers: {
                all: 'جميع المعلمين',
                add: 'إضافة معلم'
              },
              users: 'إدارة المستخدمين',
              questionBank: 'بنك الأسئلة',
              educationalContent: 'المحتوى التعليمي',
              semesterManagement: 'إدارة الفصول الدراسية',
              categories: 'الفئات والمراحل',
              sections: 'الأقسام والمواد',
              academicParts: 'الأجزاء الأكاديمية',
              onlinePayment: 'الدفع عبر الإنترنت',
              balanceCards: 'بطاقات الرصيد'
            }
          }
        };
        setTranslations(data);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();

    // Listen for language changes
    const handleLanguageChange = () => {
      setCurrentLang(localStorage.getItem('language') || 'en');
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Save active menu item
    localStorage.setItem('activeMenuItem', activeItem);
  }, [activeItem]);

  if (!translations) {
    return null; // Loading state
  }

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[currentLang];
    for (const key of keys) {
      if (result[key] === undefined) {
        return path; // Key not found
      }
      result = result[key];
    }
    return result;
  };

  // Navigation function
  const navigate = (path) => {
    if (path) {
      // For demo: log the navigation path
      console.log(`Navigating to ${path}`);
      
      // In a real app with a router, you would do:
      // history.push(path) or router.navigate(path)
      
      // For simple apps without a router
      window.location.href = path;
      
      // Close sidebar on mobile after navigation
      if (window.innerWidth < 768) {
        onClose();
      }
    }
  };

  // Menu structure with icons, nested items and navigation paths
  const menuItems = [
    {
      section: t('menu.main'),
      items: [
        {
          id: 'overview',
          label: t('items.overview'),
          icon: '/icons/overview.svg',
          path: '/overview'
        }
      ]
    },
    {
      section: t('menu.users'),
      items: [
        {
          id: 'students',
          label: t('items.students.all'),
          icon: '/icons/students.svg',
          children: [
            { 
              id: 'all-students', 
              label: t('items.students.all'),
              path: '../pages/students/all.jsx'
            },
            { 
              id: 'add-student', 
              label: t('items.students.add'),
              path: '/students/add'
            }
          ]
        },
        {
          id: 'teachers',
          label: t('items.teachers.all'),
          icon: '/icons/teachers.svg',
          path: '/teachers',
          children: [
            { 
              id: 'all-teachers', 
              label: t('items.teachers.all'),
              path: '/teachers/all'
            },
            { 
              id: 'add-teacher', 
              label: t('items.teachers.add'),
              path: '/teachers/add'
            }
          ]
        }
      ]
    },
    {
      section: t('menu.academic'),
      items: [
        {
          id: 'categories',
          label: t('items.categories'),
          icon: '/icons/categories.svg',
          path: '/categories'
        },
        {
          id: 'sections',
          label: t('items.sections'),
          icon: '/icons/sections.svg',
          path: '/sections'
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-30 md:hidden ${
          isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{ top: '4rem' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4 px-2">
            {menuItems.map((section, index) => (
              <div key={index}>
                <SectionTitle title={section.section} />
                {section.items.map(item => (
                  item.children ? (
                    <MenuItemWithSubmenu 
                      key={item.id}
                      item={item}
                      isActive={activeItem}
                      toggleActive={setActiveItem}
                      currentLang={currentLang}
                      navigate={navigate}
                    />
                  ) : (
                    <MenuItem 
                      key={item.id}
                      item={item}
                      isActive={activeItem}
                      toggleActive={setActiveItem}
                      currentLang={currentLang}
                      navigate={navigate}
                    />
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:block fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700`}
        style={{ top: '4rem' }}
      >
        <div className="flex-1 overflow-y-auto py-4 px-2 h-full">
          {menuItems.map((section, index) => (
            <div key={index}>
              <SectionTitle title={section.section} />
              {section.items.map(item => (
                item.children ? (
                  <MenuItemWithSubmenu 
                    key={item.id}
                    item={item}
                    isActive={activeItem}
                    toggleActive={setActiveItem}
                    currentLang={currentLang}
                    navigate={navigate}
                  />
                ) : (
                  <MenuItem 
                    key={item.id}
                    item={item}
                    isActive={activeItem}
                    toggleActive={setActiveItem}
                    currentLang={currentLang}
                    navigate={navigate}
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;