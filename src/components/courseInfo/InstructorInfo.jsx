import React from 'react';

const InstructorInfo = ({ instructor, instructorAvatar, getText, language }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        {language === "ar" ? "المدرس" : "Instructor"}
      </h2>
      
      <div className="flex items-center">
        <img 
          src={instructorAvatar} 
          alt={getText(instructor)}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-medium text-gray-800">{getText(instructor)}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {language === "ar" ? "مدرس محترف" : "Professional Teacher"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;