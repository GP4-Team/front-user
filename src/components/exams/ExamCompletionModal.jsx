import React from 'react';
import { Modal, Button } from 'antd';
import { ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const ExamCompletionModal = ({ 
  onConfirm, 
  onCancel, 
  language, 
  isTimeOut = false,
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
    purple: '#6B3DD2', // Purple from the screenshots
  }
}) => {
  const { isDarkMode } = useTheme();
  
  const modalTitle = isTimeOut 
    ? (language === 'ar' ? 'انتهى وقت الامتحان' : 'Exam Time Ended')
    : (language === 'ar' ? 'هل انت متأكد انك تريد انهاء الامتحان؟' : 'Are you sure you want to end the exam?');
    
  const modalContent = isTimeOut
    ? (language === 'ar' 
        ? 'انتهى وقت الامتحان، تم تسجيل الإجابات لن يتم استلام أي إجابات أخرى'
        : 'Exam time has ended. Your answers will be submitted automatically.')
    : null; // No additional content for confirmation dialog as per screenshots
  
  const confirmText = isTimeOut 
    ? (language === 'ar' ? 'حسناً' : 'OK')
    : (language === 'ar' ? 'إنهاء' : 'End');
  const cancelText = language === 'ar' ? 'إلغاء' : 'Cancel';

  const renderModalIcon = () => {
    if (isTimeOut) {
      return (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
            <ClockCircleOutlined className="text-2xl text-red-500" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center mb-4">
          <img 
            src="/images/exam-note.svg" 
            alt="Exam Note"
            className="w-24 h-24"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjk2M0YxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci1jbGlwYm9hcmQiPjxwYXRoIGQ9Ik0xNiA0aDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMiI+PC9wYXRoPjxyZWN0IHg9IjgiIHk9IjIiIHdpZHRoPSI4IiBoZWlnaHQ9IjQiIHJ4PSIxIiByeT0iMSI+PC9yZWN0Pjwvc3ZnPg==";
            }}
          />
        </div>
      );
    }
  };
  
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
      {/* Close button */}
      {!isTimeOut && (
        <div className="absolute top-3 left-3">
          <button 
            onClick={onCancel} 
            className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}
      
      {isTimeOut && (
        <div className="absolute top-3 left-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-red-200 text-red-400">
            ×
          </div>
        </div>
      )}
      
      {/* Content */}
      {renderModalIcon()}
      
      <h3 className="text-xl font-bold mb-2">
        {modalTitle}
      </h3>
      
      {modalContent && (
        <p className="mb-6 text-gray-600">
          {modalContent}
        </p>
      )}
      
      <div className="flex justify-center mt-6">
        {!isTimeOut && (
          <Button
            onClick={onCancel}
            className="mr-4 px-8 py-3 h-auto"
            style={{
              borderRadius: '8px',
            }}
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          type="primary"
          onClick={onConfirm}
          className="px-10 py-3 h-auto font-medium text-white"
          style={{
            backgroundColor: colors.purple,
            borderColor: colors.purple,
            borderRadius: '8px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isTimeOut && (
            <span className="mr-2">⏱️</span>
          )}
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ExamCompletionModal;
