import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TeachersSection = ({ teachers }) => {
  const { language, isRTL } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;
  
  // Direction controls based on language
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  
  return (
    <section className="py-12 bg-blue-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 relative inline-block">
          <span className="text-blue-500">{getText("اختر", "Choose")}</span>
          {getText(" معلمك", " your teacher")}
        </h2>
        
        <div className="relative">
          {/* Teacher cards carousel */}
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-6 hide-scrollbar">
            {teachers.map((teacher) => (
              <div 
                key={teacher.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/3"
              >
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center text-center md:text-start">
                  <div className="mb-4 md:mb-0 md:mr-4">
                    <img 
                      src={teacher.avatar || "/api/placeholder/100/100"} 
                      alt={getText(teacher.name.ar, teacher.name.en)}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-1">{getText(teacher.name.ar, teacher.name.en)}</h3>
                    <p className="text-gray-600 text-sm mb-2">{getText(teacher.title.ar, teacher.title.en)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 focus:outline-none"
            aria-label={getText("السابق", "Previous")}
          >
            <PrevIcon size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 focus:outline-none"
            aria-label={getText("التالي", "Next")}
          >
            <NextIcon size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;