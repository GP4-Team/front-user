import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Shield, Eye, Lock, Users, FileText, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    title: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
    lastUpdated: isArabic ? 'آخر تحديث: يناير 2025' : 'Last updated: January 2025',
    
    intro: {
      title: isArabic ? 'مقدمة' : 'Introduction',
      content: isArabic 
        ? 'نحن في LearnNova نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا التعليمية.'
        : 'At LearnNova, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when you use our educational platform.'
    },

    sections: [
      {
        icon: <FileText size={24} />,
        title: isArabic ? 'المعلومات التي نجمعها' : 'Information We Collect',
        content: [
          isArabic ? 'معلومات الحساب: الاسم، البريد الإلكتروني، كلمة المرور' : 'Account Information: Name, email address, password',
          isArabic ? 'معلومات الملف الشخصي: الصورة الشخصية، التخصص، المستوى التعليمي' : 'Profile Information: Profile picture, specialization, education level',
          isArabic ? 'بيانات الاستخدام: تقدم الدورات، درجات الامتحانات، وقت الاستخدام' : 'Usage Data: Course progress, exam scores, usage time',
          isArabic ? 'المعلومات التقنية: عنوان IP، نوع المتصفح، معرف الجهاز' : 'Technical Information: IP address, browser type, device identifier'
        ]
      },
      {
        icon: <Eye size={24} />,
        title: isArabic ? 'كيف نستخدم معلوماتك' : 'How We Use Your Information',
        content: [
          isArabic ? 'توفير وتحسين خدماتنا التعليمية' : 'Provide and improve our educational services',
          isArabic ? 'تخصيص تجربة التعلم حسب احتياجاتك' : 'Personalize your learning experience',
          isArabic ? 'إرسال إشعارات مهمة حول حسابك' : 'Send important notifications about your account',
          isArabic ? 'تحليل الاستخدام لتطوير المنصة' : 'Analyze usage to improve the platform',
          isArabic ? 'ضمان الأمان ومنع الاحتيال' : 'Ensure security and prevent fraud'
        ]
      },
      {
        icon: <Lock size={24} />,
        title: isArabic ? 'حماية البيانات' : 'Data Protection',
        content: [
          isArabic ? 'تشفير جميع البيانات الحساسة باستخدام SSL/TLS' : 'Encrypt all sensitive data using SSL/TLS',
          isArabic ? 'تخزين آمن للبيانات في خوادم محمية' : 'Secure data storage on protected servers',
          isArabic ? 'الوصول المحدود للبيانات من قبل الموظفين المعتمدين فقط' : 'Limited data access by authorized personnel only',
          isArabic ? 'نسخ احتياطية منتظمة وآمنة' : 'Regular and secure backups',
          isArabic ? 'مراقبة مستمرة للأنشطة المشبوهة' : 'Continuous monitoring for suspicious activities'
        ]
      },
      {
        icon: <Users size={24} />,
        title: isArabic ? 'مشاركة المعلومات' : 'Information Sharing',
        content: [
          isArabic ? 'لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة' : 'We do not sell or rent your personal information to third parties',
          isArabic ? 'قد نشارك المعلومات مع مقدمي الخدمات المعتمدين' : 'We may share information with trusted service providers',
          isArabic ? 'المشاركة فقط عند الضرورة القانونية' : 'Sharing only when legally required',
          isArabic ? 'حماية البيانات في جميع عمليات المشاركة' : 'Data protection in all sharing processes'
        ]
      },
      {
        icon: <Shield size={24} />,
        title: isArabic ? 'حقوقك' : 'Your Rights',
        content: [
          isArabic ? 'الحق في الوصول إلى بياناتك الشخصية' : 'Right to access your personal data',
          isArabic ? 'الحق في تصحيح المعلومات غير الصحيحة' : 'Right to correct inaccurate information',
          isArabic ? 'الحق في حذف بياناتك (الحق في النسيان)' : 'Right to delete your data (Right to be forgotten)',
          isArabic ? 'الحق في قابلية نقل البيانات' : 'Right to data portability',
          isArabic ? 'الحق في الاعتراض على معالجة البيانات' : 'Right to object to data processing'
        ]
      },
      {
        icon: <AlertCircle size={24} />,
        title: isArabic ? 'ملفات تعريف الارتباط' : 'Cookies',
        content: [
          isArabic ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك' : 'We use cookies to improve your experience',
          isArabic ? 'ملفات تعريف ارتباط ضرورية للوظائف الأساسية' : 'Essential cookies for basic functionality',
          isArabic ? 'ملفات تعريف ارتباط تحليلية لفهم الاستخدام' : 'Analytics cookies to understand usage',
          isArabic ? 'يمكنك إدارة إعدادات ملفات تعريف الارتباط' : 'You can manage cookie settings',
          isArabic ? 'بعض الوظائف قد لا تعمل بدون ملفات تعريف الارتباط' : 'Some features may not work without cookies'
        ]
      }
    ],

    contact: {
      title: isArabic ? 'اتصل بنا' : 'Contact Us',
      content: isArabic 
        ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا:'
        : 'If you have any questions about this privacy policy, please contact us:',
      email: 'privacy@learnnova.com'
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Hero Section */}
      <div className={`relative py-20 ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-blue-100">{content.lastUpdated}</p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className={`p-8 rounded-2xl mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'} mr-4`}>
                <Shield className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
              </div>
              <h2 className="text-2xl font-bold">{content.intro.title}</h2>
            </div>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {content.intro.content}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index} className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-indigo-100'} mr-4`}>
                    <div className={isDarkMode ? 'text-white' : 'text-indigo-600'}>
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'} mt-2 mr-3 flex-shrink-0`}></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className={`p-8 rounded-2xl mt-12 ${isDarkMode ? 'bg-gradient-to-br from-indigo-800 to-purple-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border ${isDarkMode ? 'border-indigo-700' : 'border-indigo-200'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-indigo-900'}`}>
              {content.contact.title}
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
              {content.contact.content}
            </p>
            <a 
              href={`mailto:${content.contact.email}`}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-white text-indigo-900 hover:bg-gray-100' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Mail size={18} className={`${isArabic ? 'ml-2' : 'mr-2'}`} />
              {content.contact.email}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;