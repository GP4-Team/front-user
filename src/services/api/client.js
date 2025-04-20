// src/services/api/client.js
import axios from 'axios';

// استخراج URL الأساسي من متغيرات البيئة
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.eduara.edu/v1';

// إنشاء instance من axios مع الإعدادات الأساسية
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// اعتراض الطلبات لإضافة التوكن
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// اعتراض الاستجابات للتعامل مع الأخطاء العامة
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // التعامل مع أخطاء مختلفة بشكل منظم
    const { response } = error;
    
    if (response?.status === 401) {
      // إذا كان الخطأ 401 (غير مصرح)، قم بتسجيل الخروج
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/auth?message=session_expired';
    }
    
    if (response?.status === 500) {
      // إعادة توجيه إلى صفحة خطأ الخادم
      window.location.href = '/server-error';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;