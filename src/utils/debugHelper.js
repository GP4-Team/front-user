// src/utils/debugHelper.js - Debug utility لفحص مشكلة Featured Courses

/**
 * Debug Helper لفحص مشكلة عدم ظهور الدورات المميزة
 */

export const debugFeaturedCourses = () => {
  console.log('🔍 === DEBUGGING FEATURED COURSES ISSUE ===');
  
  // Test API endpoint directly
  const testFeaturedCoursesAPI = async () => {
    try {
      console.log('📡 Testing Featured Courses API...');
      
      const response = await fetch('https://academy1.gp-app.tafra-tech.com/api/courses/featured', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Featured Courses API Success:', data);
        return data;
      } else {
        const errorData = await response.text();
        console.log('❌ Featured Courses API Error:', errorData);
        return null;
      }
    } catch (error) {
      console.error('🔥 Featured Courses API Network Error:', error);
      return null;
    }
  };
  
  // Test courses service
  const testCoursesService = async () => {
    try {
      console.log('🧪 Testing Courses Service...');
      
      // Import service dynamically
      const { coursesService } = await import('../services/api/index');
      const result = await coursesService.getFeaturedCourses();
      
      console.log('✅ Courses Service Success:', result);
      return result;
    } catch (error) {
      console.error('❌ Courses Service Error:', error);
      return null;
    }
  };
  
  // Test mock data fallback
  const testMockData = () => {
    try {
      console.log('📚 Testing Mock Data...');
      
      // Import mock data dynamically
      import('../data/mockData').then(({ FEATURED_COURSES }) => {
        console.log('✅ Mock Featured Courses:', FEATURED_COURSES);
        return FEATURED_COURSES;
      });
    } catch (error) {
      console.error('❌ Mock Data Error:', error);
      return null;
    }
  };
  
  // Check if FeaturedCoursesSection is rendering
  const checkFeaturedCoursesSection = () => {
    console.log('🔍 Checking DOM for Featured Courses Section...');
    
    const section = document.getElementById('featured-courses-section');
    const wrapper = document.getElementById('featured-courses-wrapper');
    
    console.log('Featured Courses Section Element:', section);
    console.log('Featured Courses Wrapper Element:', wrapper);
    
    if (section) {
      console.log('✅ Featured Courses Section exists in DOM');
      console.log('Section innerHTML length:', section.innerHTML.length);
      console.log('Section children count:', section.children.length);
    } else {
      console.log('❌ Featured Courses Section NOT found in DOM');
    }
    
    // Check for course cards
    const courseCards = document.querySelectorAll('.card-wrapper');
    console.log('Course Cards found:', courseCards.length);
    courseCards.forEach((card, index) => {
      console.log(`Card ${index}:`, card);
    });
  };
  
  // Check local storage and state
  const checkState = () => {
    console.log('🗃️ Checking Application State...');
    
    // Check if user is authenticated
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('userData');
    
    console.log('User Token:', token ? '✅ Present' : '❌ Missing');
    console.log('User Data:', userData ? '✅ Present' : '❌ Missing');
    
    // Check language settings
    const language = localStorage.getItem('language');
    console.log('Language Setting:', language || 'Default');
  };
  
  return {
    testFeaturedCoursesAPI,
    testCoursesService,
    testMockData,
    checkFeaturedCoursesSection,
    checkState,
    runAllTests: async () => {
      console.log('🚀 Running all Featured Courses tests...');
      
      checkState();
      checkFeaturedCoursesSection();
      testMockData();
      
      const apiResult = await testFeaturedCoursesAPI();
      const serviceResult = await testCoursesService();
      
      console.log('📊 Test Results Summary:');
      console.log('API Test:', apiResult ? '✅ Success' : '❌ Failed');
      console.log('Service Test:', serviceResult ? '✅ Success' : '❌ Failed');
      
      return {
        api: apiResult,
        service: serviceResult
      };
    }
  };
};

// Add to window for easy console access
if (typeof window !== 'undefined') {
  window.debugFeaturedCourses = debugFeaturedCourses();
  
  console.log('🛠️ Debug helper loaded!');
  console.log('Run window.debugFeaturedCourses.runAllTests() to diagnose the issue');
}

export default debugFeaturedCourses;
