// src/components/testing/ApiTestingTool.jsx
import React, { useState } from 'react';
import ApiTester from '../../utils/apiTester';

const ApiTestingTool = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('/courses');
  const [error, setError] = useState(null);
  
  // اختبار جميع نقاط النهاية
  const handleTestAll = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const testResults = await ApiTester.testAllEndpoints();
      setResults(testResults);
    } catch (err) {
      setError(`فشل في تشغيل الاختبارات: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // اختبار نقطة نهاية محددة
  const handleTestCustomEndpoint = async () => {
    if (!customEndpoint.trim()) {
      setError('الرجاء إدخال نقطة نهاية صالحة');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const testResult = await ApiTester.testEndpoint(customEndpoint);
      setResults({
        allTests: [testResult],
        summary: {
          total: 1,
          success: testResult.success ? 1 : 0,
          failed: testResult.success ? 0 : 1
        }
      });
    } catch (err) {
      setError(`فشل في تشغيل الاختبار: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">أداة اختبار API</h1>
      
      {/* نموذج الاختبار */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">اختبار نقاط النهاية</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <button
            onClick={handleTestAll}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            اختبار جميع نقاط النهاية
          </button>
          
          <div className="flex-1 flex">
            <input
              type="text"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
              placeholder="/api/endpoint"
              className="flex-1 border border-gray-300 rounded-r-none rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleTestCustomEndpoint}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-l-none rounded-r-lg transition-colors disabled:opacity-50"
            >
              اختبار
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 mr-2"></div>
            <span>جاري الاختبار...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </div>
      
      {/* نتائج الاختبار */}
      {results && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">نتائج الاختبار</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{results.summary.total}</div>
              <div className="text-gray-600">إجمالي الاختبارات</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">{results.summary.success}</div>
              <div className="text-green-700">ناجحة</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-700">{results.summary.failed}</div>
              <div className="text-red-700">فاشلة</div>
            </div>
          </div>
          
          <div className="space-y-4">
            {results.allTests.map((test, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${test.success ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                      {test.endpoint}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs font-bold rounded ${
                      test.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {test.statusCode || 'N/A'}
                    </span>
                    {test.duration && (
                      <span className="ml-2 text-xs text-gray-500">
                        {test.duration}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-medium ${
                    test.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {test.success ? 'ناجح' : 'فاشل'}
                  </div>
                </div>
                
                {test.error && (
                  <div className="mt-2 text-red-700 text-sm">
                    <strong>خطأ:</strong> {test.error}
                    {test.data && test.data.message && (
                      <div className="mt-1 text-xs font-mono bg-red-100 p-2 rounded">
                        {test.data.message}
                      </div>
                    )}
                  </div>
                )}
                
                {test.success && test.data && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        const response = document.getElementById(`response-${index}`);
                        response.style.display = response.style.display === 'none' ? 'block' : 'none';
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm focus:outline-none"
                    >
                      عرض/إخفاء الاستجابة
                    </button>
                    <pre 
                      id={`response-${index}`} 
                      className="mt-2 bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto" 
                      style={{ display: 'none', maxHeight: '300px' }}
                    >
                      {JSON.stringify(test.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTestingTool;