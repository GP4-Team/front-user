import React from 'react';

const CourseInfoTabs = ({ activeTab, setActiveTab, language }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
            activeTab === "sections"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {language === "ar" ? "الأقسام" : "Sections"}
        </button>
        <button
          onClick={() => setActiveTab("description")}
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
            activeTab === "description"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {language === "ar" ? "الوصف" : "Description"}
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {language === "ar" ? "التقييمات" : "Reviews"}
        </button>
      </div>
    </div>
  );
};

export default CourseInfoTabs;