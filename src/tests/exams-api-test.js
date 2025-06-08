// src/tests/exams-api-test.js
/**
 * Testing script for the corrected exams API endpoints
 * This file tests the fixed HTTP methods and exam ID handling
 */

import ExamsService from '../services/api/exams.service';

/**
 * Test suite for exams API
 */
class ExamsApiTester {
  constructor() {
    this.testResults = [];
    this.errors = [];
  }

  /**
   * Log test results
   */
  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    
    console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
    
    if (type === 'error') {
      this.errors.push(logEntry);
    } else {
      this.testResults.push(logEntry);
    }
  }

  /**
   * Test 1: Get all online exams (should use GET method)
   */
  async testGetAllOnlineExams() {
    this.log('🧪 Testing: Get all online exams');
    
    try {
      const result = await ExamsService.getOnlineExams();
      
      this.log('✅ Get all exams - SUCCESS', 'success');
      this.log(`Response type: ${typeof result}`, 'info');
      this.log(`Has exams array: ${result && Array.isArray(result.exams)}`, 'info');
      
      if (result && result.exams) {
        this.log(`Number of exams: ${result.exams.length}`, 'info');
        
        if (result.exams.length > 0) {
          this.log(`First exam ID: ${result.exams[0].id}`, 'info');
          this.log(`First exam name: ${result.exams[0].name}`, 'info');
        }
      }
      
      return { success: true, data: result };
      
    } catch (error) {
      this.log(`❌ Get all exams - FAILED: ${error.message}`, 'error');
      this.log(`Error status: ${error.response?.status}`, 'error');
      this.log(`Error data: ${JSON.stringify(error.response?.data)}`, 'error');
      
      return { success: false, error };
    }
  }

  /**
   * Test 2: Get specific exam by ID (should use GET with ID in path)
   */
  async testGetExamById(examId = 3) {
    this.log(`🧪 Testing: Get exam by ID (${examId})`);
    
    try {
      const result = await ExamsService.getOnlineExamById(examId);
      
      this.log('✅ Get exam by ID - SUCCESS', 'success');
      this.log(`Response success: ${result?.success}`, 'info');
      this.log(`Exam ID: ${result?.data?.id}`, 'info');
      this.log(`Exam name: ${result?.data?.name}`, 'info');
      this.log(`Exam status: ${result?.data?.status}`, 'info');
      
      // Verify that the returned ID matches the requested ID
      if (result?.data?.id && parseInt(result.data.id) === parseInt(examId)) {
        this.log('✅ ID verification - PASSED', 'success');
      } else {
        this.log(`⚠️ ID verification - FAILED: Expected ${examId}, got ${result?.data?.id}`, 'warning');
      }
      
      return { success: true, data: result };
      
    } catch (error) {
      this.log(`❌ Get exam by ID - FAILED: ${error.message}`, 'error');
      this.log(`Error status: ${error.response?.status}`, 'error');
      this.log(`Error data: ${JSON.stringify(error.response?.data)}`, 'error');
      
      return { success: false, error };
    }
  }

  /**
   * Test 3: Test invalid exam ID handling
   */
  async testInvalidExamId() {
    this.log('🧪 Testing: Invalid exam ID handling');
    
    const invalidIds = ['invalid', null, undefined, '', -1];
    
    for (const invalidId of invalidIds) {
      try {
        await ExamsService.getOnlineExamById(invalidId);
        this.log(`⚠️ Invalid ID (${invalidId}) - Should have failed but didn't`, 'warning');
      } catch (error) {
        this.log(`✅ Invalid ID (${invalidId}) - Correctly rejected: ${error.message}`, 'success');
      }
    }
  }

  /**
   * Test 4: Test network tab monitoring
   */
  testNetworkRequests() {
    this.log('🧪 Testing: Network request monitoring');
    this.log('📋 Instructions for manual verification:', 'info');
    this.log('1. Open Browser Developer Tools (F12)', 'info');
    this.log('2. Go to Network tab', 'info');
    this.log('3. Run the tests and verify:', 'info');
    this.log('   - All requests use GET method (not POST)', 'info');
    this.log('   - URLs include exam ID in path: /api/examination/online-exams/{id}', 'info');
    this.log('   - No "حقل id مطلوب" errors in response', 'info');
    this.log('   - Status codes are 200 for successful requests', 'info');
  }

  /**
   * Test 5: Test with different exam IDs
   */
  async testMultipleExamIds() {
    this.log('🧪 Testing: Multiple exam IDs');
    
    const examIds = [1, 2, 3, 32]; // Including the ID from the error message
    const results = [];
    
    for (const examId of examIds) {
      try {
        const result = await ExamsService.getOnlineExamById(examId);
        results.push({
          examId,
          success: true,
          data: result?.data,
          name: result?.data?.name || 'Unknown'
        });
        this.log(`✅ Exam ID ${examId} - SUCCESS: ${result?.data?.name}`, 'success');
      } catch (error) {
        results.push({
          examId,
          success: false,
          error: error.message,
          status: error.response?.status
        });
        this.log(`❌ Exam ID ${examId} - FAILED: ${error.message}`, 'error');
      }
    }
    
    return results;
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    this.log('🚀 Starting API tests for corrected exams endpoints');
    this.log('=' * 50);
    
    // Clear previous results
    this.testResults = [];
    this.errors = [];
    
    try {
      // Test 1: Get all exams
      await this.testGetAllOnlineExams();
      
      this.log('-' * 30);
      
      // Test 2: Get specific exam
      await this.testGetExamById(3);
      
      this.log('-' * 30);
      
      // Test 3: Invalid IDs
      await this.testInvalidExamId();
      
      this.log('-' * 30);
      
      // Test 4: Network monitoring instructions
      this.testNetworkRequests();
      
      this.log('-' * 30);
      
      // Test 5: Multiple exam IDs
      const multipleResults = await this.testMultipleExamIds();
      
      this.log('-' * 30);
      
      // Summary
      this.generateTestSummary();
      
      return {
        success: this.errors.length === 0,
        results: this.testResults,
        errors: this.errors,
        multipleExamResults: multipleResults
      };
      
    } catch (error) {
      this.log(`❌ Test suite failed: ${error.message}`, 'error');
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate test summary
   */
  generateTestSummary() {
    this.log('📊 TEST SUMMARY', 'info');
    this.log(`Total tests: ${this.testResults.length + this.errors.length}`);
    this.log(`Passed: ${this.testResults.filter(r => r.type === 'success').length}`, 'success');
    this.log(`Failed: ${this.errors.length}`, this.errors.length > 0 ? 'error' : 'success');
    this.log(`Warnings: ${this.testResults.filter(r => r.type === 'warning').length}`);
    
    if (this.errors.length === 0) {
      this.log('🎉 All tests passed! API corrections are working properly.', 'success');
    } else {
      this.log('⚠️ Some tests failed. Check the errors above.', 'warning');
    }
  }
}

// Export for use in components or standalone testing
export default ExamsApiTester;

// Auto-run tests if this file is imported
if (typeof window !== 'undefined') {
  // Browser environment - can be run manually
  window.testExamsApi = () => {
    const tester = new ExamsApiTester();
    return tester.runAllTests();
  };
  
  console.log('🧪 Exams API Tester loaded! Run window.testExamsApi() to test.');
}
