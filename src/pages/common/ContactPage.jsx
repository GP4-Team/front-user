import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Headphones,
  FileText
} from 'lucide-react';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert(isArabic ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
  };

  const content = {
    title: isArabic ? 'اتصل بنا' : 'Contact Us',
    subtitle: isArabic 
      ? 'نحن هنا لمساعدتك! تواصل معنا في أي وقت'
      : 'We are here to help! Contact us anytime',

    contactInfo: [
      {
        icon: <Mail size={24} />,
        title: isArabic ? 'البريد الإلكتروني' : 'Email',
        value: 'support@learnnova.com',
        link: 'mailto:support@learnnova.com'
      },
      {
        icon: <Phone size={24} />,
        title: isArabic ? 'الهاتف' : 'Phone',
        value: '+20 123 456 7890',
        link: 'tel:+201234567890'
      },
      {
        icon: <MapPin size={24} />,
        title: isArabic ? 'العنوان' : 'Address',
        value: isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
        link: null
      },
      {
        icon: <Clock size={24} />,
        title: isArabic ? 'ساعات العمل' : 'Working Hours',
        value: isArabic ? 'الأحد - الخميس: 9 صباحاً - 6 مساءً' : 'Sun - Thu: 9 AM - 6 PM',
        link: null
      }
    ],

    supportTypes: [
      {
        icon: <Headphones size={32} />,
        title: isArabic ? 'الدعم الفني' : 'Technical Support',
        description: isArabic ? 'مساعدة في المشاكل التقنية والأخطاء' : 'Help with technical issues and errors',
        color: 'bg-blue-500'
      },
      {
        icon: <MessageCircle size={32} />,
        title: isArabic ? 'الاستفسارات العامة' : 'General Inquiries',
        description: isArabic ? 'أسئلة حول الدورات والخدمات' : 'Questions about courses and services',
        color: 'bg-green-500'
      },
      {
        icon: <FileText size={32} />,
        title: isArabic ? 'طلب المساعدة الأكاديمية' : 'Academic Help',
        description: isArabic ? 'مساعدة في المواد الدراسية' : 'Help with academic subjects',
        color: 'bg-purple-500'
      }
    ],

    form: {
      title: isArabic ? 'أرسل لنا رسالة' : 'Send us a Message',
      name: isArabic ? 'الاسم' : 'Name',
      email: isArabic ? 'البريد الإلكتروني' : 'Email',
      subject: isArabic ? 'الموضوع' : 'Subject',
      message: isArabic ? 'الرسالة' : 'Message',
      send: isArabic ? 'إرسال' : 'Send Message',
      namePlaceholder: isArabic ? 'اكتب اسمك الكامل' : 'Enter your full name',
      emailPlaceholder: isArabic ? 'اكتب بريدك الإلكتروني' : 'Enter your email address',
      subjectPlaceholder: isArabic ? 'اكتب موضوع الرسالة' : 'Enter message subject',
      messagePlaceholder: isArabic ? 'اكتب رسالتك هنا...' : 'Type your message here...'
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

      {/* Contact Information */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {content.contactInfo.map((info, index) => (
              <div key={index} className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-100'}`}>
                  <div className={isDarkMode ? 'text-white' : 'text-indigo-600'}>
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link}
                    className={`text-sm hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {info.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Types */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.supportTypes.map((type, index) => (
              <div key={index} className={`p-8 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${type.color}`}>
                  <div className="text-white">
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{type.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.form.title}</h2>
          </div>

          <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {content.form.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content.form.namePlaceholder}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {content.form.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={content.form.emailPlaceholder}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {content.form.subject} *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={content.form.subjectPlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {content.form.message} *
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.form.messagePlaceholder}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none`}
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  <Send size={18} className={`${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {content.form.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;