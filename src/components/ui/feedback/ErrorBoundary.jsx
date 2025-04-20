// src/components/ui/feedback/ErrorBoundary.jsx
import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import ErrorHandler from '../../../utils/errors/ErrorHandler';

/**
 * مكون حدود الخطأ
 * يلتقط الأخطاء في شجرة المكونات الفرعية ويعرض واجهة مستخدم بديلة
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * طريقة دورة الحياة لالتقاط الأخطاء أثناء العرض
   * @param {Error} error - الخطأ الملتقط
   * @returns {Object} - حالة الخطأ الجديدة
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * تُستدعى عند حدوث خطأ أثناء العرض
   * @param {Error} error - الخطأ الملتقط
   * @param {Object} errorInfo - معلومات إضافية عن الخطأ
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // تسجيل الخطأ
    ErrorHandler.logError(error, {
      component: this.constructor.name,
      errorInfo,
      props: this.props,
    });
    
    // استدعاء معالج الخطأ المخصص إذا تم توفيره
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * إعادة تعيين حالة الخطأ والمحاولة مرة أخرى
   */
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { 
      children, 
      fallback,
      showDetails = process.env.NODE_ENV === 'development',
    } = this.props;
    
    // إذا كان هناك خطأ، عرض الواجهة البديلة
    if (hasError) {
      // إذا تم توفير واجهة بديلة مخصصة، استخدمها
      if (fallback) {
        return typeof fallback === 'function'
          ? fallback({ error, errorInfo, reset: this.handleRetry })
          : fallback;
      }
      
      // واجهة الخطأ الافتراضية
      return (
        <div className="p-4 flex flex-col items-center justify-center">
          <ErrorMessage
            error={error}
            onRetry={this.handleRetry}
            showDetails={showDetails}
            variant="banner"
          />
          
          {/* عرض تتبع المكدس إذا كان وضع التطوير وتمكين عرض التفاصيل */}
          {showDetails && errorInfo && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg w-full overflow-auto text-sm">
              <details>
                <summary className="font-mono font-bold cursor-pointer outline-none">
                  Component Stack
                </summary>
                <pre className="mt-2 text-xs whitespace-pre-wrap text-red-600 dark:text-red-400">
                  {errorInfo.componentStack}
                </pre>
              </details>
            </div>
          )}
        </div>
      );
    }
    
    // إذا لم يكن هناك خطأ، عرض المكونات الفرعية كالمعتاد
    return children;
  }
}

export default ErrorBoundary;