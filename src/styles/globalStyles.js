const globalStyles = {
    colors: {
      // Primary colors
      primaryDark: "#546E7A",
      primaryBase: "#607D8B",
      primaryLight: "#78909C",
      primaryLightest: "#B0BEC5",
      
      // Accent colors
      accentPrimary: "#A5D6A7",
      accentSecondary: "#81C784",
      
      // Neutral colors
      textDark: "#455A64",
      backgroundLight: "#ECEFF1",
      
      // Additional UI colors
      white: "#FFFFFF",
      error: "#FF5252",
      success: "#4CAF50",
      warning: "#FFC107",
      purple: "#9C27B0"
    },
    
    fonts: {
      // Support for Arabic and English
      primary: "'Cairo', 'Roboto', sans-serif",
      sizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        xxl: '2rem'
      }
    },
    
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem'
    },
    
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      circle: '50%'
    },
    
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      md: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
    },
    
    rtl: true, // Default to RTL for Arabic
    darkMode: false // Default to light mode
  };
  
  export default globalStyles;