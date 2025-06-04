// src/utils/apiDebugger.js
import api, { testApiConnection, refreshCsrfToken } from '../services/api';
import authService from '../services/api/auth.service';

/**
 * API Debugging Utilities
 * These functions help diagnose API connection issues
 */

/**
 * Test basic API connection and configuration
 */
export const debugApiConnection = async () => {
  console.log('🔍 === API DEBUG SESSION START ===');
  
  try {
    // Test basic connection
    const connectionResult = await testApiConnection();
    console.log('✅ API connection test passed');
    
    // Test CSRF token
    console.log('🛡️ Testing CSRF token...');
    const csrfResult = await refreshCsrfToken();
    console.log(`CSRF token result: ${csrfResult ? '✅ Success' : '❌ Failed'}`);
    
    // Display environment info
    console.log('🌐 Environment Info:', {
      'Current URL': window.location.href,
      'Hostname': window.location.hostname,
      'Origin': window.location.origin,
      'User Agent': navigator.userAgent,
      'Language': localStorage.getItem('language') || 'ar'
    });
    
    return {
      connection: true,
      csrf: csrfResult,
      environment: {
        url: window.location.href,
        hostname: window.location.hostname,
        origin: window.location.origin
      }
    };
  } catch (error) {
    console.error('❌ API connection debug failed:', error);
    return {
      connection: false,
      error: error.message,
      details: error
    };
  }
};

/**
 * Test login API with sample data
 */
export const debugLoginApi = async (loginData = null) => {
  console.log('🔑 === LOGIN API DEBUG ===');
  
  const testData = loginData || {
    login: 'test@example.com',
    password: 'testpassword',
    remember: false
  };
  
  try {
    console.log('📤 Testing login with data:', testData);
    
    // First ensure CSRF token is ready
    await refreshCsrfToken();
    
    // Attempt login
    const response = await authService.login(
      testData.login,
      testData.password,
      testData.remember
    );
    
    console.log('✅ Login test successful:', response);
    return {
      success: true,
      response
    };
  } catch (error) {
    console.error('❌ Login test failed:', error);
    return {
      success: false,
      error: error.message,
      details: error.response?.data || error
    };
  }
};

/**
 * Test registration API with sample data
 */
export const debugRegisterApi = async (registerData = null) => {
  console.log('📝 === REGISTER API DEBUG ===');
  
  const testData = registerData || {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
    phone: '01234567890',
    type: 'student'
  };
  
  try {
    console.log('📤 Testing registration with data:', testData);
    
    // First ensure CSRF token is ready
    await refreshCsrfToken();
    
    // Attempt registration
    const response = await authService.register(testData);
    
    console.log('✅ Registration test successful:', response);
    return {
      success: true,
      response
    };
  } catch (error) {
    console.error('❌ Registration test failed:', error);
    return {
      success: false,
      error: error.message,
      details: error.response?.data || error
    };
  }
};

/**
 * Comprehensive API health check
 */
export const runApiHealthCheck = async () => {
  console.log('🏥 === COMPREHENSIVE API HEALTH CHECK ===');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  // Test 1: Basic connection
  console.log('\n1️⃣ Testing basic connection...');
  results.tests.connection = await debugApiConnection();
  
  // Test 2: CSRF functionality
  console.log('\n2️⃣ Testing CSRF functionality...');
  try {
    const csrfResult = await refreshCsrfToken();
    results.tests.csrf = {
      success: csrfResult,
      message: csrfResult ? 'CSRF token obtained successfully' : 'Failed to get CSRF token'
    };
  } catch (error) {
    results.tests.csrf = {
      success: false,
      error: error.message
    };
  }
  
  // Test 3: Headers validation
  console.log('\n3️⃣ Validating request headers...');
  results.tests.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': localStorage.getItem('language') || 'ar',
    'X-Tenant-Domain': window.location.hostname,
    'User-Agent': 'LMS-Frontend/1.0',
    'X-App-Version': '1.0.0',
    'Referer': window.location.origin,
    'withCredentials': true
  };
  
  console.log('📋 Headers that will be sent:', results.tests.headers);
  
  // Test 4: Network connectivity
  console.log('\n4️⃣ Testing network connectivity...');
  try {
    const networkTest = await fetch('https://academy1.gp-app.tafra-tech.com/api', {
      method: 'OPTIONS',
      mode: 'cors'
    });
    results.tests.network = {
      success: true,
      status: networkTest.status,
      message: 'Network connectivity OK'
    };
  } catch (error) {
    results.tests.network = {
      success: false,
      error: error.message,
      message: 'Network connectivity failed'
    };
  }
  
  console.log('\n📊 === HEALTH CHECK SUMMARY ===');
  console.log(results);
  
  return results;
};

/**
 * Add debugging commands to window object for easy access in console
 */
export const addDebugCommands = () => {
  if (process.env.NODE_ENV === 'development') {
    window.apiDebug = {
      connection: debugApiConnection,
      login: debugLoginApi,
      register: debugRegisterApi,
      healthCheck: runApiHealthCheck,
      refreshCsrf: refreshCsrfToken
    };
    
    console.log('🛠️ Debug commands added to window.apiDebug:');
    console.log('- window.apiDebug.connection() - Test API connection');
    console.log('- window.apiDebug.login(data) - Test login API');
    console.log('- window.apiDebug.register(data) - Test register API');
    console.log('- window.apiDebug.healthCheck() - Run comprehensive health check');
    console.log('- window.apiDebug.refreshCsrf() - Refresh CSRF token');
  }
};

export default {
  debugApiConnection,
  debugLoginApi,
  debugRegisterApi,
  runApiHealthCheck,
  addDebugCommands
};
