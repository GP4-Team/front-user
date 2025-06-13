import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/layout/Footer';

const ContactUs = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const content = {
    ar: {
      title: 'تواصل معنا',
      subtitle: 'نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو مساعدة',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        namePlaceholder: 'أدخل اسمك الكامل',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        subjectPlaceholder: 'موضوع الرسالة',
        messagePlaceholder: 'اكتب رسالتك هنا...'
      },
      contact: {
        info: 'معلومات التواصل',
        email: 'support@learnnova.com',
        phone: '+20 123 456 7890',
        address: 'القاهرة، مصر',
        hours: 'الأحد - الخميس: 9:00 ص - 6:00 م'
      },
      reasons: {
        title: 'لماذا تتواصل معنا؟',
        items: [
          {
            icon: HelpCircle,
            title: 'الدعم التقني',
            desc: 'نحن هنا لحل أي مشاكل تقنية تواجهها'
          },
          {
            icon: MessageSquare,
            title: 'الاستفسارات العامة',
            desc: 'أي أسئلة حول خدماتنا ومنصتنا التعليمية'
          },
          {
            icon: Users,
            title: 'الشراكات',
            desc: 'للاستفسار عن الشراكات والتعاون معنا'
          }
        ]
      }
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you! Do not hesitate to contact us for any inquiry or assistance',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        namePlaceholder: 'Enter your full name',
        emailPlaceholder: 'Enter your email address',
        subjectPlaceholder: 'Message subject',
        messagePlaceholder: 'Write your message here...'
      },
      contact: {
        info: 'Contact Information',
        email: 'support@learnnova.com',
        phone: '+20 123 456 7890',
        address: 'Cairo, Egypt',
        hours: 'Sunday - Thursday: 9:00 AM - 6:00 PM'
      },
      reasons: {
        title: 'Why Contact Us?',
        items: [
          {
            icon: HelpCircle,
            title: 'Technical Support',
            desc: 'We are here to solve any technical problems you face'
          },
          {
            icon: MessageSquare,
            title: 'General Inquiries',
            desc: 'Any questions about our services and educational platform'
          },
          {
            icon: Users,
            title: 'Partnerships',
            desc: 'For inquiries about partnerships and collaboration'
          }
        ]
      }
    }
  };

  const t = content[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call here to send the message
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Show success message (you can implement toast notification)
    alert(language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
  };

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

      {/* Contact Section */}
      <div className="py-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.form.namePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.form.emailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t.form.subjectPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.form.messagePlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center justify-center"
              >
                <Send className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                {t.form.send}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.contact.info}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'الهاتف' : 'Phone'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reasons to Contact */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.reasons.title}
              </h2>
              
              <div className="space-y-4">
                {t.reasons.items.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;