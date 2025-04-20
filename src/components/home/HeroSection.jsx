import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../ui/buttons/Button';

const HeroSection = () => {
  const { language, isRTL } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white h-screen flex items-center overflow-hidden">
      {/* Decorative wave pattern at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Hero Image */}
          <div className="relative w-full md:w-1/2 mb-10 md:mb-0">
            <div className="relative z-10">
              <div className="relative w-64 h-64 mx-auto">
                {/* Character image */}
                <img 
                  src="/api/placeholder/400/400" 
                  alt={getText("شخصية تعليمية", "Educational character")}
                  className="w-full h-full object-contain"
                />
                
                {/* Circular background */}
                <div className="absolute inset-0 -z-10 rounded-full bg-yellow-300"></div>
                
                {/* Blue arc */}
                <div className="absolute -top-16 -left-16 -right-16 -z-20">
                  <svg viewBox="0 0 200 100" className="w-full">
                    <path d="M0,50 C25,20 75,20 100,50 C125,80 175,80 200,50" fill="none" stroke="#3B82F6" strokeWidth="8"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Content */}
          <div className="w-full md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 relative">
              <span className="text-blue-500">{getText("طفرة", "Tafra")}</span>
              {getText(" جديدة في التعليم!", " A new leap in education!")}
              <span className="block absolute bottom-0 right-0 w-40 h-1 bg-yellow-400 mt-1"></span>
            </h1>
            
            <p className="text-gray-700 mb-8 max-w-md">
              {getText(
                "سواء كنت طالباً، معلماً، أو محترفاً يسعى لتطوير مهاراته، طفرة تقدم لك الأدوات والدورات اللازمة لتحقيق النجاح. تعلم من نخبة المدربين، استمتع بتجربة تعليمية متطورة، وكن مستعداً لمستقبل أفضل.",
                "Whether you're a student, teacher, or professional looking to develop your skills, Tafra provides you with the tools and courses necessary for success. Learn from elite trainers, enjoy an advanced educational experience, and be prepared for a better future."
              )}
            </p>
            
            <div className="flex flex-wrap justify-start w-full gap-4">
              <Button 
                variant="primary"
                size="lg"
                href="/register"
                className="font-bold"
              >
                {getText("انضم للدورات", "Join Courses")}
              </Button>
              
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;