# قائمة جميع API Endpoints المستخدمة في المشروع

## 🔗 Base URL
```
https://academy1.gp-app.tafra-tech.com/api
```

## 📚 Course APIs

### 1. Get All Courses (Paginated)
```http
GET /courses
```
**Parameters:**
- `page` - رقم الصفحة (default: 1)
- `per_page` - عدد العناصر في الصفحة (default: 15)

**استخدام:** AllCoursesPage, HomePage

---

### 2. Get Featured Courses
```http
GET /courses/featured
```
**Parameters:**
- `page` - رقم الصفحة (default: 1)
- `per_page` - عدد الكورسات (default: 8)

**استخدام:** HomePage

---

### 3. Get Filtered Courses
```http
GET /courses/filter
```
**Parameters:**
- `page` - رقم الصفحة
- `per_page` - عدد العناصر في الصفحة
- `education_level_ids` - مصفوفة من IDs المستويات التعليمية
- `level_id` - ID المستوى (للفلترة الهرمية)
- `category_id` - ID الفئة (للفلترة الهرمية)

**استخدام:** AllCoursesPage (فلترة)

---

### 4. Search Courses
```http
GET /courses/search/{query}
```
**أو**
```http
GET /courses/search
```
**Parameters:**
- `page` - رقم الصفحة
- `per_page` - عدد العناصر في الصفحة

**استخدام:** AllCoursesPage (بحث)

---

### 5. Get Course Details
```http
GET /courses/{courseId}
```
**استخدام:** CourseInfoPage, CourseDetailPage

---

### 6. Get Education Levels
```http
GET /courses/education-levels
```
**Parameters:**
- `page` - رقم الصفحة
- `per_page` - عدد العناصر

**استخدام:** AllCoursesPage (فلترة المستويات)

---

## 📖 Materials APIs

### 7. Get Course Materials/Content
```http
GET /materials/course/{courseId}
```
**استخدام:** CourseDetailPage

**Response Example:**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "شرح فيديو للمحاضرة",
        "type": "YoutubeVideo",
        "description": "فيديو توضيحي يشرح المفاهيم الأساسية للدرس",
        "duration_in_seconds": 3061,
        "number_of_pages": null,
        "course": {
          "name": "الرياضيات الأساسية",
          "code": "MATH101_G1",
          "color": "#4285F4"
        },
        "user": {
          "name": "م. رانيا أشرف السيد"
        },
        "course_idea": {
          "id": 8,
          "name": "تطبيقات عملية",
          "description": null
        },
        "media_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ],
    "total": 6,
    "per_page": 15,
    "current_page": 1,
    "last_page": 1
  }
}
```

---

### 8. Get Material Details
```http
GET /materials/{materialId}
```
**استخدام:** CourseDetailPage (تفاصيل المادة المحددة)

**Response Example:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "ملف المحاضرة",
    "type": "Pdf",
    "description": "ملف PDF يحتوي على المحاضرة كاملة",
    "duration_in_seconds": null,
    "number_of_pages": 22,
    "course": {
      "name": "الرياضيات الأساسية",
      "code": "MATH101_G1",
      "color": "#4285F4"
    },
    "user": {
      "name": "م. أيمن سعيد الجندي"
    },
    "course_idea": {
      "id": 7,
      "name": "التكامل",
      "description": null
    },
    "media_url": null
  }
}
```

---

## 👤 User/Profile APIs

### 9. Get Student Profile
```http
GET /api/student/profile
```
**استخدام:** ProfilePage

---

