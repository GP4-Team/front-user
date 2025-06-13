import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Shield,
  Clock,
  Heart
} from 'lucide-react';

const ModernFooter = () => {
  const { isDarkMode } = useTheme();
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const currentYear = new Date().getFullYear();

  // Footer sections data
  const footerData = {
    company: {
      name: isArabic ? 'ليرن نوفا' : 'LearnNova',
      description: isArabic 
        ? 'منصة تعليمية متطورة تقدم دورات وامتحانات تفاعلية لجميع المراحل الدراسية' 
        : 'An advanced educational platform offering interactive courses and exams for all academic levels',
      email: 'support@learnnova.com',
      phone: '+20 123 456 7890',
      address: isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
    },
    quickLinks: {
      title: isArabic ? 'روابط سريعة' : 'Quick Links',
      links: [
        { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
        { name: isArabic ? 'الدورات' : 'Courses', path: '/courses' },
        { name: isArabic ? 'الامتحانات' : 'Exams', path: '/exams' },
        { name: isArabic ? 'من نحن' : 'About Us', path: '/about' },
        { name: isArabic ? 'اتصل بنا' : 'Contact', path: '/contact' },
      ]
    },
    subjects: {
      title: isArabic ? 'المواد الدراسية' : 'Subjects',
      links: [
        { name: isArabic ? 'الرياضيات' : 'Mathematics', path: '/subjects/math' },
        { name: isArabic ? 'الفيزياء' : 'Physics', path: '/subjects/physics' },
        { name: isArabic ? 'الكيمياء' : 'Chemistry', path: '/subjects/chemistry' },
        { name: isArabic ? 'الأحياء' : 'Biology', path: '/subjects/biology' },
        { name: isArabic ? 'اللغة العربية' : 'Arabic', path: '/subjects/arabic' },
      ]
    },
    support: {
      title: isArabic ? 'الدعم والمساعدة' : 'Support & Help',
      links: [
        { name: isArabic ? 'مركز المساعدة' : 'Help Center', path: '/help' },
        { name: isArabic ? 'الأسئلة الشائعة' : 'FAQ', path: '/faq' },
        { name: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy', path: '/privacy' },
        { name: isArabic ? 'شروط الاستخدام' : 'Terms of Service', path: '/terms' },
        { name: isArabic ? 'دعم فني' : 'Technical Support', path: '/support' },
      ]
    },
    features: [
      {
        icon: <BookOpen size={20} />,
        text: isArabic ? 'دورات متنوعة' : 'Diverse Courses',
        count: '500+'
      },
      {
        icon: <Users size={20} />,
        text: isArabic ? 'طالب نشط' : 'Active Students',
        count: '50K+'
      },
      {
        icon: <Award size={20} />,
        text: isArabic ? 'شهادة معتمدة' : 'Certified Courses',
        count: '200+'
      },
      {
        icon: <Clock size={20} />,
        text: isArabic ? 'ساعة تعليمية' : 'Learning Hours',
        count: '10K+'
      }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com/learnnova', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com/learnnova', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/learnnova', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com/company/learnnova', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: <Youtube size={20} />, url: 'https://youtube.com/@learnnova', color: 'hover:text-red-500' },
  ];

  return (
    <footer className={`relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Top Wave */}
      <div className="relative">
        <svg className="w-full h-12 text-white" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 48h1440V0c-120 24-240 48-360 48S840 24 720 48 480 72 360 48 120 0 0 24v24z" fill="currentColor" opacity="0.1"/>
        </svg>
      </div>

      <div className="relative pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {footerData.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-4 text-white">
                  {feature.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{feature.count}</div>
                <div className="text-sm text-blue-200">{feature.text}</div>
              </div>
            ))}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className={`lg:col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center mb-6">
                <img 
                  src="/Group 2.png" 
                  alt="LearnNova Logo" 
                  className="h-10 w-auto mr-3 rtl:ml-3 rtl:mr-0"
                />
                <h3 className="text-2xl font-bold text-white">{footerData.company.name}</h3>
              </div>
              
              <p className="text-blue-200 mb-6 text-sm leading-relaxed">
                {footerData.company.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-blue-200">
                  <Mail size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-300`} />
                  <a href={`mailto:${footerData.company.email}`} className="hover:text-white transition-colors">
                    {footerData.company.email}
                  </a>
                </div>
                <div className="flex items-center text-blue-200">
                  <Phone size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-300`} />
                  <a href={`tel:${footerData.company.phone}`} className="hover:text-white transition-colors">
                    {footerData.company.phone}
                  </a>
                </div>
                <div className="flex items-center text-blue-200">
                  <MapPin size={16} className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-300`} />
                  <span>{footerData.company.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-semibold text-white mb-6">{footerData.quickLinks.title}</h4>
              <ul className="space-y-3">
                {footerData.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      {!isRTL && <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      {link.name}
                      {isRTL && <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-semibold text-white mb-6">{footerData.subjects.title}</h4>
              <ul className="space-y-3">
                {footerData.subjects.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      {!isRTL && <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      {link.name}
                      {isRTL && <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="text-lg font-semibold text-white mb-6">{footerData.support.title}</h4>
              <ul className="space-y-3 mb-6">
                {footerData.support.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      {!isRTL && <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      {link.name}
                      {isRTL && <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h5 className="text-white font-medium mb-3">
                  {isArabic ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
                </h5>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email address'}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    {isArabic ? 'اشترك' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Social Media & Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              {/* Social Links */}
              <div className="flex items-center space-x-6 rtl:space-x-reverse mb-6 md:mb-0">
                <span className="text-blue-200 text-sm">
                  {isArabic ? 'تابعنا على:' : 'Follow us:'}
                </span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-200 ${social.color} transition-colors duration-200 p-2 rounded-full hover:bg-white/10`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-blue-200 text-sm">
                <div className="flex items-center">
                  <Shield size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>{isArabic ? 'منصة آمنة' : 'Secure Platform'}</span>
                </div>
                <div className="flex items-center">
                  <Award size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span>{isArabic ? 'معتمدة دولياً' : 'Internationally Accredited'}</span>
                </div>
              </div>

            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
                <p className="text-blue-200 text-sm">
                  © {currentYear} LearnNova. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                </p>
                <div className="flex items-center text-xs text-blue-300">
                  <Heart size={12} className={`${isRTL ? 'ml-1' : 'mr-1'} text-pink-400`} />
                  <span>{isArabic ? 'صُنع بحب في مصر' : 'Made with love in Egypt'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;