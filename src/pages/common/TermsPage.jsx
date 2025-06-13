import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsPage = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    title: isArabic ? 'شروط الاستخدام' : 'Terms of Service',
    lastUpdated: isArabic ? 'آخر تحديث: يناير 2025' : 'Last updated: January 2025',
    
    intro: {
      title: isArabic ? 'مقدمة' : 'Introduction',
      content: isArabic 
        ? 'مرحباً بك في LearnNova. باستخدام منصتنا التعليمية، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا.'
        : 'Welcome to LearnNova. By using our educational platform, you agree to comply with these terms and conditions. Please read them carefully before using our services.'
    },

    sections: [
      {
        icon: <Users size={24} />,
        title: isArabic ? 'قبول الشروط' : 'Acceptance of Terms',
        content: [
          isArabic ? 'باستخدام LearnNova، فإنك تقر بأنك قرأت وفهمت هذه الشروط' : 'By using LearnNova, you acknowledge that you have read and understood these terms',
          isArabic ? 'يجب أن تكون في سن 13 عاماً أو أكثر لاستخدام المنصة' : 'You must be 13 years or older to use the platform',
          isArabic ? 'إذا كنت تحت سن 18، يجب الحصول على موافقة الوالدين' : 'If you are under 18, parental consent is required',
          isArabic ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت' : 'We reserve the right to modify these terms at any time'
        ]
      },
      {
        icon: <FileText size={24} />,
        title: isArabic ? 'استخدام الخدمة' : 'Use of Service',
        content: [
          isArabic ? 'يمكنك استخدام المنصة للأغراض التعليمية المشروعة فقط' : 'You may use the platform for legitimate educational purposes only',
          isArabic ? 'يجب عليك تقديم معلومات دقيقة وصحيحة عند التسجيل' : 'You must provide accurate and truthful information when registering',
          isArabic ? 'أنت مسؤول عن الحفاظ على سرية بيانات حسابك' : 'You are responsible for maintaining the confidentiality of your account information',
          isArabic ? 'يحظر استخدام المنصة لأي أنشطة غير قانونية أو ضارة' : 'It is prohibited to use the platform for any illegal or harmful activities'
        ]
      },
      {
        icon: <CheckCircle size={24} />,
        title: isArabic ? 'حقوقك كمستخدم' : 'Your Rights as a User',
        content: [
          isArabic ? 'الوصول إلى المحتوى التعليمي المدفوع بعد الاشتراك' : 'Access to paid educational content after subscription',
          isArabic ? 'الحصول على شهادات إتمام للدورات المكتملة' : 'Receive completion certificates for finished courses',
          isArabic ? 'الدعم الفني والأكاديمي من فريقنا' : 'Technical and academic support from our team',
          isArabic ? 'حماية خصوصية بياناتك الشخصية' : 'Protection of your personal data privacy',
          isArabic ? 'إلغاء الاشتراك في أي وقت وفقاً لسياسة الاسترداد' : 'Cancel subscription anytime according to our refund policy'
        ]
      },
      {
        icon: <XCircle size={24} />,
        title: isArabic ? 'الأنشطة المحظورة' : 'Prohibited Activities',
        content: [
          isArabic ? 'مشاركة بيانات الدخول مع أشخاص آخرين' : 'Sharing login credentials with other people',
          isArabic ? 'نسخ أو توزيع المحتوى التعليمي بدون إذن' : 'Copying or distributing educational content without permission',
          isArabic ? 'استخدام أدوات أو برامج لتجاوز أمان المنصة' : 'Using tools or software to bypass platform security',
          isArabic ? 'نشر محتوى مسيء أو غير لائق' : 'Publishing offensive or inappropriate content',
          isArabic ? 'محاولة الغش في الامتحانات أو التقييمات' : 'Attempting to cheat on exams or assessments'
        ]
      },
      {
        icon: <Shield size={24} />,
        title: isArabic ? 'الملكية الفكرية' : 'Intellectual Property',
        content: [
          isArabic ? 'جميع المحتويات محمية بحقوق الطبع والنشر' : 'All content is protected by copyright',
          isArabic ? 'العلامات التجارية والشعارات مملوكة لـ LearnNova' : 'Trademarks and logos are owned by LearnNova',
          isArabic ? 'يحظر استخدام المحتوى لأغراض تجارية بدون إذن' : 'Commercial use of content is prohibited without permission',
          isArabic ? 'يمكن استخدام المحتوى للاستخدام الشخصي التعليمي فقط' : 'Content may be used for personal educational use only'
        ]
      },
      {
        icon: <AlertTriangle size={24} />,
        title: isArabic ? 'إخلاء المسؤولية' : 'Disclaimer',
        content: [
          isArabic ? 'نقدم المحتوى التعليمي "كما هو" بدون ضمانات' : 'We provide educational content "as is" without warranties',
          isArabic ? 'لا نضمن عدم انقطاع الخدمة أو خلوها من الأخطاء' : 'We do not guarantee uninterrupted or error-free service',
          isArabic ? 'لا نتحمل مسؤولية الأضرار الناتجة عن استخدام المنصة' : 'We are not liable for damages resulting from platform use',
          isArabic ? 'المستخدم مسؤول عن استخدام المعلومات المقدمة' : 'Users are responsible for how they use the provided information'
        ]
      },
      {
        icon: <FileText size={24} />,
        title: isArabic ? 'سياسة الاسترداد' : 'Refund Policy',
        content: [
          isArabic ? 'يمكن طلب استرداد خلال 14 يوم من تاريخ الشراء' : 'Refunds can be requested within 14 days of purchase',
          isArabic ? 'يجب عدم استهلاك أكثر من 20% من المحتوى للحصول على استرداد' : 'No more than 20% of content should be consumed for refund eligibility',
          isArabic ? 'تتم مراجعة طلبات الاسترداد خلال 5-7 أيام عمل' : 'Refund requests are reviewed within 5-7 business days',
          isArabic ? 'بعض العروض الخاصة قد لا تكون قابلة للاسترداد' : 'Some special offers may be non-refundable'
        ]
      }
    ],

    contact: {
      title: isArabic ? 'اتصل بنا' : 'Contact Us',
      content: isArabic 
        ? 'إذا كان لديك أي أسئلة حول شروط الاستخدام، يرجى التواصل معنا:'
        : 'If you have any questions about these terms of service, please contact us:',
      email: 'legal@learnnova.com'
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
                <FileText className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`} />
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
              <FileText size={18} className={`${isArabic ? 'ml-2' : 'mr-2'}`} />
              {content.contact.email}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;