// src/pages/testing/ExamsApiTestPage.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import examsService from '../../services/api/exams.service';
import api from '../../services/api';

const ExamsApiTestPage = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [detailedError, setDetailedError] = useState(null);

  const runExamsApiTests = async () => {
    setLoading(true);
    setTestResults({});
    setDetailedError(null);

    const tests = {
      directApiCall: {
        name: 'Direct API Call to /exams/featured',
        status: 'pending'
      },
      serviceCall: {
        name: 'ExamsService.getFeaturedExams()',
        status: 'pending'
      },
      alternativeEndpoints: {
        name: 'Test Alternative Endpoints',
        status: 'pending'
      },
      serverHealth: {
        name: 'Server Health Check',
        status: 'pending'
      }
    };

    try {
      // Test 1: Direct API call
      console.log('🧪 Test 1: Direct API call to /exams/featured');
      try {
        const directResponse = await api.get('/exams/featured', { 
          params: { limit: 6 },
          timeout: 10000 // 10 second timeout
        });
        tests.directApiCall = {
          ...tests.directApiCall,
          status: 'success',
          data: directResponse.data,
          message: `Success! Got ${directResponse.data?.data?.length || 0} exams`
        };
      } catch (error) {
        tests.directApiCall = {
          ...tests.directApiCall,
          status: 'error',
          error: {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers
          }
        };
        
        // Store detailed error for analysis
        setDetailedError({
          endpoint: '/exams/featured',
          fullError: error,
          response: error.response,
          request: error.request,
          config: error.config
        });
      }

      // Test 2: Service call
      console.log('🧪 Test 2: ExamsService call');
      try {
        const serviceResponse = await examsService.getFeaturedExams(6);
        tests.serviceCall = {
          ...tests.serviceCall,
          status: 'success',
          data: serviceResponse,
          message: `Service success! Got ${serviceResponse?.data?.length || 0} exams`
        };
      } catch (error) {
        tests.serviceCall = {
          ...tests.serviceCall,
          status: 'error',
          error: {
            message: error.message,
            originalError: error
          }
        };
      }

      // Test 3: Alternative endpoints
      console.log('🧪 Test 3: Alternative endpoints');
      const alternativeResults = [];
      
      const alternativeEndpoints = [
        '/exams',
        '/exams/user',
        '/exams/available',
        '/exams/upcoming'
      ];

      for (const endpoint of alternativeEndpoints) {
        try {
          const response = await api.get(endpoint, { timeout: 5000 });
          alternativeResults.push({
            endpoint,
            status: 'success',
            statusCode: response.status,
            dataCount: response.data?.data?.length || 0
          });
        } catch (error) {
          alternativeResults.push({
            endpoint,
            status: 'error',
            statusCode: error.response?.status || 'Network Error',
            message: error.message
          });
        }
      }

      tests.alternativeEndpoints = {
        ...tests.alternativeEndpoints,
        status: alternativeResults.some(r => r.status === 'success') ? 'partial' : 'error',
        results: alternativeResults
      };

      // Test 4: Server health check
      console.log('🧪 Test 4: Server health check');
      try {
        const healthResponse = await api.get('/health', { timeout: 5000 });
        tests.serverHealth = {
          ...tests.serverHealth,
          status: 'success',
          data: healthResponse.data
        };
      } catch (error) {
        // Try alternative health endpoints
        const healthEndpoints = ['/ping', '/status', '/app-info'];
        let healthFound = false;
        
        for (const healthEndpoint of healthEndpoints) {
          try {
            const response = await api.get(healthEndpoint, { timeout: 3000 });
            tests.serverHealth = {
              ...tests.serverHealth,
              status: 'success',
              endpoint: healthEndpoint,
              data: response.data
            };
            healthFound = true;
            break;
          } catch (err) {
            // Continue to next endpoint
          }
        }
        
        if (!healthFound) {
          tests.serverHealth = {
            ...tests.serverHealth,
            status: 'error',
            message: 'No health endpoint found'
          };
        }
      }

    } catch (globalError) {
      console.error('Global test error:', globalError);
    }

    setTestResults(tests);
    setLoading(false);
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runExamsApiTests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'partial': return 'text-yellow-600';
      case 'pending': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'partial': return '⚠️';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            🧪 Exams API Testing Dashboard
          </h1>
          <p className="text-lg opacity-75">
            Comprehensive testing for the /exams/featured endpoint and related APIs
          </p>
          
          <div className="mt-4 flex gap-4">
            <button
              onClick={runExamsApiTests}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? '🔄 Running Tests...' : '🚀 Run All Tests'}
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 text-white"
            >
              🔃 Refresh Page
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="grid gap-6">
          {Object.entries(testResults).map(([testKey, test]) => (
            <div
              key={testKey}
              className={`p-6 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{getStatusIcon(test.status)}</span>
                <h3 className={`text-xl font-semibold ${getStatusColor(test.status)}`}>
                  {test.name}
                </h3>
              </div>

              {test.status === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    ✅ {test.message || 'Success!'}
                  </p>
                  {test.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-green-700 dark:text-green-300">
                        View Response Data
                      </summary>
                      <pre className="mt-2 text-sm bg-green-100 dark:bg-green-900/40 p-3 rounded overflow-auto">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {test.status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                    ❌ Error Details:
                  </p>
                  {test.error && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Message:</strong> {test.error.message}</p>
                      {test.error.status && (
                        <p><strong>Status:</strong> {test.error.status} {test.error.statusText}</p>
                      )}
                      {test.error.data && (
                        <details>
                          <summary className="cursor-pointer text-red-700 dark:text-red-300">
                            Server Response Data
                          </summary>
                          <pre className="mt-2 bg-red-100 dark:bg-red-900/40 p-3 rounded overflow-auto">
                            {JSON.stringify(test.error.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              )}

              {test.status === 'partial' && test.results && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-3">
                    ⚠️ Mixed Results:
                  </p>
                  <div className="space-y-2">
                    {test.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <span>{result.status === 'success' ? '✅' : '❌'}</span>
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {result.endpoint}
                        </code>
                        <span className={result.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                          {result.status === 'success' 
                            ? `${result.statusCode} (${result.dataCount} items)`
                            : `${result.statusCode} - ${result.message}`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Error Analysis */}
        {detailedError && (
          <div className={`mt-8 p-6 rounded-lg border ${
            isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
          }`}>
            <h3 className="text-xl font-semibold text-red-600 mb-4">
              🔍 Detailed Error Analysis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Request Configuration:</h4>
                <pre className="text-sm bg-red-100 dark:bg-red-900/40 p-3 rounded overflow-auto">
                  {JSON.stringify({
                    url: detailedError.config?.url,
                    method: detailedError.config?.method,
                    baseURL: detailedError.config?.baseURL,
                    headers: detailedError.config?.headers,
                    params: detailedError.config?.params
                  }, null, 2)}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Response Details:</h4>
                <pre className="text-sm bg-red-100 dark:bg-red-900/40 p-3 rounded overflow-auto">
                  {JSON.stringify({
                    status: detailedError.response?.status,
                    statusText: detailedError.response?.statusText,
                    headers: detailedError.response?.headers,
                    data: detailedError.response?.data
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className={`mt-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            💡 Recommendations
          </h3>
          
          <div className="space-y-3 text-sm">
            <p><strong>1. Server-Side Issue:</strong> The 500 error indicates a problem on the backend server, not your frontend code.</p>
            <p><strong>2. Your Fallback Works:</strong> Your application gracefully falls back to mock data, which is excellent UX.</p>
            <p><strong>3. Backend Investigation:</strong> Check the server logs for the /exams/featured endpoint.</p>
            <p><strong>4. Temporary Solution:</strong> Continue using mock data until the backend issue is resolved.</p>
            <p><strong>5. Monitoring:</strong> Set up periodic checks to detect when the API is working again.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsApiTestPage;