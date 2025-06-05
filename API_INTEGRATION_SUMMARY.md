# تحديثات ربط صفحة الهوم بالـ API الحقيقي

## التحديثات المطلوبة:

### 1. تحديث `courses.service.js`:
✅ تم تحديث `getFeaturedCourses()` لتستدعي `/courses` بدلاً من `/courses/featured`
✅ تم إضافة data transformation لتحويل البيانات من API format إلى UI format
✅ تم إضافة helper methods لترجمة أسماء الفئات والمستويات

### 2. تحديث `CourseCard.jsx`:
✅ تم إضافة fallback values للبيانات المفقودة
✅ تم تحديث عرض البيانات لتتوافق مع البيانات الجديدة
✅ تم إضافة debugging للتحقق من بنية البيانات

### 3. البيانات المُرجعة من الـ API:
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "الرياضيات الأساسية",
        "code": "MATH101_G1",
        "color": "#4285F4",
        "educational_level_id": 1,
        "educational_department_id": 1,
        "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp"
      }
    ]
  }
}
```

### 4. البيانات المُحولة للـ UI:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": {
        "ar": "الرياضيات الأساسية",
        "en": "الرياضيات الأساسية"
      },
      "category": {
        "ar": "الرياضيات",
        "en": "Mathematics"
      },
      "level": {
        "ar": "الصف الأول الابتدائي",
        "en": "Grade 1"
      },
      "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp",
      "color": "#4285F4",
      "code": "MATH101_G1",
      "rating": 4.5,
      "students": "120+",
      "duration": {
        "ar": "8 أسابيع",
        "en": "8 weeks"
      }
    }
  ]
}
```

## الملفات المُحدثة:
1. `src/services/api/courses.service.js` - تحديث استدعاء الـ API
2. `src/components/courses/CourseCard.jsx` - تحديث عرض البيانات

## التغييرات الرئيسية:

### في `courses.service.js`:
- تغيير endpoint من `/courses/featured` إلى `/courses`
- إضافة pagination parameters
- تحويل البيانات لتتوافق مع UI format المطلوب
- إضافة mapping للفئات والمستويات التعليمية

### في `CourseCard.jsx`:
- إضافة fallback values للبيانات المفقودة
- تحديث عرض البيانات لتعمل مع البيانات الجديدة
- إضافة debugging console logs

## كيفية الاختبار:
1. تشغيل التطبيق: `npm start`
2. فتح الصفحة الرئيسية
3. التحقق من عرض الكورسات من الـ API الحقيقي
4. التحقق من console logs للتأكد من البيانات

## النتائج المتوقعة:
- عرض الكورسات الحقيقية من الـ API بدلاً من البيانات الوهمية
- الحفاظ على نفس شكل الـ UI
- عرض الكورسات جنب بعض في grid layout
- عرض البيانات باللغة العربية والإنجليزية حسب اللغة المختارة
