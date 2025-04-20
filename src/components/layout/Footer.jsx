import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

// Import icons
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  PhoneCall,
  MapPin,
  ChevronRight,
  Book,
  Award,
  GraduationCap,
  LifeBuoy,
  ShieldCheck,
  Heart,
} from "lucide-react";

const Footer = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const isArabic = language === "ar";

  // Text content based on language
  const content = {
    companyName: {
      en: "Eduara",
      ar: "إديورا",
    },
    slogan: {
      en: "Empowering Education for Everyone",
      ar: "تمكين التعليم للجميع",
    },
    copyright: {
      en: "© 2025 Eduara. All rights reserved.",
      ar: "© 2025 إديورا. جميع الحقوق محفوظة.",
    },
    quickLinks: {
      title: {
        en: "Quick Links",
        ar: "روابط سريعة",
      },
      links: [
        {
          name: { en: "Courses", ar: "الدورات" },
          path: "/courses",
        },
        {
          name: { en: "Exams", ar: "الاختبارات" },
          path: "/exams",
        },
        {
          name: { en: "Leaderboard", ar: "لوحة المتصدرين" },
          path: "/leaderboard",
        },
        {
          name: { en: "Support", ar: "الدعم" },
          path: "/support",
        },
      ],
    },
    subjects: {
      title: {
        en: "Subjects",
        ar: "المواد الدراسية",
      },
      links: [
        {
          name: { en: "Physics", ar: "الفيزياء" },
          path: "/subjects/physics",
        },
        {
          name: { en: "Chemistry", ar: "الكيمياء" },
          path: "/subjects/chemistry",
        },
        {
          name: { en: "Mathematics", ar: "الرياضيات" },
          path: "/subjects/mathematics",
        },
        {
          name: { en: "Biology", ar: "الأحياء" },
          path: "/subjects/biology",
        },
      ],
    },
    contactUs: {
      title: {
        en: "Contact Us",
        ar: "تواصل معنا",
      },
      email: "support@eduara.com",
      phone: "+20 123 456 7890",
      address: {
        en: "123 Education St., Cairo, Egypt",
        ar: "١٢٣ شارع التعليم، القاهرة، مصر",
      },
    },
    newsletter: {
      title: {
        en: "Newsletter",
        ar: "النشرة الإخبارية",
      },
      placeholder: {
        en: "Your Email",
        ar: "بريدك الإلكتروني",
      },
      button: {
        en: "Subscribe",
        ar: "اشترك",
      },
      description: {
        en: "Subscribe to get updates on new courses and features",
        ar: "اشترك للحصول على تحديثات حول الدورات والميزات الجديدة",
      },
    },
    features: [
      {
        icon: <GraduationCap size={16} />,
        text: { en: "Expert Teachers", ar: "معلمون خبراء" },
      },
      {
        icon: <Award size={16} />,
        text: { en: "Quality Content", ar: "محتوى عالي الجودة" },
      },
      {
        icon: <ShieldCheck size={16} />,
        text: { en: "Secure Platform", ar: "منصة آمنة" },
      },
    ],
  };

  // Helper function to get text based on current language
  const getText = (textObj) => {
    if (!textObj || typeof textObj !== "object") {
      return textObj || "";
    }
    return textObj[language] || textObj.en || "";
  };

  return (
    <footer
      className={`${
        isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-900 to-indigo-900"
      } text-white pt-16 pb-8`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top footer with logo and brief info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Logo & Info */}
          <div className={`${isRTL ? "lg:order-1" : ""}`}>
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm ${
                  isRTL ? "ml-3" : "mr-3"
                }`}
              >
                <span className="text-2xl font-bold text-white">E</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{getText(content.companyName)}</h3>
                <p className="text-sm text-blue-200">{getText(content.slogan)}</p>
              </div>
            </div>
            <p className={`text-gray-300 mb-6 text-sm ${isRTL ? "text-right" : "text-left"}`}>
              {isArabic
                ? "منصة تعليمية متكاملة تقدم دورات وامتحانات في مختلف المواد الدراسية بطريقة تفاعلية وحديثة."
                : "A comprehensive educational platform offering courses and exams in various subjects in an interactive and modern way."}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className={`${isRTL ? "lg:order-2 text-right" : ""}`}>
            <h3 className="text-lg font-bold mb-6 text-white">
              {getText(content.quickLinks.title)}
            </h3>
            <ul className="space-y-3">
              {content.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center group text-gray-300 hover:text-white transition-colors"
                  >
                    {isRTL ? (
                      <>
                        {getText(link.name)}
                        <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    ) : (
                      <>
                        <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {getText(link.name)}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Subjects */}
          <div className={`${isRTL ? "lg:order-3 text-right" : ""}`}>
            <h3 className="text-lg font-bold mb-6 text-white">
              {getText(content.subjects.title)}
            </h3>
            <ul className="space-y-3">
              {content.subjects.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center group text-gray-300 hover:text-white transition-colors"
                  >
                    {isRTL ? (
                      <>
                        {getText(link.name)}
                        <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    ) : (
                      <>
                        <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {getText(link.name)}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div className={`${isRTL ? "lg:order-4 text-right" : ""}`}>
            <h3 className="text-lg font-bold mb-6 text-white">
              {getText(content.contactUs.title)}
            </h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href={`mailto:${content.contactUs.email}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  {isRTL ? (
                    <>
                      {content.contactUs.email}
                      <Mail size={16} className="mr-3" />
                    </>
                  ) : (
                    <>
                      <Mail size={16} className="mr-3" />
                      {content.contactUs.email}
                    </>
                  )}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.contactUs.phone.replace(/\s/g, "")}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  {isRTL ? (
                    <>
                      {content.contactUs.phone}
                      <PhoneCall size={16} className="mr-3" />
                    </>
                  ) : (
                    <>
                      <PhoneCall size={16} className="mr-3" />
                      {content.contactUs.phone}
                    </>
                  )}
                </a>
              </li>
              <li>
                <div className="flex items-center text-gray-300">
                  {isRTL ? (
                    <>
                      {getText(content.contactUs.address)}
                      <MapPin size={16} className="mr-3" />
                    </>
                  ) : (
                    <>
                      <MapPin size={16} className="mr-3" />
                      {getText(content.contactUs.address)}
                    </>
                  )}
                </div>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <h3 className="text-lg font-bold mb-3 text-white">
              {getText(content.newsletter.title)}
            </h3>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder={getText(content.newsletter.placeholder)}
                  className={`py-2 px-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-${
                    isRTL ? "r" : "l"
                  } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow`}
                />
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-${
                    isRTL ? "l" : "r"
                  } transition-colors duration-200`}
                >
                  {getText(content.newsletter.button)}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features Bar */}
        <div className="border-t border-white border-opacity-10 pt-8 mt-8">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-blue-200"
              >
                <div className="mr-2">{feature.icon}</div>
                <span>{getText(feature.text)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white border-opacity-10 pt-8 mt-8 text-center text-sm text-gray-400">
          <p className="mb-4">{getText(content.copyright)}</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              {isArabic ? "شروط الاستخدام" : "Terms of Use"}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {isArabic ? "سياسة ملفات الارتباط" : "Cookie Policy"}
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center text-xs">
            <Heart size={12} className="mr-1 text-pink-500" />
            <span>
              {isArabic
                ? "صُنع بكل حب في مصر"
                : "Made with love in Egypt"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
