// src/pages/testing/AIPortalTestPage.jsx
import React, { useState } from 'react';
import { Brain, TestTube, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import weaknessService from '../../services/api/weakness.service';
import Navbar from '../../components/navigation/Navbar';

/**
 * Test page for AI Portal APIs
 * Used for debugging and testing the weakness analysis endpoints
 */
const AIPortalTestPage = () => {
  const { language, isRTL } = useLanguage();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const isArabic = language === 'ar';

  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // Test cases
  const testCases = [
    {
      id: 'weakness-portal',
      name: isArabic ? 'اختبار بوابة نقاط الضعف' : 'Test Weakness Portal',
      description: isArabic ? 'اختبار API بيانات نقاط الضعف' : 'Test weakness data API',
      endpoint: '/student/ai/weakness/portal',
      method: 'GET'
    },
    {
      id: 'recommendations-history',
      name: isArabic ? 'اختبار تاريخ التوصيات' : 'Test Recommendations History',
      description: isArabic ? 'اختبار API توصيات الامتحانات' : 'Test quiz recommendations API',
      endpoint: '/student/ai/quiz/recommendations/history',
      method: 'GET'
    },
    {
      id: 'recommendation-explain',
      name: isArabic ? 'اختبار شرح التوصية' : 'Test Recommendation Explanation',
      description: isArabic ? 'اختبار API شرح التوصية المحددة' : 'Test recommendation explanation API',
      endpoint: '/student/ai/quiz/explain/{recommendationId}',
      method: 'GET'
    },
    {
      id: 'portal-data',
      name: isArabic ? 'اختبار البيانات المجمعة' : 'Test Combined Portal Data',
      description: isArabic ? 'اختبار جلب جميع البيانات معاً' : 'Test fetching all data together',
      endpoint: 'Combined API calls',
      method: 'Multiple'
    }
  ];

  // Test functions
  const testWeaknessPortal = async () => {
    try {
      const result = await weaknessService.getWeaknessPortal();
      return { success: true, data: result, message: 'Weakness portal data retrieved successfully' };
    } catch (error) {
      return { success: false, error: error.message || error, message: 'Failed to retrieve weakness data' };
    }
  };

  const testRecommendationsHistory = async () => {
    try {
      const result = await weaknessService.getQuizRecommendationsHistory();
      return { success: true, data: result, message: 'Recommendations history retrieved successfully' };
    } catch (error) {
      return { success: false, error: error.message || error, message: 'Failed to retrieve recommendations' };
    }
  };

  const testRecommendationExplanation = async () => {
    try {
      // First get recommendations to find a valid ID
      const recommendations = await weaknessService.getQuizRecommendationsHistory();
      if (recommendations.success && recommendations.data.recommendations.length > 0) {
        const recommendationId = recommendations.data.recommendations[0].recommendation_id;
        const result = await weaknessService.getRecommendationExplanation(recommendationId);
        return { success: true, data: result, message: `Explanation for ${recommendationId} retrieved successfully` };
      } else {
        return { success: false, message: 'No recommendations available to test explanation' };
      }
    } catch (error) {
      return { success: false, error: error.message || error, message: 'Failed to retrieve recommendation explanation' };
    }
  };

  const testPortalData = async () => {
    try {
      const result = await weaknessService.getPortalData();
      
      // Format result for better display
      const displayResult = {
        ...result,
        summary: {
          hasWeaknessData: !!result.weakness,
          hasRecommendations: result.recommendations && result.recommendations.length > 0,
          totalRecommendations: result.recommendations ? result.recommendations.length : 0,
          apiErrorsCount: result.errors ? result.errors.length : 0,
          failedApis: result.errors ? result.errors.map(e => e.type) : []
        }
      };
      
      return { 
        success: true, 
        data: displayResult, 
        message: `Combined portal data retrieved successfully. Weakness: ${!!result.weakness ? '✅' : '❌'}, Recommendations: ${result.recommendations?.length || 0}` 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.error || error.message || error, 
        message: 'Failed to retrieve combined portal data' 
      };
    }
  };

  // Execute test
  const runTest = async (testId) => {
    setIsLoading(true);
    setSelectedTest(testId);

    let result;
    switch (testId) {
      case 'weakness-portal':
        result = await testWeaknessPortal();
        break;
      case 'recommendations-history':
        result = await testRecommendationsHistory();
        break;
      case 'recommendation-explain':
        result = await testRecommendationExplanation();
        break;
      case 'portal-data':
        result = await testPortalData();
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
      : <XCircle size={20} className="text-red-500" />;
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
                {isArabic ? 'يجب تسجيل الدخول لاختبار APIs الخاصة بالطلاب' : 'You need to login to test student APIs'}
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
          <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} mb-4`}>
              <TestTube size={32} className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#3949AB]`} />
              <h1 className="text-3xl font-bold text-[#37474F] dark:text-white">
                {isArabic ? 'اختبار بوابة التحسين الذكي' : 'AI Portal API Testing'}
              </h1>
              <Brain size={32} className={`${isRTL ? 'mr-3' : 'ml-3'} text-[#FFC107]`} />
            </div>
            <p className="text-lg text-[#3949AB] dark:text-[#7986CB] max-w-3xl mx-auto">
              {isArabic 
                ? 'اختبر APIs البوابة للتأكد من عملها بشكل صحيح'
                : 'Test portal APIs to ensure they are working correctly'
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
                  {isArabic ? 'البريد الإلكتروني:' : 'Email:'}
                </span>
                <span className="ml-2 text-[#37474F] dark:text-white">
                  {user?.email || 'N/A'}
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
              onClick={() => window.open('/student/ai-portal', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              {isArabic ? 'فتح البوابة' : 'Open Portal'}
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
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
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
                              ✅ {isArabic ? 'البيانات الأساسية:' : 'Main Data:'}
                            </div>
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(testResults[testCase.id].data, null, 2)}
                            </pre>
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
        </div>
      </div>
    </div>
  );
};

export default AIPortalTestPage;
