import React from 'react';
import { Modal, Button } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const StartExamModal = ({ 
  onConfirm, 
  onCancel, 
  language, 
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    purple: '#6B3DD2',  // Purple color for buttons
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  }
}) => {
  const { isDarkMode } = useTheme();
  
  const modalTitle = null; // No title as per screenshot
  const modalContent = language === 'ar' 
    ? 'بمجرد البدء، ستحتاج إلى إكمال الامتحان'
    : 'Once you start, you will need to complete the exam';
  
  const confirmText = language === 'ar' ? 'بدء' : 'Start';
  const cancelText = language === 'ar' ? 'إلغاء' : 'Cancel';

  return (
    <Modal
      title={null}
      open={true}
      onCancel={onCancel}
      footer={null}
      centered
      className={isDarkMode ? 'dark-mode-modal' : ''}
      maskClosable={false}
      closeIcon={null}
      width={400}
      bodyStyle={{ 
        padding: '30px 20px',
        textAlign: 'center',
        borderRadius: '12px'
      }}
      style={{
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
      </div>
      
      {/* Question */}
      <h3 className="text-xl font-bold mb-2">
        {language === 'ar' ? 'هل أنت متأكد أنك تريد بدء الامتحان؟' : 'Are you sure you want to start the exam?'}
      </h3>
      
      {/* Subtitle */}
      <p className="mb-6 text-gray-500 text-sm">
        {modalContent}
      </p>
      
      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          onClick={onConfirm}
          style={{
            backgroundColor: colors.purple, // Changed to purple
            borderColor: colors.purple,     // Changed to purple
            borderRadius: '8px',
            height: '40px',
            width: '120px',
          }}
        >
          {confirmText}
        </Button>
        
        <Button
          onClick={onCancel}
          style={{
            borderRadius: '8px',
            height: '40px',
            width: '120px',
          }}
        >
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
};

export default StartExamModal;
