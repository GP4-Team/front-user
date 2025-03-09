// src/components/StatusModal.jsx
import React from 'react';
import PropTypes from 'prop-types';

const StatusModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info', // 'info', 'success', 'error', 'warning'
  icon,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  rtl = true
}) => {
  if (!isOpen) return null;
  
  // Determine title color based on type
  let titleColor = 'text-gray-800';
  if (type === 'error') titleColor = 'text-red-500';
  if (type === 'success') titleColor = 'text-green-500';
  if (type === 'warning') titleColor = 'text-yellow-500';
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-md p-8 w-11/12 max-w-md shadow-lg text-center ${rtl ? 'rtl' : 'ltr'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className={`absolute ${rtl ? 'left-4' : 'right-4'} top-4 text-2xl bg-transparent border-none cursor-pointer text-gray-700`}
        >
          ×
        </button>
        
        {icon && (
          <div className="mb-6">
            {icon}
          </div>
        )}
        
        <h2 className={`text-xl ${titleColor} mb-4`}>{title}</h2>
        <p className="text-gray-700 mb-8">{message}</p>
        
        <div className="flex justify-center gap-4">
          {secondaryAction && secondaryActionText && (
            <button 
              onClick={secondaryAction}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {secondaryActionText}
            </button>
          )}
          
          {primaryAction && primaryActionText && (
            <button 
              onClick={primaryAction}
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            >
              {primaryActionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

StatusModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  icon: PropTypes.node,
  primaryAction: PropTypes.func,
  primaryActionText: PropTypes.string,
  secondaryAction: PropTypes.func,
  secondaryActionText: PropTypes.string,
  rtl: PropTypes.bool
};

export default StatusModal;