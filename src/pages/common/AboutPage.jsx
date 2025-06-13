import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Star,
  Clock,
  Shield,
  Heart
} from 'lucide-react';

const AboutPage = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    title: isArabic ? 'من نحن' : 'About Us',
    subtitle: isArabic 
      ? 'نحن منصة تعليمية متطورة تهدف إلى تحسين التعليم في المنطقة العربية'
      : 'We are an advanced educational platform aiming to improve education in the Arab region',
    
    mission: {
      title: isArabic ? 'رسالتنا' : 'Our Mission',
      description: isArabic 
        ? 'نسعى لتوفير تعليم عالي الجودة ومتاح للجميع من خلال تقنيات متطورة وأساليب تعليمية تفاعلية'
        : 'We strive to provide high-quality education accessible to everyone through advanced technologies and interactive learning methods'
    },
    
    vision: {
      title: isArabic ? 'رؤيتنا' : 'Our Vision',
      description: isArabic 
        ? 'أن نكون المنصة التعليمية الرائدة في المنطقة العربية، ونساهم في بناء جيل متعلم ومبدع'
        : 'To be the leading educational platform in the Arab region, contributing to building an educated and creative generation'
    },

    values: {
      title: isArabic ? 'قيمنا' : 'Our Values',
      items: [
        {
          icon: <BookOpen size={40} />,
          title: isArabic ? 'التعلم المستمر' : 'Continuous Learning',
          description: isArabic ? 'نؤمن بأهمية التعلم مدى الحياة' : 'We believe in the importance of lifelong learning'
        },
        {
          icon: <Users size={40} />,
          title: isArabic ? 'التعاون' : 'Collaboration',
          description: isArabic ? 'نعمل معاً لتحقيق أهدافنا التعليمية' : 'We work together to achieve our educational goals'
        },
        {
          icon: <Target size={40} />,
          title: isArabic ? 'التميز' : 'Excellence',
          description: isArabic ? 'نسعى للتميز في كل ما نقدمه' : 'We strive for excellence in everything we offer'
        },
        {
          icon: <Heart size={40} />,
          title: isArabic ? 'الشغف' : 'Passion',
          description: isArabic ? 'شغفنا بالتعليم يحفزنا للإبداع' : 'Our passion for education drives us to innovate'
        }
      ]
    },

    stats: [
      {
        icon: <Users size={32} />,
        number: '50,000+',
        label: isArabic ? 'طالب' : 'Students'
      },
      {
        icon: <BookOpen size={32} />,
        number: '500+',
        label: isArabic ? 'دورة' : 'Courses'
      },
      {
        icon: <Award size={32} />,
        number: '200+',
        label: isArabic ? 'شهادة' : 'Certificates'
      },
      {
        icon: <Clock size={32} />,
        number: '10,000+',
        label: isArabic ? 'ساعة تعليمية' : 'Learning Hours'
      }
    ],

    team: {
      title: isArabic ? 'فريقنا' : 'Our Team',
      description: isArabic 
        ? 'فريق متخصص من الخبراء في التعليم والتكنولوجيا'
        : 'A specialized team of experts in education and technology'
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Hero Section */}
      <div className={`relative py-20 ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'} mr-4`}>
                  <Target className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h2 className="text-2xl font-bold">{content.mission.title}</h2>
              </div>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.mission.description}
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-600' : 'bg-purple-100'} mr-4`}>
                  <Star className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-purple-600'}`} />
                </div>
                <h2 className="text-2xl font-bold">{content.vision.title}</h2>
              </div>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.vision.description}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'}`}>
                  <div className={isDarkMode ? 'text-white' : 'text-indigo-600'}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.values.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.values.items.map((value, index) => (
              <div key={index} className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}>
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-blue-100 to-indigo-100'}`}>
                  <div className={isDarkMode ? 'text-white' : 'text-indigo-600'}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.team.title}</h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {content.team.description}
          </p>
          
          <div className={`inline-flex items-center px-6 py-3 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} text-white`}>
            <Shield className="w-5 h-5 mr-2" />
            <span>{isArabic ? 'فريق محترف ومؤهل' : 'Professional & Qualified Team'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;