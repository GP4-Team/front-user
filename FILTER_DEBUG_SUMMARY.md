# تصحيح مشكلة الفلترة - خطة التشخيص

## المشاكل المحتملة والحلول:

### 1. مشكلة التوقيت ✅ (تم إصلاحها)
- **المشكلة**: fetchCourses كانت بتشتغل قبل تحميل educationLevels
- **الحل**: إضافة شرط للانتظار حتى تحميل المستويات

### 2. مشكلة الـ Mapping ✅ (تم إصلاحها)
- **المشكلة**: mapEducationLevelToFilterId معقدة ومش دقيقة
- **الحل**: تبسيط الـ mapping لتستخدم level_${id}

### 3. إضافة Debugging محسن ✅
- **إضافة**: console.log مفصل لتتبع العملية
- **إضافة**: عرض البيانات المتاحة في كل خطوة

## التحديثات المطبقة:

### في `AllCoursesPage.jsx`:
```javascript
// عدم تشغيل fetchCourses إذا كان هناك فلتر ولسة educationLevels مش متحملة
if (filters.level && educationLevels.length === 0) {
  console.log('⚠️ Waiting for education levels to load before filtering...');
  return;
}

// إضافة logging مفصل
console.log('🔎 Looking for level with levelId:', filters.level);
console.log('🔎 Found selectedLevel:', selectedLevel);

// إضافة shouldUseFilter للتأكد من وجود المستوى
let shouldUseFilter = false;
if (filters.level && educationLevels.length > 0) {
  const selectedLevel = educationLevels.find(level => level.levelId === filters.level);
  if (selectedLevel) {
    params.education_level_ids = selectedLevel.id;
    shouldUseFilter = true;
  }
}
```

### في `courses.service.js`:
```javascript
mapEducationLevelToFilterId(levelId, levelName) {
  console.log(`📝 Mapping level: ID=${levelId}, Name="${levelName}"`);
  const result = `level_${levelId}`;
  console.log(`🎯 Mapped to: ${result}`);
  return result;
}
```

## خطوات التشخيص:

### 1. افتح Console في المتصفح
### 2. انتقل لصفحة `/courses`
### 3. اختر أي مستوى تعليمي
### 4. راقب الرسائل التالية:

```
🔍 === DEBUGGING FEATURED COURSES ===
🏭 Fetching education levels from API...
✅ Successfully loaded X education levels
📝 Mapping level: ID=X, Name="..."
🎯 Mapped to: level_X
⚠️ Waiting for education levels to load before filtering...
🔍 Fetching courses page 1 from API with filters: {level: "level_X"}
📋 Available education levels: [...]
🔎 Looking for level with levelId: level_X
🔎 Found selectedLevel: {...}
🎯 Filtering by education level ID: X (Name)
🔍 Using filter API with params: {page: 1, per_page: 15, education_level_ids: X}
✅ Successfully loaded filtered courses: {...}
```

## إذا لم تعمل الفلترة:

### تحقق من النقاط التالية:
1. **هل educationLevels محملة؟** - يجب أن تظهر رسالة "Successfully loaded X education levels"
2. **هل selectedLevel موجود؟** - يجب أن يظهر الكائن وليس `undefined`
3. **هل shouldUseFilter = true؟** - يجب أن يظهر "Using filter API"
4. **هل API يرد بنجاح؟** - يجب أن تظهر "Successfully loaded filtered courses"

## الحل النهائي إذا استمرت المشكلة:

### إذا كان المشكلة في الـ levelId mapping، يمكن تجربة:
```javascript
// في handleFilterChange
const handleFilterChange = (filterType, value) => {
  if (filterType === "reset") {
    setFilters({ level: "" });
    setCurrentPage(1);
    return;
  }

  // إضافة تشخيص مباشر
  console.log('🎯 Filter change requested:', filterType, value);
  
  if (filterType === "level") {
    const selectedLevel = educationLevels.find(level => level.levelId === value);
    console.log('🔍 Selected level object:', selectedLevel);
    
    if (selectedLevel) {
      console.log('✅ Level found, will filter by education_level_id:', selectedLevel.id);
    } else {
      console.warn('❌ Level not found in educationLevels');
    }
  }

  setFilters((prev) => ({
    ...prev,
    [filterType]: value,
  }));
  
  setCurrentPage(1);
};
```

تم تطبيق التصحيحات! جرب الفلترة الآن وتابع الـ console لمعرفة المشكلة الدقيقة.