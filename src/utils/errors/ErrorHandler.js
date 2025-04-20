// src/utils/errors/ErrorHandler.js
import AppError from './AppError';
import { ERROR_TYPES, AUTH_ERRORS, NETWORK_ERRORS, SERVER_ERRORS } from './ErrorTypes';

/**
 * مدير معالجة الأخطاء المركزي للتطبيق
 * يوفر وظائف لمعالجة الأخطاء وتحويلها إلى أخطاء تطبيق مهيكلة
 */
class ErrorHandler {
  /**
   * تحويل خطأ استجابة Axios إلى AppError
   * @param {Error} error - خطأ Axios
   * @returns {AppError} - خطأ تطبيق
   */
  static handleAxiosError(error) {
    // إذا كان الخطأ هو قطع الاتصال
    if (!error.response) {
      return new AppError(
        'فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
        NETWORK_ERRORS.CONNECTION_FAILED,
        null,
        { originalError: error }
      );
    }
    
    const { status, data } = error.response;
    
    // استخراج رسالة الخطأ من استجابة API إذا كانت متوفرة
    const message = data?.message || data?.error || error.message || 'حدث خطأ غير متوقع';
    
    // تعيين نوع الخطأ استنادًا إلى رمز الحالة
    let errorType;
    
    switch (status) {
      // أخطاء المصادقة
      case 401:
        errorType = AUTH_ERRORS.INVALID_CREDENTIALS;
        break;
      case 403:
        errorType = AUTH_ERRORS.PERMISSION_DENIED;
        break;
        
      // أخطاء البيانات
      case 404:
        errorType = ERROR_TYPES.DATA_NOT_FOUND;
        break;
      case 409:
        errorType = ERROR_TYPES.DATA_ALREADY_EXISTS;
        break;
      case 422:
        errorType = ERROR_TYPES.DATA_VALIDATION_FAILED;
        break;
        
      // أخطاء الخادم
      case 500:
        errorType = SERVER_ERRORS.INTERNAL_ERROR;
        break;
      case 503:
        errorType = SERVER_ERRORS.SERVICE_UNAVAILABLE;
        break;
      case 429:
        errorType = SERVER_ERRORS.RATE_LIMITED;
        break;
        
      // افتراضي
      default:
        errorType = ERROR_TYPES.OTHER_UNKNOWN_ERROR;
    }
    
    // يمكن أن يكون هناك نوع خطأ محدد في البيانات المستلمة
    if (data?.errorType && Object.values(ERROR_TYPES).includes(data.errorType)) {
      errorType = data.errorType;
    }
    
    return new AppError(
      message,
      errorType,
      status,
      { responseData: data },
      error
    );
  }

  /**
   * تحويل خطأ التحقق من صحة النموذج إلى AppError
   * @param {Object} validationErrors - أخطاء التحقق (مثل Formik أو Yup)
   * @param {string} formType - نوع النموذج (مثل 'login', 'register', 'course')
   * @returns {AppError} - خطأ تطبيق
   */
  static handleValidationError(validationErrors, formType = 'form') {
    return new AppError(
      'فشل التحقق من صحة النموذج',
      ERROR_TYPES.DATA_VALIDATION_FAILED,
      422,
      { validationErrors, formType }
    );
  }

  /**
   * تحويل خطأ المصادقة إلى AppError
   * @param {Error} error - خطأ المصادقة
   * @param {string} operation - عملية المصادقة (مثل 'login', 'register', 'logout')
   * @returns {AppError} - خطأ تطبيق
   */
  static handleAuthError(error, operation = 'auth') {
    // إذا كان الخطأ بالفعل AppError، نعيده كما هو
    if (error instanceof AppError) {
      return error;
    }
    
    // محاولة تحديد نوع خطأ المصادقة
    let errorType = AUTH_ERRORS.INVALID_CREDENTIALS;
    let status = 401;
    
    // استخراج رسالة الخطأ
    const message = error.message || 'حدث خطأ أثناء المصادقة';
    
    // تحديد نوع الخطأ بناءً على الرسالة
    if (message.includes('expired') || message.includes('token')) {
      errorType = AUTH_ERRORS.TOKEN_EXPIRED;
    } else if (message.includes('verification') || message.includes('verify')) {
      errorType = AUTH_ERRORS.EMAIL_NOT_VERIFIED;
    } else if (message.includes('locked')) {
      errorType = AUTH_ERRORS.ACCOUNT_LOCKED;
    } else if (message.includes('permission') || message.includes('access')) {
      errorType = AUTH_ERRORS.PERMISSION_DENIED;
      status = 403;
    } else if (operation === 'register') {
      errorType = AUTH_ERRORS.REGISTRATION_FAILED;
    }
    
    return new AppError(
      message,
      errorType,
      status,
      { operation },
      error
    );
  }

