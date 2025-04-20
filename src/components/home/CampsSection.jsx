import React from 'react';
import { Book } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CampsSection = ({ camps, activeTab, setActiveTab }) => {
  const { language, isRTL } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // Tab options
  const tabs = [
    { id: 'all', label: { ar: 'الكل', en: 'All' } },
    { id: 'categories', label: { ar: 'أبواب', en: 'Categories' } },
    { id: 'months', label: { ar: 'شهور', en: 'Months' } },
    { id: 'units', label: { ar: 'حصة', en: 'Units' } },
  ];

  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8 relative inline-block">
          <span className="text-blue-500">{getText("أحدث", "Latest")}</span>
          {getText(" المعسكرات", " Camps")}
        </h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {getText(tab.label.ar, tab.label.en)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Camps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {camps.map((camp) => (
            <div key={camp.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Camp image */}
              <div className="relative">
                <img 
                  src={camp.image || "/api/placeholder/400/225"} 
                  alt={getText(camp.title.ar, camp.title.en)}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-3 text-xs font-bold">
                  {camp.type === 'camp' ? getText('معسكر', 'Camp') : getText('دورة', 'Course')}
                </div>
              </div>
              
              {/* Instructor */}
              <div className="flex items-center p-4 border-b border-gray-100">
                <img 
                  src="/api/placeholder/40/40" 
                  alt={getText(camp.instructor.ar, camp.instructor.en)}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="text-sm">
                  <p className="font-medium">{getText(camp.instructor.ar, camp.instructor.en)}</p>
                </div>
              </div>
              
              {/* Camp info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{getText(camp.title.ar, camp.title.en)}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {getText(`معسكر تجريبي لمنصة طفرة تعليمية ${camp.year}`, `Trial Camp for Tafra Educational Platform ${camp.year}`)}
                </p>
                
                {/* Course category and price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-700 text-sm">
                    <Book size={16} className="mr-1" />
                    <span>{getText(camp.category.ar, camp.category.en)}</span>
                  </div>
                  
                  <div className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md text-sm font-medium">
                    {camp.price.amount === 0 
                      ? getText('مجاني', 'Free') 
                      : `${camp.price.amount} ${camp.code}`
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more button */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
            {getText('إظهار المزيد', 'Show More')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CampsSection;