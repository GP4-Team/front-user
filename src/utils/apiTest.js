// src/utils/apiTest.js
import api from '../services/api';

/**
 * Test API connectivity and endpoints
 */
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test basic connectivity - try a simple GET request first
    const response = await api.get('/courses/featured');
    console.log('API Connection Test - Success:', response.status);
    return true;
  } catch (error) {
    console.error('API Connection Test - Failed:', error);
    return false;
  }
};

/**
 * Test registration with minimal data to debug the server error
 */
export const testRegistration = async () => {
  try {
    console.log('Testing registration endpoint...');
    
    // Remove all middleware-sensitive headers and test with minimal data
    const testData = {
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'Test123456'
    };
    
    console.log('Sending test registration:', testData);
    
    const response = await api.post('/register', testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // Remove other headers that might cause issues
      }
    });
    
    console.log('Registration Test - Success:', response);
    return response;
  } catch (error) {
    console.error('Registration Test - Failed:', error);
    return null;
  }
};

/**
 * Alternative registration approach without authentication headers
 */
export const alternativeRegister = async (userData) => {
  try {
    // Create a separate axios instance without authentication interceptors
    const axios = require('axios');
    
    const response = await axios.post('https://academy1.gp-app.tafra-tech.com/api/register', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 30000
    });
    
    return response.data;
  } catch (error) {
    console.error('Alternative registration failed:', error);
    throw error;
  }
};
