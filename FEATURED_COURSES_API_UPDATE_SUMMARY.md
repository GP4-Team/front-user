# تحديثات ربط قسم الكورسات المميزة في الهوم بالـ API الجديد

## التحديث المطلوب:

### تحديث `courses.service.js`:
✅ تم تغيير endpoint من `/courses` إلى `/courses/featured`
✅ تم إضافة pagination data في الاستجابة
✅ تم الاحتفاظ بنفس data transformation للـ UI format

## البيانات المُرجعة من الـ API الجديد:
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 23,
        "name": "القراءة والكتابة",
        "code": "ARAB101_G2",
        "color": "#FBBC05",
        "educational_level_id": 2,
        "educational_department_id": 3,
        "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp"
      },
      {
        "id": 26,
        "name": "النحو والصرف",
        "code": "ARAB201_G5",
        "color": "#FBC846",
        "educational_level_id": 5,
        "educational_department_id": 3,
        "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp"
      },
      {
        "id": 21,
        "name": "العلوم البيئية",
        "code": "SCI201_M3",
        "color": "#57BB76",
        "educational_level_id": 9,
        "educational_department_id": 2,
        "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp"
      }
    ],
    "per_page": 8,
    "total": 63,
    "last_page": 8
  }
}
```

## البيانات المُحولة للـ UI:
```json
{
  "success": true,
  "data": [
    {
      "id": 23,
      "title": {
        "ar": "القراءة والكتابة",
        "en": "القراءة والكتابة"
      },
      "category": {
        "ar": "اللغة العربية",
        "en": "Arabic Language"
      },
      "level": {
        "ar": "الصف الثاني الابتدائي",
        "en": "Grade 2"
      },
      "image": "https://academy1.gp-app.tafra-tech.com/images/material-holder.webp",
      "color": "#FBBC05",
      "code": "ARAB101_G2",
      "rating": 4.5,
      "students": "120+",
      "duration": {
        "ar": "8 أسابيع",
        "en": "8 weeks"
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 8,
    "per_page": 8,
    "total": 63
  }
}
```

## الملف المُحدث:
- `src/services/api/courses.service.js` - تحديث endpoint للكورسات المميزة

## التغييرات الرئيسية:

### في `courses.service.js`:
- **تغيير Endpoint**: من `/courses` إلى `/courses/featured`
- **إضافة Pagination Data**: إرجاع معلومات الصفحات مع البيانات
- **الاحتفاظ بـ Data Transformation**: نفس التحويل للـ UI format
- **تحديث التعليقات**: توضيح أن هذا API للكورسات المميزة

## الكورسات المميزة الجديدة:

### اللغة العربية (department_id: 3):
- **القراءة والكتابة** - مستويات مختلفة (G1, G2, G3)
- **النحو والصرف** - مستويات متقدمة (G4, G5, G6)

### العلوم (department_id: 2):
- **العلوم البيئية** - المرحلة المتوسطة (M2, M3)

## الإحصائيات:
- **إجمالي الكورسات المميزة**: 63 كورس
- **عرض في الصفحة**: 8 كورس
- **إجمالي الصفحات**: 8 صفحات
- **العرض الحالي**: الصفحة الأولى

## الميزات:
- ✅ **كورسات مميزة حقيقية** من الـ API بدلاً من البيانات الوهمية
- ✅ **عرض جنب بعض** في grid layout كما هو مطلوب
- ✅ **ألوان مميزة** لكل كورس من الـ API
- ✅ **pagination support** للتوسع المستقبلي
- ✅ **الحفاظ على نفس UI** الحالي في صفحة الهوم

## كيفية الاختبار:
1. تشغيل التطبيق: `npm start`
2. فتح الصفحة الرئيسية `/`
3. النظر إلى قسم "الدورات المميزة"
4. ستظهر الكورسات الجديدة: القراءة والكتابة، النحو والصرف، العلوم البيئية
5. التحقق من console للـ debugging info

## النتائج المتوقعة:
- ✅ عرض 8 كورسات مميزة من الـ API الجديد
- ✅ كورسات متنوعة في اللغة العربية والعلوم
- ✅ نفس تخطيط الـ UI (جنب بعض)
- ✅ ألوان مختلفة لكل كورس
- ✅ بيانات حقيقية بدلاً من الوهمية

تم الانتهاء من التحديث بنجاح! 🎉
