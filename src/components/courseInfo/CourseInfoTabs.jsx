import React from 'react';

const CourseInfoTabs = ({ activeTab, setActiveTab, language }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("lessons")}
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
            activeTab === "lessons"
              ? "text-[#3949AB] border-b-2 border-[#3949AB]"
              : "text-[#37474F] hover:text-[#3949AB]"
          }`}
        >
          {language === "ar" ? "الدروس" : "Lessons"}
        </button>
        <button
          onClick={() => setActiveTab("description")}
          className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
            activeTab === "description"
              ? "text-[#3949AB] border-b-2 border-[#3949AB]"
              : "text-[#37474F] hover:text-[#3949AB]"
          }`}
        >
          {language === "ar" ? "الوصف" : "Description"}
        </button>
      </div>
    </div>
  );
};

export default CourseInfoTabs;