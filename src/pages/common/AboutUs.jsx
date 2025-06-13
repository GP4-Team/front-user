import React from 'react';
import { ArrowRight, Users, Target, Award, Heart, BookOpen, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/navigation/Navbar';
import UnifiedFooter from '../../components/common/UnifiedFooter';

const AboutUs = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();

  const content = {
    ar: {
      title: 'من نحن',
      subtitle: 'نحن منصة تعليمية متطورة تهدف لتقديم تعليم عالي الجودة للجميع',
      sections: {
        mission: {
          title: 'رسالتنا',
          content: 'تقديم تعليم متطور وتفاعلي يساعد الطلاب على تحقيق أهدافهم الأكاديمية والمهنية من خلال منصة تعليمية شاملة ومبتكرة.'
        },
        vision: {
          title: 'رؤيتنا',
          content: 'أن نكون المنصة التعليمية الرائدة في المنطقة، نمكن المتعلمين من الوصول إلى أفضل الموارد التعليمية والأدوات التفاعلية.'
        },
        values: {
          title: 'قيمنا',
          items: [
            { icon: BookOpen, title: 'التميز الأكاديمي', desc: 'نسعى لتقديم محتوى تعليمي عالي الجودة' },
            { icon: Users, title: 'التعلم التشاركي', desc: 'نؤمن بقوة التعلم الجماعي والتفاعل' },
            { icon: Lightbulb, title: 'الابتكار', desc: 'نطور باستمرار طرق تعليمية جديدة ومبتكرة' },
            { icon: Heart, title: 'الشغف', desc: 'نعمل بشغف لخدمة المجتمع التعليمي' }
          ]
        }
      },
      stats: {
        students: { number: '10,000+', label: 'طالب' },
        courses: { number: '500+', label: 'كورس' },
        teachers: { number: '100+', label: 'مدرس' },
        completion: { number: '95%', label: 'معدل إكمال' }
      },
      team: {
        title: 'فريقنا',
        subtitle: 'نحن فريق من المتخصصين المتحمسين للتعليم والتكنولوجيا'
      },
      cta: {
        title: 'انضم إلينا اليوم',
        subtitle: 'ابدأ رحلتك التعليمية معنا واكتشف إمكانياتك الحقيقية',
        button: 'ابدأ الآن'
      }
    },
    en: {
      title: 'About Us',
      subtitle: 'We are an advanced educational platform dedicated to providing high-quality education for everyone',
      sections: {
        mission: {
          title: 'Our Mission',
          content: 'To provide advanced and interactive education that helps students achieve their academic and professional goals through a comprehensive and innovative educational platform.'
        },
        vision: {
          title: 'Our Vision',
          content: 'To be the leading educational platform in the region, empowering learners to access the best educational resources and interactive tools.'
        },
        values: {
          title: 'Our Values',
          items: [
            { icon: BookOpen, title: 'Academic Excellence', desc: 'We strive to provide high-quality educational content' },
            { icon: Users, title: 'Collaborative Learning', desc: 'We believe in the power of group learning and interaction' },
            { icon: Lightbulb, title: 'Innovation', desc: 'We continuously develop new and innovative teaching methods' },
            { icon: Heart, title: 'Passion', desc: 'We work passionately to serve the educational community' }
          ]
        }
      },
      stats: {
        students: { number: '10,000+', label: 'Students' },
        courses: { number: '500+', label: 'Courses' },
        teachers: { number: '100+', label: 'Teachers' },
        completion: { number: '95%', label: 'Completion Rate' }
      },
      team: {
        title: 'Our Team',
        subtitle: 'We are a team of specialists passionate about education and technology'
      },
      cta: {
        title: 'Join Us Today',
        subtitle: 'Start your educational journey with us and discover your true potential',
        button: 'Get Started'
      }
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-background-dark text-text-light' : 'bg-background-light text-text-dark'}`}>
      {/* Main Header */}
      <Navbar />
      
      {/* Add minimal space to prevent content from being hidden under the navbar */}
      <div className="pt-8"></div>
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.sections.mission.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {t.sections.mission.content}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <Award className="w-8 h-8 text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t.sections.vision.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {t.sections.vision.content}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {Object.entries(t.stats).map(([key, stat]) => (
              <div key={key} className="transform hover:scale-105 transition-transform">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.sections.values.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.sections.values.items.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.team.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {t.team.subtitle}
          </p>
          
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'فريق متخصص ومتفاني' : 'Dedicated and Specialized Team'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === 'ar' 
                ? 'نحن مجموعة من المتخصصين في التعليم والتكنولوجيا، نعمل بشغف لتطوير أفضل تجربة تعليمية ممكنة لطلابنا.'
                : 'We are a group of specialists in education and technology, working passionately to develop the best possible learning experience for our students.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </button>
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <UnifiedFooter />
    </div>
  );
};

export default AboutUs;