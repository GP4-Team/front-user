/**
 * لوحة ألوان التطبيق الموحدة
 * تستخدم هذه الألوان في جميع أنحاء التطبيق
 */

export const colors = {
  // الألوان الأساسية
  primaryDark: "#1A237E",   // أزرق داكن
  primaryBase: "#3949AB",   // أزرق متوسط (اللون الرئيسي)
  primaryLight: "#7986CB",  // أزرق فاتح
  accent: "#FFC107",        // لون التمييز (أصفر)
  
  // الألوان المحايدة
  textDark: "#37474F",      // لون النص الداكن
  backgroundLight: "#F0F4F8", // لون الخلفية الفاتح
  white: "#FFFFFF",         // أبيض
  
  // ألوان الوضع الداكن
  darkBackground: "#121212", // خلفية الوضع الداكن
  darkSurface: "#1E1E1E",    // سطح العناصر في الوضع الداكن
  darkBorder: "#333333",     // لون الحدود في الوضع الداكن
  darkText: "#E0E0E0",       // لون النص في الوضع الداكن
  darkTextMuted: "#AAAAAA"   // لون النص الثانوي في الوضع الداكن
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