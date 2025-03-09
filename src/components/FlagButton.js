import React from 'react';
import PropTypes from 'prop-types';

const FlagButton = ({ 
  isFlagged, 
  onClick, 
  rtl = true 
}) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-center ${isFlagged ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-700'} ${isFlagged ? 'border-purple-600' : 'border-gray-600'} border-2 rounded-lg px-4 py-1 text-sm transition-all hover:${isFlagged ? 'bg-purple-700' : 'bg-gray-100'}`}
    >
      <span className={`${rtl ? 'ml-2' : 'mr-2'}`}>🚩</span>
      {rtl ? 'الإبلاغ عن مشكلة' : 'Report Issue'}
    </button>
  );
};

FlagButton.propTypes = {
  isFlagged: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  rtl: PropTypes.bool
};

export default FlagButton;