// src/pages/testing/ApiTestPage.jsx
import React from 'react';
import ApiTestingTool from '../../components/testing/ApiTestingTool';
import Navbar from '../../components/navigation/Navbar';
import { useTheme } from '../../contexts/ThemeContext';

const ApiTestPage = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      
      {/* Add space to prevent content from being hidden under the navbar */}
      <div className="pt-16"></div>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">اختبار حالة الباك إند</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          استخدم هذه الأداة لاختبار نقاط نهاية API والتحقق من حالة الباك إند
        </p>
        
        <ApiTestingTool />
      </div>
    </div>
  );
};

export default ApiTestPage;