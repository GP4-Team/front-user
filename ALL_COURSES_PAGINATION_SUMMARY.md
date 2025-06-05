# تحديثات صفحة All Courses لاستخدام /courses مع Pagination

## التحديثات المطلوبة:

### 1. تحديث `courses.service.js`:
✅ إضافة method جديدة `getAllCoursesPaginated()` تستدعي `/courses`
✅ إضافة data transformation لتحويل البيانات من API format إلى UI format
✅ إضافة pagination data في الاستجابة

### 2. تحديث `homeApiService.js`:
✅ إضافة method `getAllCoursesPaginated()` 

### 3. تحديث `AllCoursesPage.jsx`:
✅ تغيير من جلب جميع الكورسات إلى pagination
✅ إضافة أزرار التنقل بين الصفحات
✅ إضافة useEffect للتحديث عند تغيير الصفحة
✅ إضافة مكون PaginationControls
✅ تحديث logic الفلترة للعمل مع الصفحة الحالية

## الـ API المستخدم الآن:
- **Endpoint**: `GET /api/courses`
- **Parameters**: `page`, `per_page`
- **عدد الكورسات**: 15 كورس في الصفحة
- **Pagination**: دعم كامل للتنقل بين الصفحات

## الميزات الجديدة:

### Pagination Controls:
- **زر السابق/التالي**: للتنقل بين الصفحات
- **أرقام الصفحات**: عرض أرقام الصفحات مع نقاط للصفحات البعيدة
- **الصفحة الحالية**: تمييز الصفحة الحالية
- **تعطيل الأزرار**: عند الوصول للصفحة الأولى/الأخيرة

### معلومات الصفحة:
```
عرض 1 - 15 من 63 دورة تعليمية
الصفحة 1 من 5
```

### التفاعل:
- تحديث الكورسات عند تغيير الصفحة
- العودة لأعلى الصفحة عند التنقل
- إعادة تعيين للصفحة الأولى عند تغيير الفلاتر

## مثال على البيانات المُرجعة:
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
    ],
    "per_page": 15,
    "total": 63,
    "last_page": 5,
    "from": 1,
    "to": 15,
    "next_page_url": "http://...?page=2",
    "prev_page_url": null
  }
}
```

## الملفات المُحدثة:
1. `src/services/api/courses.service.js` - إضافة getAllCoursesPaginated
2. `src/services/homeApiService.js` - إضافة getAllCoursesPaginated  
3. `src/pages/courses/AllCoursesPage.jsx` - التحديث الكامل للـ pagination

## التغييرات الرئيسية:

### في `courses.service.js`:
- **endpoint جديد**: `/courses` بدلاً من `/courses/all`
- **pagination support**: معلمات page و per_page
- **نفس data transformation**: الحفاظ على UI format

### في `AllCoursesPage.jsx`:
- **currentPage state**: لتتبع الصفحة الحالية
- **pagination controls**: أزرار السابق/التالي وأرقام الصفحات
- **useEffect dependency**: إعادة جلب عند تغيير currentPage
- **scroll to top**: العودة لأعلى عند تغيير الصفحة
- **filter reset**: العودة للصفحة الأولى عند تغيير الفلاتر

## كيفية الاختبار:
1. تشغيل التطبيق: `npm start`
2. الانتقال إلى `/courses`
3. ستظهر 15 كورس في الصفحة الأولى
4. استخدام أزرار التنقل للانتقال بين الصفحات
5. تجربة الفلترة (ستعيد للصفحة الأولى)
6. التحقق من console للـ debugging info

## النتائج المتوقعة:
- ✅ عرض 15 كورس في كل صفحة
- ✅ أزرار تنقل واضحة ومتجاوبة
- ✅ معلومات الصفحة الحالية والإجمالي
- ✅ فلترة تعمل مع الصفحة الحالية
- ✅ تحميل سريع لكل صفحة
- ✅ UI متجاوب مع RTL support
- ✅ animation عند تحميل الكورسات

## Demo التفاعلي:
✅ يمكنك تجربة الـ Demo أعلاه لرؤية كيف تعمل pagination

تم إكمال التحديث بنجاح! 🎉