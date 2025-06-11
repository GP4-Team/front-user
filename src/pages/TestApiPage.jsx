// Test API Page - للتأكد من أن الـ APIs شغالة صح
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import CoursesService from '../services/api/courses.service';
import MaterialsService from '../services/api/materials.service';
import Navbar from '../components/navigation/Navbar';

const TestApiPage = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const [courseData, setCourseData] = useState(null);
  const [materialData, setMaterialData] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message, type }]);
    console.log(`[${timestamp}] ${message}`);
  };

  const testAPI1 = async () => {
    try {
      setLoading(true);
      setError(null);
      addLog('🔍 Starting API 1 test: GET /api/materials/course/1', 'info');
      
      const response = await CoursesService.getCourseContent(1);
      
      addLog('✅ API 1 Response received', 'success');
      addLog(`Response structure: ${JSON.stringify(Object.keys(response), null, 2)}`, 'info');
      
      if (response.success && response.data && response.data.data) {
        const materials = response.data.data;
        setCourseData(response);
        addLog(`📊 Found ${materials.length} materials`, 'success');
        
        materials.forEach((material, index) => {
          addLog(`Material ${index + 1}: ${material.name} (Type: ${material.type}, ID: ${material.id})`, 'info');
          if (material.media_url) {
            addLog(`  - Media URL: ${material.media_url}`, 'info');
          } else {
            addLog(`  - No media URL`, 'warning');
          }
        });
        
        // Auto-select first material for testing
        if (materials.length > 0) {
          setSelectedMaterialId(materials[0].id);
          addLog(`🎯 Auto-selected material ID: ${materials[0].id}`, 'info');
        }
      } else {
        addLog('❌ Invalid response structure from API 1', 'error');
        addLog(`Full response: ${JSON.stringify(response, null, 2)}`, 'error');
      }
    } catch (err) {
      addLog(`❌ API 1 Error: ${err.message}`, 'error');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testAPI2 = async (materialId) => {
    if (!materialId) {
      addLog('⚠️ No material ID provided for API 2 test', 'warning');
      return;
    }

    try {
      setLoading(true);
      addLog(`🔍 Starting API 2 test: GET /api/materials/${materialId}`, 'info');
      
      const response = await MaterialsService.getMaterialById(materialId);
      
      addLog('✅ API 2 Response received', 'success');
      
      if (response.success && response.data) {
        const material = response.data;
        setMaterialData(response);
        
        addLog(`📋 Material Details:`, 'success');
        addLog(`  - Name: ${material.name}`, 'info');
        addLog(`  - Type: ${material.type}`, 'info');
        addLog(`  - Description: ${material.description}`, 'info');
        addLog(`  - Duration: ${material.duration_in_seconds} seconds`, 'info');
        addLog(`  - Pages: ${material.number_of_pages}`, 'info');
        addLog(`  - Media URL: ${material.media_url || 'NULL'}`, material.media_url ? 'success' : 'warning');
        addLog(`  - Instructor: ${material.user?.name || 'N/A'}`, 'info');
        addLog(`  - Course: ${material.course?.name || 'N/A'}`, 'info');
      } else {
        addLog('❌ Invalid response structure from API 2', 'error');
        addLog(`Full response: ${JSON.stringify(response, null, 2)}`, 'error');
      }
    } catch (err) {
      addLog(`❌ API 2 Error: ${err.message}`, 'error');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setCourseData(null);
    setMaterialData(null);
    setSelectedMaterialId(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <div className="pt-20 container mx-auto px-4 py-8">
        
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            اختبار APIs صفحة تفاصيل الكورس
          </h1>

          {/* Control Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">لوحة التحكم</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={testAPI1}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? 'جاري الاختبار...' : 'اختبار API 1 (محتوى الكورس)'}
              </button>
              
              <button
                onClick={() => testAPI2(selectedMaterialId)}
                disabled={loading || !selectedMaterialId}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? 'جاري الاختبار...' : 'اختبار API 2 (تفاصيل المادة)'}
              </button>
              
              <input
                type="number"
                value={selectedMaterialId || ''}
                onChange={(e) => setSelectedMaterialId(e.target.value)}
                placeholder="Material ID"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700"
              />
              
              <button
                onClick={clearLogs}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                مسح السجلات
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <strong>خطأ:</strong> {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* API Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">سجل الأحداث</h2>
              <div 
                className="bg-black text-green-400 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm"
                style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
              >
                {logs.length === 0 ? (
                  <div className="text-gray-500">لا توجد أحداث بعد...</div>
                ) : (
                  logs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`mb-1 ${
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'success' ? 'text-green-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-gray-300'
                      }`}
                    >
                      <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">معاينة البيانات</h2>
              
              {/* Course Data */}
              {courseData && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">
                    بيانات محتوى الكورس (API 1)
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(courseData.data?.data?.slice(0, 2) || courseData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Material Data */}
              {materialData && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">
                    بيانات تفاصيل المادة (API 2)
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(materialData.data || materialData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Material Test Player */}
              {materialData?.data && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-purple-600 dark:text-purple-400">
                    اختبار تشغيل المادة
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div className="mb-2">
                      <strong>النوع:</strong> {materialData.data.type}
                    </div>
                    <div className="mb-2">
                      <strong>الاسم:</strong> {materialData.data.name}
                    </div>
                    <div className="mb-4">
                      <strong>URL:</strong> 
                      <span className={materialData.data.media_url ? 'text-green-600' : 'text-red-600'}>
                        {materialData.data.media_url || 'لا يوجد'}
                      </span>
                    </div>
                    
                    {materialData.data.media_url && (
                      <>
                        {materialData.data.type === 'YoutubeVideo' && (
                          <div className="aspect-video bg-gray-900 rounded-md">
                            <iframe
                              src={materialData.data.media_url.replace('watch?v=', 'embed/')}
                              className="w-full h-full rounded-md"
                              frameBorder="0"
                              allowFullScreen
                              title={materialData.data.name}
                            />
                          </div>
                        )}
                        
                        {materialData.data.type === 'Audio' && (
                          <audio controls className="w-full">
                            <source src={materialData.data.media_url} />
                            متصفحك لا يدعم تشغيل الصوت
                          </audio>
                        )}
                        
                        {materialData.data.type === 'Pdf' && (
                          <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-md">
                            <div className="text-blue-600 mb-2">📄 ملف PDF</div>
                            <a 
                              href={materialData.data.media_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                              فتح الملف
                            </a>
                          </div>
                        )}
                        
                        {materialData.data.type === 'Image' && (
                          <img 
                            src={materialData.data.media_url} 
                            alt={materialData.data.name}
                            className="w-full rounded-md"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'block';
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestApiPage;
