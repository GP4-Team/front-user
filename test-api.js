// Test file to verify API connection
const axios = require('axios');

const API_BASE_URL = 'https://academy1.gp-app.tafra-tech.com/api';

async function testApiConnection() {
  try {
    console.log('🔍 Testing API connection...');
    const response = await axios.get(`${API_BASE_URL}/courses?page=1&per_page=4`);
    
    console.log('✅ API Response Status:', response.status);
    console.log('📊 API Response Data Structure:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Transform data to UI format (similar to what we did in service)
    if (response.data.success && response.data.data && response.data.data.data) {
      const transformedCourses = response.data.data.data.map(course => ({
        id: course.id,
        title: {
          ar: course.name,
          en: course.name
        },
        category: {
          ar: getCategoryNameAr(course.educational_department_id),
          en: getCategoryNameEn(course.educational_department_id)
        },
        level: {
          ar: getLevelNameAr(course.educational_level_id),
          en: getLevelNameEn(course.educational_level_id)
        },
        image: course.image,
        color: course.color,
        code: course.code,
        rating: 4.5,
        students: '120+',
        duration: {
          ar: '8 أسابيع',
          en: '8 weeks'
        }
      }));
      
      console.log('🔄 Transformed Data for UI:');
      console.log(JSON.stringify(transformedCourses, null, 2));
    }
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

function getCategoryNameAr(departmentId) {
  const categories = {
    1: 'الرياضيات',
    2: 'العلوم',
    3: 'اللغة العربية',
    4: 'اللغة الإنجليزية',
    5: 'التاريخ',
    6: 'الجغرافيا'
  };
  return categories[departmentId] || 'مادة عامة';
}

function getCategoryNameEn(departmentId) {
  const categories = {
    1: 'Mathematics',
    2: 'Science',
    3: 'Arabic Language',
    4: 'English Language',
    5: 'History',
    6: 'Geography'
  };
  return categories[departmentId] || 'General Subject';
}

function getLevelNameAr(levelId) {
  const levels = {
    1: 'الصف الأول الابتدائي',
    2: 'الصف الثاني الابتدائي',
    3: 'الصف الثالث الابتدائي',
    4: 'الصف الرابع الابتدائي',
    5: 'الصف الخامس الابتدائي',
    6: 'الصف السادس الابتدائي',
    7: 'الصف الأول المتوسط',
    8: 'الصف الثاني المتوسط',
    9: 'الصف الثالث المتوسط',
    10: 'الصف الأول الثانوي',
    11: 'الصف الثاني الثانوي',
    12: 'الصف الثالث الثانوي'
  };
  return levels[levelId] || 'مستوى عام';
}

function getLevelNameEn(levelId) {
  const levels = {
    1: 'Grade 1',
    2: 'Grade 2', 
    3: 'Grade 3',
    4: 'Grade 4',
    5: 'Grade 5',
    6: 'Grade 6',
    7: 'Grade 7',
    8: 'Grade 8',
    9: 'Grade 9',
    10: 'Grade 10',
    11: 'Grade 11',
    12: 'Grade 12'
  };
  return levels[levelId] || 'General Level';
}

testApiConnection();
