import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'enabled'
  );
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('language') || 'en'
  );
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    // Set dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }

    // Set RTL
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isDarkMode, isRTL]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setCurrentLang(lang);
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentLang={currentLang}
        changeLanguage={changeLanguage}
        isRTL={isRTL}
      />
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          closeSidebar={() => setSidebarOpen(false)}
          isDarkMode={isDarkMode}
          currentLang={currentLang}
          isRTL={isRTL} 
        />
        <main 
          className={`flex-1 p-4 md:p-6 ${isSidebarOpen ? 'opacity-50 md:opacity-100' : 'opacity-100'} 
            transition-all duration-300 ease-in-out
            ${isRTL ? 'md:mr-64' : 'md:ml-64'}`}
        >
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;