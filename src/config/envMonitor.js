/**
 * Environment Monitor
 * يراقب تغييرات الـ environment variables ويعيد تحميل الإعدادات تلقائياً
 */

import { logApiConfig } from './api.config';

class EnvironmentMonitor {
  constructor() {
    this.lastApiUrl = null;
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }

  /**
   * بدء مراقبة تغييرات البيئة
   */
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.lastApiUrl = process.env.REACT_APP_API_BASE_URL;
    
    console.log('🔍 Starting environment monitoring...');
    console.log('📍 Current API URL:', this.lastApiUrl);
    
    // فحص التغييرات كل 3 ثواني في development
    if (process.env.NODE_ENV === 'development') {
      this.monitoringInterval = setInterval(() => {
        this.checkForChanges();
      }, 3000);
      
      // إضافة listener لـ focus event (عند العودة للتطبيق)
      window.addEventListener('focus', () => {
        this.checkForChanges();
      });
    }
  }

  /**
   * إيقاف مراقبة البيئة
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    console.log('⏹️ Environment monitoring stopped');
  }

  /**
   * فحص التغييرات في متغيرات البيئة
   */
  checkForChanges() {
    const currentApiUrl = process.env.REACT_APP_API_BASE_URL;
    
    if (currentApiUrl !== this.lastApiUrl) {
      console.log('🔄 Environment variable changed detected!');
      console.log('📍 Previous:', this.lastApiUrl);
      console.log('📍 Current:', currentApiUrl);
      
      this.lastApiUrl = currentApiUrl;
      
      // إعادة عرض إعدادات الـ API الجديدة
      logApiConfig();
      
      // إشعار المطور بالتغيير
      this.notifyDeveloper();
      
      // إعادة تحميل الصفحة بعد 2 ثانية (في development فقط)
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          console.log('🔄 Reloading application to apply new environment...');
          window.location.reload();
        }, 2000);
      }
    }
  }

  /**
   * إشعار المطور بالتغيير
   */
  notifyDeveloper() {
    // Log في الكونسول
    console.group('🚨 Environment Change Detected');
    console.log('The API base URL has been updated.');
    console.log('Application will reload automatically in 2 seconds.');
    console.log('To disable auto-reload, set REACT_APP_AUTO_RELOAD=false');
    console.groupEnd();
    
    // إشعار في الواجهة (اختياري)
    if (window.Notification && Notification.permission === 'granted') {
      new Notification('LearnNova Development', {
        body: 'Environment variables updated. Reloading...',
        icon: '/favicon.ico'
      });
    }
  }

  /**
   * فحص صحة متغيرات البيئة
   */
  validateEnvironment() {
    const requiredVars = ['REACT_APP_API_BASE_URL'];
    const missingVars = [];
    
    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    });
    
    if (missingVars.length > 0) {
      console.warn('⚠️ Missing environment variables:', missingVars);
      return false;
    }
    
    console.log('✅ All required environment variables are present');
    return true;
  }

  /**
   * عرض معلومات البيئة الحالية
   */
  logCurrentEnvironment() {
    console.group('🌍 Current Environment');
    console.log('Node Environment:', process.env.NODE_ENV);
    console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('API Timeout:', process.env.REACT_APP_API_TIMEOUT);
    console.log('Custom Env:', process.env.REACT_APP_ENV);
    console.log('Monitoring Status:', this.isMonitoring ? 'Active' : 'Inactive');
    console.groupEnd();
  }
}

// إنشاء instance واحد
const envMonitor = new EnvironmentMonitor();

// بدء المراقبة تلقائياً في development
if (process.env.NODE_ENV === 'development') {
  envMonitor.startMonitoring();
  envMonitor.validateEnvironment();
  envMonitor.logCurrentEnvironment();
}

export default envMonitor;