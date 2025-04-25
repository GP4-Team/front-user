import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const SimpleFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A237E] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-right mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">إديورا</h2>
            <p className="text-sm">منصة تعليمية متكاملة تقدم دورات وامتحانات في مختلف المواد الدراسية بطريقة تفاعلية وحديثة</p>
          </div>
          
          <div className="flex space-x-4 space-x-reverse">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="hover:text-[#FFC107] transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#FFC107] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#FFC107] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#FFC107] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#FFC107] transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-[#7986CB] mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-right mb-4 md:mb-0">© {year} إديورا. جميع الحقوق محفوظة.</p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 space-x-reverse">
              <Link to="/terms" className="text-sm hover:text-[#FFC107] mb-2 md:mb-0">شروط الاستخدام</Link>
              <Link to="/privacy" className="text-sm hover:text-[#FFC107] mb-2 md:mb-0">سياسة الخصوصية</Link>
              <Link to="/cookies" className="text-sm hover:text-[#FFC107] mb-2 md:mb-0">سياسة ملفات الارتباط</Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm flex items-center justify-center">
              <svg className="w-4 h-4 ml-1 fill-current text-[#FFC107]" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              صُنع بكل حب في مصر
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;