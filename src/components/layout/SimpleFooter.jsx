import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  GraduationCap,
} from "lucide-react";

const SimpleFooter = () => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === "ar";

  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black text-text-dark dark:text-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`flex items-center mb-2 md:mb-0`}>
            {/* Logo Added Here */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#3949AB]/10 dark:bg-white/10 mr-2">
                <GraduationCap size={16} className="text-[#1A237E] dark:text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">Eduara</span>
                <p className="text-xs">
                  © {year}{" "}
                  {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center space-x-3 ${
              isRTL ? "space-x-reverse" : ""
            }`}
          >
            <div className={`flex space-x-3 ${isRTL ? "space-x-reverse" : ""}`}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#1A237E] dark:text-white hover:text-[#FFC107] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#1A237E] dark:text-white hover:text-[#FFC107] transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#1A237E] dark:text-white hover:text-[#FFC107] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
            <span className="mx-2 text-[#7986CB] dark:text-[#7986CB]">|</span>
            <p
              className={`text-xs flex items-center ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <svg
                className={`w-3 h-3 ${
                  isRTL ? "ml-1" : "mr-1"
                } fill-current text-[#FFC107]`}
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {isArabic ? "صُنع بكل حب" : "Made with love"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