### 10. Get Student Registered Courses
```http
GET /api/student/registered-courses
```
**استخدام:** ProfilePage (قسم المقررات)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "course_name": "الرياضيات الأساسية",
      "course_code": "MATH101",
      "semester": "Fall 2024",
      "credits": 3,
      "grade": "A",
      "instructor": "د. أحمد محمد",
      "status": "completed"
    }
  ]
}
```

---

## 🧪 Exams APIs

### 10. Get Online Exams
```http
GET /exams/online
```
**استخدام:** MyExamsPage, HomePage

---

## 🔐 Authentication APIs

### 11. Login
```http
POST /login
```
**Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

### 12. Register
```http
POST /register
```
**Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

---

### 13. Logout
```http
POST /logout
```

---

### 14. Get User Info
```http
GET /me
```

---

## 📊 Material Progress APIs

### 15. Update Material Progress
```http
POST /materials/{materialId}/progress
```
**Body:**
```json
{
  "progress": 50,
  "completed": false
}
```

---

### 16. Get Material Progress
```http
GET /materials/{materialId}/progress
```

---

### 17. Mark Material as Completed
```http
POST /materials/{materialId}/complete
```

---

## 🎯 Course Enrollment APIs

### 18. Enroll in Course
```http
POST /courses/{courseId}/enroll
```

---

### 19. Unenroll from Course
```http
DELETE /courses/{courseId}/enroll
```

---

### 20. Get Enrolled Courses
```http
GET /courses/enrolled
```

---

## ⭐ Rating & Reviews APIs

### 21. Rate Course
```http
POST /courses/{courseId}/rate
```
**Body:**
```json
{
  "rating": 5,
  "review": "دورة ممتازة ومفيدة جداً"
}
```

---

### 22. Get Course Reviews
```http
GET /courses/{courseId}/reviews
```

---

### 23. Rate Material
```http
POST /materials/{materialId}/rate
```

---

## 🏆 Progress Tracking APIs

### 24. Get Course Progress
```http
GET /courses/{courseId}/progress
```

---

### 25. Get User Statistics
```http
GET /user/statistics
```

---

## 💬 Comments APIs

### 26. Get Material Comments
```http
GET /materials/{materialId}/comments
```

---

### 27. Add Comment to Material
```http
POST /materials/{materialId}/comments
```
**Body:**
```json
{
  "comment": "شرح ممتاز ومفهوم"
}
```

---

## 📁 Download APIs

### 28. Download Material File
```http
GET /materials/{materialId}/download
```
**Response:** File blob

---

### 29. Stream Video Material
```http
GET /materials/{materialId}/stream
```

---

## 📋 Categories APIs

### 30. Get Course Categories
```http
GET /courses/education-categories
```

---

### 31. Get Courses by Level
```http
GET /courses/by-level/{levelId}
```

---

## 🔍 Search & Filter Helpers

### 32. Get Material Attachments
```http
GET /materials/{materialId}/attachments
```

---

## 📝 ملاحظات مهمة:

### Headers المطلوبة:
```javascript
{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer {token}', // للـ APIs المحمية
  'X-Requested-With': 'XMLHttpRequest'
}
```

### أنواع المواد المدعومة:
- `YoutubeVideo` - فيديوهات يوتيوب
- `Video` - فيديوهات محلية  
- `Audio` - ملفات صوتية
- `Pdf` - ملفات PDF
- `Image` - صور
- `Document` - مستندات

### حالات الاستجابة:
- `200` - نجح الطلب
- `401` - غير مصرح (تحتاج تسجيل دخول)
- `403` - ممنوع (ليس لديك صلاحية)
- `404` - غير موجود
- `422` - خطأ في التحقق من البيانات
- `500` - خطأ في الخادم

### معالجة الأخطاء:
جميع الـ APIs تستخدم `handleApiError` في `services/utils/errorHandler.js`

### Pagination:
معظم الـ APIs تدعم pagination مع المعاملات:
- `page` - رقم الصفحة
- `per_page` - عدد العناصر في كل صفحة
- `total` - العدد الإجمالي
- `last_page` - رقم الصفحة الأخيرة

---

## 🏗️ Services المستخدمة:

1. **CoursesService** - `src/services/api/courses.service.js`
2. **MaterialsService** - `src/services/api/materials.service.js`  
3. **AuthService** - `src/services/api/auth.service.js`
4. **UserService** - `src/services/api/user.service.js`
5. **ExamsService** - `src/services/api/exams.service.js`

---

**📍 جميع الـ APIs تستخدم Base URL:**
`https://academy1.gp-app.tafra-tech.com/api`

## ✨ تحديث جديد - تم إضافة:
- **API جديد:** GET /api/student/registered-courses
- **الهدف:** جلب جميع المقررات المسجلة للطالب
- **الاستخدام:** قسم المقررات في صفحة البروفايل
- **البيانات:** اسم المقرر، ID، السيمستر، الدرجات، المدرس