  /**
   * معالجة الأخطاء العامة وتحويلها إلى AppError
   * @param {Error} error - الخطأ المراد معالجته
   * @param {string} defaultMessage - رسالة افتراضية إذا لم يكن هناك رسالة
   * @returns {AppError} - خطأ تطبيق
   */
  static handleError(error, defaultMessage = 'حدث خطأ غير متوقع') {
    // إذا كان الخطأ بالفعل AppError، نعيده كما هو
    if (error instanceof AppError) {
      return error;
    }
    
    // استخراج رسالة الخطأ
    const message = error.message || defaultMessage;
    
    // إنشاء AppError جديد
    return new AppError(
      message,
      ERROR_TYPES.OTHER_UNKNOWN_ERROR,
      null,
      null,
      error
    );
  }

  /**
   * إنشاء خطأ محدد للدورات التعليمية
   * @param {string} message - رسالة الخطأ
   * @param {string} type - نوع الخطأ (من COURSE_ERRORS)
   * @param {Object} data - بيانات إضافية
   * @returns {AppError} - خطأ تطبيق
   */
  static createCourseError(message, type, data = null) {
    return new AppError(message, type, null, data);
  }

  /**
   * إنشاء خطأ محدد للامتحانات
   * @param {string} message - رسالة الخطأ
   * @param {string} type - نوع الخطأ (من EXAM_ERRORS)
   * @param {Object} data - بيانات إضافية
   * @returns {AppError} - خطأ تطبيق
   */
  static createExamError(message, type, data = null) {
    return new AppError(message, type, null, data);
  }

  /**
   * إنشاء خطأ محدد للدفع
   * @param {string} message - رسالة الخطأ
   * @param {string} type - نوع الخطأ (من PAYMENT_ERRORS)
   * @param {Object} data - بيانات إضافية
   * @returns {AppError} - خطأ تطبيق
   */
  static createPaymentError(message, type, data = null) {
    return new AppError(message, type, null, data);
  }

