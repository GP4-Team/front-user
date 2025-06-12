// src/components/courseDetail/CourseImagePdfLesson.jsx
import React from 'react';
import { Loader, FileText, Download, Eye, Image as ImageIcon } from 'lucide-react';

const CourseImagePdfLesson = ({ materialDetails, language, isRTL }) => {
  if (!materialDetails) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <Loader className="animate-spin mx-auto mb-4" size={32} />
        <p>{language === "ar" ? "جاري التحميل..." : "Loading..."}</p>
      </div>
    );
  }

  const isImage = materialDetails.type === 'Image' || 
                  (materialDetails.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(materialDetails.url));
  const isPdf = materialDetails.type === 'Pdf' || materialDetails.type === 'Document' ||
                (materialDetails.url && /\.pdf$/i.test(materialDetails.url));

  if (isImage) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium">{materialDetails.title || materialDetails.name}</h3>
          {materialDetails.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">{materialDetails.description}</p>
          )}
        </div>
        
        <div className="p-4">
          {materialDetails.url ? (
            <div className="space-y-4">
              <img 
                src={materialDetails.url}
                alt={materialDetails.title || materialDetails.name}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{display: 'none'}} className="text-center py-8">
                <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">{language === "ar" ? "تعذر تحميل الصورة" : "Failed to load image"}</p>
              </div>
              
              <div className="flex justify-center">
                <a
                  href={materialDetails.url}
                  download
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-flex items-center"
                >
                  <Download size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  {language === "ar" ? "تحميل الصورة" : "Download Image"}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">{language === "ar" ? "لا توجد صورة متاحة" : "No image available"}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // PDF/Document view
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
      <div className="text-center">
        <FileText size={64} className="mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl font-medium mb-4">{materialDetails.title || materialDetails.name}</h3>
        
        {materialDetails.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{materialDetails.description}</p>
        )}
        
        <div className="space-y-4">
          {materialDetails.url && (
            <>
              <a
                href={materialDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-flex items-center mr-3"
              >
                <Eye size={16} className={isRTL ? "ml-2" : "mr-2"} />
                {language === "ar" ? "عرض الملف" : "View File"}
              </a>
              
              <a
                href={materialDetails.url}
                download
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg inline-flex items-center"
              >
                <Download size={16} className={isRTL ? "ml-2" : "mr-2"} />
                {language === "ar" ? "تحميل الملف" : "Download File"}
              </a>
            </>
          )}
          
          {!materialDetails.url && (
            <p className="text-gray-500">{language === "ar" ? "لا يوجد ملف متاح" : "No file available"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseImagePdfLesson;