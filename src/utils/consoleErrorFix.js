// Console Error Suppression for Development
// يحل مشكلة "The message port closed before a response was received"

if (process.env.NODE_ENV === 'development') {
  // إخفاء أخطاء message port المزعجة
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    const message = args.join(' ');
    
    // قائمة الأخطاء المراد إخفاؤها
    const suppressedErrors = [
      'The message port closed before a response was received',
      'runtime.lastError',
      'Extension context invalidated',
      'WebSocket connection',
      'Failed to fetch chrome-extension'
    ];
    
    // تحقق من وجود الخطأ في القائمة
    const shouldSuppress = suppressedErrors.some(error => 
      message.toLowerCase().includes(error.toLowerCase())
    );
    
    if (!shouldSuppress) {
      originalError(...args);
    }
  };
  
  console.warn = (...args) => {
    const message = args.join(' ');
    
    const suppressedWarnings = [
      'The message port closed before a response was received',
      'runtime.lastError',
      'Extension context invalidated'
    ];
    
    const shouldSuppress = suppressedWarnings.some(warning => 
      message.toLowerCase().includes(warning.toLowerCase())
    );
    
    if (!shouldSuppress) {
      originalWarn(...args);
    }
  };
}

export default {};