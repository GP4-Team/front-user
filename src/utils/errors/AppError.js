// src/utils/errors/AppError.js
import { ERROR_TYPES, OTHER_ERRORS } from './ErrorTypes';

/**
 * فئة الخطأ الأساسية للتطبيق
 * تستخدم لإنشاء أخطاء منظمة مع معلومات مفيدة
 */
class AppError extends Error {
  /**
   * إنشاء خطأ جديد
   * @param {string} message - رسالة الخطأ
   * @param {string} type - نوع الخطأ (من ERROR_TYPES)
   * @param {number|null} status - رمز حالة HTTP (إن وجد)
   * @param {Object|null} data - بيانات إضافية متعلقة بالخطأ
   * @param {Error|null} originalError - الخطأ الأصلي (إن وجد)
   */
  constructor(message, type = OTHER_ERRORS.UNKNOWN_ERROR, status = null, data = null, originalError = null) {
    super(message);
    
    this.name = 'AppError';
    this.type = type;
    this.status = status;
    this.data = data;
    this.originalError = originalError;
    
    // تسجيل وقت حدوث الخطأ
    this.timestamp = new Date().toISOString();
    
    // للحصول على تتبع الكود (stack trace) الصحيح في Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  /**
   * إنشاء نسخة من الخطأ بمعلومات إضافية
   * مفيدة لإضافة سياق إضافي للخطأ
   * @param {Object} additionalInfo - معلومات إضافية لإضافتها
   * @returns {AppError} - خطأ جديد مع المعلومات المضافة
   */
  withInfo(additionalInfo) {
    const newData = {
      ...this.data,
      ...additionalInfo
    };
    
    return new AppError(
      this.message,
      this.type,
      this.status,
      newData,
      this.originalError
    );
  }

  /**
   * تحويل الخطأ إلى كائن JSON قياسي
   * @returns {Object} - تمثيل JSON للخطأ
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      status: this.status,
      timestamp: this.timestamp,
      data: this.data,
      stack: this.stack,
      originalError: this.originalError ? {
        name: this.originalError.name,
        message: this.originalError.message,
        stack: this.originalError.stack,
      } : null,
    };
  }

  /**
   * تصنيف الخطأ استنادًا إلى نوعه
   * @returns {string} - تصنيف الخطأ: 'auth', 'network', 'server', 'data', 'course', 'exam', 'payment', 'file', or 'other'
   */
  getCategory() {
    const type = this.type;
    
    if (type.startsWith('AUTH_')) return 'auth';
    if (type.startsWith('NETWORK_')) return 'network';
    if (type.startsWith('SERVER_')) return 'server';
    if (type.startsWith('DATA_')) return 'data';
    if (type.startsWith('COURSE_')) return 'course';
    if (type.startsWith('EXAM_')) return 'exam';
    if (type.startsWith('PAYMENT_')) return 'payment';
    if (type.startsWith('FILE_')) return 'file';
    
    return 'other';
  }

  /**
   * تحديد ما إذا كان يمكن للمستخدم إصلاح الخطأ أم لا
   * @returns {boolean} - هل يمكن للمستخدم إصلاح المشكلة؟
   */
  isUserResolvable() {
    const category = this.getCategory();
    
    // أخطاء يمكن للمستخدم إصلاحها عادةً
    const userResolvableCategories = ['auth', 'data', 'payment', 'file'];
    if (userResolvableCategories.includes(category)) return true;
    
    // حالات خاصة
    if (this.type === 'NETWORK_CONNECTION_FAILED') return true;
    if (this.type === 'EXAM_TIME_EXPIRED') return false;
    
    // افتراضيًا، الأخطاء الشبكية والخادم غير قابلة للإصلاح من قبل المستخدم
    return false;
  }

  /**
   * تحديد ما إذا كان يجب إعادة محاولة الإجراء تلقائيًا
   * @returns {boolean} - هل يمكن إعادة المحاولة تلقائيًا؟
   */
  isRetryable() {
    const nonRetryableTypes = [
      'AUTH_PERMISSION_DENIED',
      'DATA_ALREADY_EXISTS',
      'DATA_DUPLICATE_ENTRY',
      'COURSE_ALREADY_ENROLLED',
      'EXAM_ALREADY_SUBMITTED',
      'PAYMENT_ALREADY_PAID',
      'FILE_SIZE_EXCEEDED',
      'FILE_INVALID_TYPE',
    ];
    
    if (nonRetryableTypes.includes(this.type)) return false;
    
    // أخطاء الشبكة تكون عادة قابلة لإعادة المحاولة
    if (this.type.startsWith('NETWORK_')) return true;
    
    // بعض أخطاء الخادم قابلة لإعادة المحاولة
    if (this.type === 'SERVER_SERVICE_UNAVAILABLE' || this.type === 'SERVER_RATE_LIMITED') {
      return true;
    }
    
    return false;
  }
}

export default AppError;