  /**
   * استخراج رسالة خطأ مناسبة للعرض للمستخدم
   * @param {Error|AppError} error - الخطأ المراد معالجته
   * @param {Object} options - خيارات العرض
   * @param {string} options.language - لغة العرض ('ar' أو 'en')
   * @param {boolean} options.includeDetails - هل يتم تضمين تفاصيل إضافية؟
   * @returns {string} - رسالة مناسبة للعرض للمستخدم
   */
  static getUserFriendlyMessage(error, { language = 'ar', includeDetails = false } = {}) {
    // تحويل الخطأ إلى AppError إذا لم يكن كذلك
    const appError = error instanceof AppError ? error : this.handleError(error);
    
    // رسائل أخطاء مخصصة للمستخدم
    const userMessages = {
      ar: {
        // أخطاء المصادقة
        [AUTH_ERRORS.INVALID_CREDENTIALS]: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
        [AUTH_ERRORS.TOKEN_EXPIRED]: 'انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.',
        [AUTH_ERRORS.ACCOUNT_LOCKED]: 'تم قفل حسابك. يرجى الاتصال بالدعم.',
        [AUTH_ERRORS.EMAIL_NOT_VERIFIED]: 'لم يتم التحقق من بريدك الإلكتروني. يرجى التحقق من بريدك الإلكتروني.',
        [AUTH_ERRORS.PERMISSION_DENIED]: 'ليس لديك إذن للوصول إلى هذه الميزة.',
        [AUTH_ERRORS.REGISTRATION_FAILED]: 'فشل التسجيل. يرجى التحقق من المعلومات المقدمة والمحاولة مرة أخرى.',
        
        // أخطاء الشبكة
        [NETWORK_ERRORS.CONNECTION_FAILED]: 'فشل الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.',
        [NETWORK_ERRORS.TIMEOUT]: 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.',
        [NETWORK_ERRORS.SERVER_UNAVAILABLE]: 'الخادم غير متاح حاليًا. يرجى المحاولة مرة أخرى لاحقًا.',
        
        // أخطاء الخادم
        [SERVER_ERRORS.INTERNAL_ERROR]: 'حدث خطأ داخلي في الخادم. يرجى المحاولة مرة أخرى لاحقًا.',
        [SERVER_ERRORS.SERVICE_UNAVAILABLE]: 'الخدمة غير متاحة حاليًا. يرجى المحاولة مرة أخرى لاحقًا.',
        [SERVER_ERRORS.MAINTENANCE]: 'النظام قيد الصيانة. يرجى المحاولة مرة أخرى لاحقًا.',
        [SERVER_ERRORS.RATE_LIMITED]: 'لقد وصلت إلى الحد الأقصى من الطلبات. يرجى المحاولة مرة أخرى بعد قليل.',
        
        // الافتراضي
        'default': 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.',
      },
      en: {
        // أخطاء المصادقة
        [AUTH_ERRORS.INVALID_CREDENTIALS]: 'Username or password is incorrect.',
        [AUTH_ERRORS.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
        [AUTH_ERRORS.ACCOUNT_LOCKED]: 'Your account has been locked. Please contact support.',
        [AUTH_ERRORS.EMAIL_NOT_VERIFIED]: 'Your email has not been verified. Please check your email.',
        [AUTH_ERRORS.PERMISSION_DENIED]: 'You do not have permission to access this feature.',
        [AUTH_ERRORS.REGISTRATION_FAILED]: 'Registration failed. Please check the information provided and try again.',
        
        // أخطاء الشبكة
        [NETWORK_ERRORS.CONNECTION_FAILED]: 'Failed to connect to the server. Please check your internet connection.',
        [NETWORK_ERRORS.TIMEOUT]: 'Connection timed out. Please try again.',
        [NETWORK_ERRORS.SERVER_UNAVAILABLE]: 'The server is currently unavailable. Please try again later.',
        
        // أخطاء الخادم
        [SERVER_ERRORS.INTERNAL_ERROR]: 'An internal server error occurred. Please try again later.',
        [SERVER_ERRORS.SERVICE_UNAVAILABLE]: 'The service is currently unavailable. Please try again later.',
        [SERVER_ERRORS.MAINTENANCE]: 'The system is undergoing maintenance. Please try again later.',
        [SERVER_ERRORS.RATE_LIMITED]: 'You have reached the maximum number of requests. Please try again shortly.',
        
        // الافتراضي
        'default': 'An error occurred. Please try again later.',
      }
    };
    
    // الحصول على الرسائل المناسبة للغة
    const messages = language === 'ar' ? userMessages.ar : userMessages.en;
    
    // البحث عن رسالة مخصصة لنوع الخطأ
    let message = messages[appError.type] || messages.default;
    
    // إضافة تفاصيل إضافية إذا طُلب ذلك
    if (includeDetails && appError.message && appError.message !== message) {
      const detailText = language === 'ar' ? 'التفاصيل: ' : 'Details: ';
      message += ` ${detailText}${appError.message}`;
    }
    
    return message;
  }

  /**
   * تسجيل الأخطاء في وحدة التحكم وإرسالها إلى خدمة تتبع الأخطاء (عند الحاجة)
   * @param {Error|AppError} error - الخطأ المراد تسجيله
   * @param {Object} context - سياق الخطأ
   */
  static logError(error, context = {}) {
    // تحويل الخطأ إلى AppError إذا لم يكن كذلك
    const appError = error instanceof AppError ? error : this.handleError(error);
    
    // مستوى السجل استنادًا إلى خطورة الخطأ
    const getLogLevel = () => {
      const category = appError.getCategory();
      
      if (category === 'network' && appError.isRetryable()) {
        return 'warn'; // أخطاء الشبكة القابلة لإعادة المحاولة ليست حرجة
      }
      
      if (category === 'server' || category === 'other') {
        return 'error'; // أخطاء الخادم والأخطاء غير المصنفة عادةً ما تكون خطيرة
      }
      
      return 'warn'; // المستوى الافتراضي
    };
    
    const logLevel = getLogLevel();
    
    // تحضير بيانات السجل
    const logData = {
      ...appError.toJSON(),
      context,
      loggedAt: new Date().toISOString(),
    };
    
    // تسجيل في وحدة التحكم
    if (logLevel === 'error') {
      console.error('[APP ERROR]', logData);
    } else {
      console.warn('[APP WARNING]', logData);
    }
    
    // يمكن إضافة منطق لإرسال الخطأ إلى خدمة تتبع الأخطاء هنا
    // مثال: Sentry، LogRocket، إلخ.
    
    // مثال على إرسال إلى Sentry إذا كان مثبتًا
    /*
    if (typeof Sentry !== 'undefined') {
      Sentry.withScope((scope) => {
        scope.setExtras({
          ...logData,
        });
        Sentry.captureException(appError.originalError || appError);
      });
    }
    */
  }
}

export default ErrorHandler;