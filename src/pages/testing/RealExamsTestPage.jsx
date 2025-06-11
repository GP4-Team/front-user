// Test page for Real Examination APIs
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { examinationService } from '../../services/api/index';
import Navbar from '../../components/navigation/Navbar';

/**
 * Test page for Real Examination APIs
 * Tests all three examination endpoints
 */
const RealExamsTestPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const isArabic = language === 'ar';

  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // Test cases for the three APIs
  const testCases = [
    {
      id: 'statistics',
      name: isArabic ? 'اختبار إحصائيات الامتحانات' : 'Test Exam Statistics',
      description: isArabic ? 'اختبار API إحصائيات الامتحانات' : 'Test exam statistics API',
      endpoint: '/examination/exam-statistics',
      method: 'GET'
    },
    {
      id: 'available',
      name: isArabic ? 'اختبار الامتحانات المتاحة' : 'Test Available Exams',
      description: isArabic ? 'اختبار API الامتحانات المتاحة' : 'Test available exams API',
      endpoint: '/examination/available-exams',
      method: 'GET'
    },
    {
      id: 'completed',
      name: isArabic ? 'اختبار الامتحانات المكتملة' : 'Test Completed Exams',
      description: isArabic ? 'اختبار API الامتحانات المكتملة' : 'Test completed exams API',
      endpoint: '/examination/completed-exams',
      method: 'GET'
    },
    {
      id: 'all-data',
      name: isArabic ? 'اختبار جميع البيانات' : 'Test All Data',
      description: isArabic ? 'اختبار جلب جميع بيانات الامتحانات' : 'Test fetching all exam data',
      endpoint: 'Combined API calls',
      method: 'Multiple'
    }
  ];

  // Test functions
  const testStatistics = async () => {
    try {
      const result = await examinationService.getExamStatistics();
      return { 
        success: result.success, 
        data: result.data, 
        error: result.error,
        message: result.success ? 'Statistics retrieved successfully' : 'Failed to retrieve statistics' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || error, 
        message: 'Error retrieving statistics' 
      };
    }
  };

  const testAvailableExams = async () => {
    try {
      const result = await examinationService.getAvailableExams();
      return { 
        success: result.success, 
        data: result.data, 
        error: result.error,
        message: result.success ? `Available exams retrieved successfully (${result.data?.length || 0} exams)` : 'Failed to retrieve available exams' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || error, 
        message: 'Error retrieving available exams' 
      };
    }
  };

  const testCompletedExams = async () => {
    try {
      const result = await examinationService.getCompletedExams();
      return { 
        success: result.success, 
        data: result.data, 
        pagination: result.pagination,
        summary: result.summary,
        error: result.error,
        message: result.success ? `Completed exams retrieved successfully (${result.data?.length || 0} exams)` : 'Failed to retrieve completed exams' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || error, 
        message: 'Error retrieving completed exams' 
      };
    }
  };

  const testAllData = async () => {
    try {
      const result = await examinationService.getAllExamsData();
      
      const summary = {
        statisticsLoaded: !!result.data?.statistics,
        availableExamsCount: result.data?.availableExams?.length || 0,
        completedExamsCount: result.data?.completedExams?.length || 0,
        errorsCount: result.errors?.length || 0,
        failedApis: result.errors?.map(e => e.type) || []
      };
      
      return { 
        success: result.success, 
        data: result.data,
        summary,
        errors: result.errors,
        message: `All data retrieved. Statistics: ${summary.statisticsLoaded ? '✅' : '❌'}, Available: ${summary.availableExamsCount}, Completed: ${summary.completedExamsCount}, Errors: ${summary.errorsCount}` 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || error, 
        message: 'Error retrieving all exam data' 
      };
    }
  };

  // Execute test
  const runTest = async (testId) => {
    setIsLoading(true);
    setSelectedTest(testId);

    let result;
    switch (testId) {
      case 'statistics':
        result = await testStatistics();
        break;
      case 'available':
        result = await testAvailableExams();
        break;
      case 'completed':
        result = await testCompletedExams();
        break;
      case 'all-data':
        result = await testAllData();
        break;
      default:
        result = { success: false, message: 'Unknown test case' };
    }

    setTestResults(prev => ({
      ...prev,
      [testId]: {
        ...result,
        timestamp: new Date().toLocaleString(isArabic ? 'ar-EG' : 'en-US')
      }
    }));

    setIsLoading(false);
    setSelectedTest(null);
  };

  // Run all tests
  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTest(testCase.id);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  // Get result icon
  const getResultIcon = (result) => {
    if (!result) return <AlertCircle size={20} className="text-gray-400" />;
    return result.success 
      ? <CheckCircle size={20} className="text-green-500" />
      : <AlertCircle size={20} className="text-red-500" />;
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'} ${isRTL ? 'rtl font-tajawal' : 'ltr'}`}>
        <Navbar />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-[#37474F] dark:text-white mb-4">
                {isArabic ? 'تسجيل الدخول مطلوب' : 'Login Required'}
              </h2>
              <p className="text-[#3949AB] dark:text-[#7986CB]">
                {isArabic ? 'يجب تسجيل الدخول لاختبار APIs الامتحانات' : 'You need to login to test examination APIs'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F0F4F8]'} ${isRTL ? 'rtl font-tajawal' : 'ltr'}`}>
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className={`text-center mb-8`}>
            <div className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
              <RefreshCw size={32} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#3949AB]`} />
              <h1 className="text-3xl font-bold text-[#37474F] dark:text-white">
                {isArabic ? 'اختبار APIs الامتحانات الحقيقية' : 'Real Examination APIs Testing'}
              </h1>
              <CheckCircle size={32} className={`${isRTL ? 'mr-3' : 'ml-3'} text-[#4CAF50]`} />
            </div>
            <p className="text-lg text-[#3949AB] dark:text-[#7986CB] max-w-3xl mx-auto">
              {isArabic 
                ? 'اختبر APIs الامتحانات الحقيقية للتأكد من عملها بشكل صحيح'
                : 'Test real examination APIs to ensure they are working correctly'
              }
            </p>
          </div>

          {/* User Info */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-[#37474F] dark:text-white mb-2">
              {isArabic ? 'معلومات المستخدم' : 'User Information'}:
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#3949AB] dark:text-[#7986CB]">
                  {isArabic ? 'الاسم:' : 'Name:'}
                </span>
                <span className="ml-2 text-[#37474F] dark:text-white">
                  {user?.name || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[#3949AB] dark:text-[#7986CB]">
                  {isArabic ? 'رقم المستخدم:' : 'User ID:'}
                </span>
                <span className="ml-2 text-[#37474F] dark:text-white">
                  {user?.id || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className={`flex gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={runAllTests}
              disabled={isLoading}
              className="bg-[#3949AB] hover:bg-[#2E3192] text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
              ) : (
                isArabic ? 'تشغيل جميع الاختبارات' : 'Run All Tests'
              )}
            </button>
            <button
              onClick={() => setTestResults({})}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              {isArabic ? 'مسح النتائج' : 'Clear Results'}
            </button>
            <button
              onClick={() => window.open('/exams', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              {isArabic ? 'فتح صفحة الامتحانات' : 'Open Exams Page'}
            </button>
          </div>

          {/* Test Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testCases.map((testCase) => (
              <div key={testCase.id} className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md overflow-hidden">
                {/* Test Header */}
                <div className="bg-gradient-to-r from-[#3949AB] to-[#5E35B1] p-4 text-white">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-semibold">{testCase.name}</h3>
                    {getResultIcon(testResults[testCase.id])}
                  </div>
                  <p className="text-sm opacity-90 mt-1">{testCase.description}</p>
                </div>

                {/* Test Content */}
                <div className="p-4">
                  <div className="mb-4">
                    <div className="text-xs text-[#3949AB] dark:text-[#7986CB] mb-1">
                      {isArabic ? 'المسار:' : 'Endpoint:'}
                    </div>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm block">
                      {testCase.method} {testCase.endpoint}
                    </code>
                  </div>

                  {/* Test Button */}
                  <button
                    onClick={() => runTest(testCase.id)}
                    disabled={isLoading && selectedTest === testCase.id}
                    className="w-full bg-[#F0F4F8] dark:bg-[#2D2D2D] hover:bg-[#E1E5E9] dark:hover:bg-[#3D3D3D] text-[#3949AB] dark:text-[#7986CB] font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading && selectedTest === testCase.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#3949AB] mx-auto"></div>
                    ) : (
                      isArabic ? 'تشغيل الاختبار' : 'Run Test'
                    )}
                  </button>

                  {/* Test Result */}
                  {testResults[testCase.id] && (
                    <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} mb-2`}>
                        {getResultIcon(testResults[testCase.id])}
                        <span className="ml-2 font-medium text-[#37474F] dark:text-white">
                          {testResults[testCase.id].success 
                            ? (isArabic ? 'نجح' : 'Success')
                            : (isArabic ? 'فشل' : 'Failed')
                          }
                        </span>
                      </div>
                      <p className="text-sm text-[#37474F] dark:text-white mb-2">
                        {testResults[testCase.id].message}
                      </p>
                      <div className="text-xs text-[#3949AB] dark:text-[#7986CB]">
                        {testResults[testCase.id].timestamp}
                      </div>
                      
                      {/* Show data preview if successful */}
                      {testResults[testCase.id].success && testResults[testCase.id].data && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs text-[#3949AB] dark:text-[#7986CB] font-medium">
                            {isArabic ? 'عرض البيانات المُستلمة' : 'View Received Data'}
                          </summary>
                          <div className="mt-2 text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto max-h-40">
                            <div className="mb-2 font-semibold text-green-600">
                              ✅ {isArabic ? 'البيانات:' : 'Data:'}
                            </div>
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(testResults[testCase.id].data, null, 2)}
                            </pre>
                            
                            {/* Show summary for all-data test */}
                            {testCase.id === 'all-data' && testResults[testCase.id].summary && (
                              <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
                                <div className="font-semibold text-blue-600">
                                  📊 {isArabic ? 'الملخص:' : 'Summary:'}
                                </div>
                                <pre className="whitespace-pre-wrap">
                                  {JSON.stringify(testResults[testCase.id].summary, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </details>
                      )}

                      {/* Show error details if failed */}
                      {!testResults[testCase.id].success && testResults[testCase.id].error && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs text-red-500">
                            {isArabic ? 'تفاصيل الخطأ' : 'Error Details'}
                          </summary>
                          <pre className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-2 rounded overflow-auto max-h-32">
                            {JSON.stringify(testResults[testCase.id].error, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* API Documentation */}
          <div className="mt-8 bg-white dark:bg-[#1E1E1E] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#37474F] dark:text-white mb-4">
              {isArabic ? 'توثيق الـ APIs' : 'API Documentation'}
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-[#3949AB]">Headers Required:</strong>
                <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
{`{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Bearer [token]",
  "Accept-Language": "ar" // or "en"
}`}
                </pre>
              </div>
              <div>
                <strong className="text-[#3949AB]">Authentication:</strong> All APIs require valid Bearer token
              </div>
              <div>
                <strong className="text-[#3949AB]">Rate Limiting:</strong> Standard API rate limits apply
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealExamsTestPage;