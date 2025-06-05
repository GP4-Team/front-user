# تحديثات ربط فلتر المستويات التعليمية بالـ API الحقيقي

## التحديثات المطلوبة:

### 1. تحديث `courses.service.js`:
✅ تم تحديث `getEducationLevels()` لتستدعي `/courses/education-levels` مع pagination
✅ تم إضافة data transformation لتحويل البيانات من API format إلى UI format
✅ تم إضافة helper method `mapEducationLevelToFilterId()` لتحويل أسماء المستويات إلى filter IDs
✅ تم إضافة pagination data في الاستجابة

### 2. تحديث `homeApiService.js`:
✅ تم تحديث `getEducationLevels()` لدعم المعلمات الإضافية
✅ تم تحديث اسم الـ method من `getLevels()` إلى `getEducationLevels()`

### 3. تحديث `AllCoursesPage.jsx`:
✅ تم إضافة state للمستويات التعليمية `educationLevels`
✅ تم إضافة loading state للمستويات `isLoadingLevels`
✅ تم إضافة useEffect لجلب المستويات من الـ API
✅ تم تحديث UI الفلتر لعرض المستويات ديناميكياً
✅ تم إضافة ألوان للمستويات التعليمية
✅ تم إضافة fallback للبيانات الوهمية في حالة فشل الـ API

## البيانات المُرجعة من الـ API:
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 10,
        "name": "الصف الأول الثانوي",
        "code": "S1",
        "color": "#338CFF",
        "educational_category_id": 2,
        "category": {
          "id": 2,
          "name": "التعليم الثانوي"
        }
      },
      {
        "id": 11,
        "name": "الصف الثاني الثانوي",
        "code": "S2",
        "color": "#3357FF",
        "educational_category_id": 2,
        "category": {
          "id": 2,
          "name": "التعليم الثانوي"
        }
      },
      {
        "id": 12,
        "name": "الصف الثالث الثانوي",
        "code": "S3",
        "color": "#5733FF",
        "educational_category_id": 2,
        "category": {
          "id": 2,
          "name": "التعليم الثانوي"
        }
      }
    ],
    "per_page": 15,
    "total": 25,
    "last_page": 2
  }
}
```

## البيانات المُحولة للـ UI:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "الصف الأول الابتدائي",
      "code": "G1",
      "color": "#FF5733",
      "educational_category_id": 1,
      "category": {
        "id": 1,
        "name": "التعليم الأساسي"
      },
      "levelId": "grade1"
    },
    {
      "id": 10,
      "name": "الصف الأول الثانوي",
      "code": "S1",
      "color": "#338CFF",
      "educational_category_id": 2,
      "category": {
        "id": 2,
        "name": "التعليم الثانوي"
      },
      "levelId": "grade10"
    },
    {
      "id": 13,
      "name": "المستوى الأول",
      "code": "U1",
      "color": "#8C33FF",
      "educational_category_id": 3,
      "category": {
        "id": 3,
        "name": "التعليم الجامعي"
      },
      "levelId": "university13"
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 2,
    "per_page": 15,
    "total": 25
  }
}
```

## الملفات المُحدثة:
1. `src/services/api/courses.service.js` - تحديث استدعاء المستويات التعليمية
2. `src/services/homeApiService.js` - تحديث service method
3. `src/pages/courses/AllCoursesPage.jsx` - ربط الفلتر بالـ API الحقيقي

## التغييرات الرئيسية:

### في `courses.service.js`:
- استدعاء `/courses/education-levels` مع pagination
- تحويل البيانات لتتوافق مع UI format المطلوب
- mapping ذكي للمستويات التعليمية إلى filter IDs:
  - المرحلة الابتدائية: `grade1`, `grade2`, ..., `grade6`
  - المرحلة الإعدادية: `grade7`, `grade8`, `grade9`
  - المرحلة الثانوية: `grade10`, `grade11`, `grade12`
  - المرحلة الجامعية: `university13`, `university14`, `university15`

### في `AllCoursesPage.jsx`:
- جلب جميع المستويات التعليمية من جميع الصفحات (25 مستوى)
- عرض المستويات ديناميكياً في الفلتر
- إضافة ألوان مميزة لكل مستوى
- loading state أثناء جلب المستويات
- fallback للبيانات الوهمية في حالة فشل الـ API

## الميزات الجديدة:
- 🎨 **ألوان مميزة** لكل مستوى تعليمي من الـ API
- 📚 **25 مستوى تعليمي** من الابتدائي حتى الجامعي
- 🔄 **تحديث ديناميكي** للفلتر بناءً على بيانات الـ API
- ⚡ **loading states** أثناء تحميل المستويات
- 🛡️ **Error handling** مع fallback للبيانات الوهمية
- 🎯 **فلترة دقيقة** باستخدام levelId المناسب

## المستويات التعليمية المعروضة:
### التعليم الأساسي:
- الصف الأول الابتدائي → السادس الابتدائي
- الصف الأول الإعدادي → الثالث الإعدادي

### التعليم الثانوي:
- الصف الأول الثانوي
- الصف الثاني الثانوي
- الصف الثالث الثانوي

### التعليم الجامعي:
- المستوى الأول
- المستوى الثاني
- المستوى الثالث

## كيفية الاختبار:
1. تشغيل التطبيق: `npm start`
2. الانتقال إلى صفحة `/courses`
3. التحقق من عرض جميع المستويات التعليمية في الفلتر
4. اختبار الفلترة بالمستويات المختلفة
5. التحقق من الألوان والـ console logs

## النتائج المتوقعة:
- ✅ عرض 25 مستوى تعليمي من الـ API
- ✅ ألوان مميزة لكل مستوى
- ✅ فلترة صحيحة للكورسات حسب المستوى المحدد
- ✅ تحميل سريع مع pagination handling
- ✅ UI responsive ومتناسق مع التصميم الحالي
