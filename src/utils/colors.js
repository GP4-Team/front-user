/**
 * لوحة ألوان التطبيق الموحدة
 * تستخدم هذه الألوان في جميع أنحاء التطبيق
 */

export const colors = {
  // الألوان الأساسية
  primary: {
    dark: "#1A237E",
    base: "#3949AB",
    light: "#7986CB",
  },
  secondary: {
    dark: "#E65100",
    base: "#FF9800",
    light: "#FFB74D",
  },
  accent: "#FFC107",

  // ألوان محايدة
  neutral: {
    50: "#F8FAFC",
    100: "#F0F4F8",
    200: "#E5E9F0",
    300: "#D1D8E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#0F1620",
  },
  
  // ألوان النص
  text: {
    dark: "#37474F",
    light: "#FFFFFF",
    muted: "#718096",
  },
  
  // ألوان الخلفية
  background: {
    light: "#F5F7FA",
    dark: "#121212",
    card: {
      light: "#FFFFFF",
      dark: "#1E1E1E",
    }
  },
  
  // ألوان الحالة
  state: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
  }
};

/**
 * الحصول على لون معين حسب وضع السمة (داكن/فاتح)
 * @param {Object} options - خيارات الألوان
 * @param {string} options.light - اللون في الوضع الفاتح
 * @param {string} options.dark - اللون في الوضع الداكن
 * @param {boolean} isDarkMode - هل الوضع الحالي هو الوضع الداكن
 * @returns {string} - اللون المناسب للوضع الحالي
 */
export const getThemeColor = ({ light, dark }, isDarkMode) => {
  return isDarkMode ? dark : light;
};

export default colors;
