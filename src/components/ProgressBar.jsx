import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ 
  progress, 
  label, 
  rtl = true,
  darkMode = false
}) => {
  return (
    <div>
      {label && <div className={`text-sm ${rtl ? 'text-left' : 'text-right'} ${darkMode ? 'text-white' : 'text-gray-700'} mb-1`}>{progress}%</div>}
      <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md overflow-hidden`}>
        <div 
          className="h-full bg-purple-600 rounded-md transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.bool,
  rtl: PropTypes.bool,
  darkMode: PropTypes.bool
};

export default ProgressBar;