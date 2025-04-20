import React from 'react';
import { Brain, Users, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const FeaturesSection = () => {
  const { language } = useLanguage();
  
  // Helper function to get text based on language
  const getText = (ar, en) => language === 'ar' ? ar : en;

  // Features data
  const features = [
    {
      id: 'ai-support',
      icon: Brain,
      title: {
        ar: 'دعم بالذكاء الاصطناعي',
        en: 'AI Support',
      },
      description: {
        ar: 'الذكاء الاصطناعي يحلل مستواك في كل جزئيات المنهج و يقترح أنسب مسارك',
        en: 'AI analyzes your level in all parts of the curriculum and suggests the most appropriate path',
      },
    },
    {
      id: 'top-teachers',
      icon: Users,
      title: {
        ar: 'أقوى المعلمين',
        en: 'Top Teachers',
      },
      description: {
        ar: 'نخبة من افضل المعلمين المتخصصين في مجالاتهم لضمان تعليم متميز',
        en: 'Elite teachers specialized in their fields to ensure distinguished education',
      },
    },
    {
      id: 'continuous-challenges',
      icon: Clock,
      title: {
        ar: 'تحديات مستمرة',
        en: 'Continuous Challenges',
      },
      description: {
        ar: 'تحديات دورية تساعدك على قياس تقدمك وتحفيزك للمزيد من التعلم',
        en: 'Regular challenges to help you measure your progress and motivate you for more learning',
      },
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-black">{getText("لماذا", "Why")}</span>
            <span className="text-blue-500">{getText(" تختار ", " choose ")}</span>
            <span className="text-black">{getText("منصتنا", "our platform")}</span>
            <span className="text-blue-500">{getText(" ؟", "?")}</span>
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white p-6 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                  feature.id === 'ai-support' ? 'bg-pink-100 text-pink-600' :
                  feature.id === 'top-teachers' ? 'bg-blue-100 text-blue-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  <feature.icon size={32} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                {getText(feature.title.ar, feature.title.en)}
              </h3>
              
              <p className="text-gray-600">
                {getText(feature.description.ar, feature.description.en)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;