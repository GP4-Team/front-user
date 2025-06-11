# حل مشكلة قاعدة البيانات - student_course_enrollments

## المشكلة
خطأ: `SQLSTATE[42P01]: Undefined table: student_course_enrollments`

## الحلول المقترحة

### 1. إنشاء الجدول المفقود

```sql
-- إنشاء جدول التسجيل في الكورسات
CREATE TABLE IF NOT EXISTS student_course_enrollments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    course_id BIGINT UNSIGNED NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed', 'dropped', 'suspended') DEFAULT 'active',
    progress DECIMAL(5,2) DEFAULT 0.00,
    completion_date TIMESTAMP NULL,
    grade DECIMAL(5,2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_student_id (student_id),
    INDEX idx_course_id (course_id),
    INDEX idx_status (status),
    INDEX idx_enrolled_at (enrolled_at),
    
    -- Unique constraint to prevent duplicate enrollments
    UNIQUE KEY unique_student_course (student_id, course_id)
);
```

### 2. Laravel Migration

إذا كنت تستخدم Laravel، أنشئ migration جديد:

```bash
php artisan make:migration create_student_course_enrollments_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('student_course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->timestamp('enrolled_at')->useCurrent();
            $table->enum('status', ['active', 'completed', 'dropped', 'suspended'])->default('active');
            $table->decimal('progress', 5, 2)->default(0.00);
            $table->timestamp('completion_date')->nullable();
            $table->decimal('grade', 5, 2)->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['student_id', 'status']);
            $table->index(['course_id', 'status']);
            $table->index('enrolled_at');
            
            // Unique constraint
            $table->unique(['student_id', 'course_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_course_enrollments');
    }
};
```

### 3. Model Laravel (اختياري)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentCourseEnrollment extends Model
{
    protected $fillable = [
        'student_id',
        'course_id',
        'enrolled_at',
        'status',
        'progress',
        'completion_date',
        'grade'
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'completion_date' => 'datetime',
        'progress' => 'decimal:2',
        'grade' => 'decimal:2',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
```

### 4. بيانات تجريبية (Seeder)

```php
<?php

namespace Database\Seeders;

use App\Models\StudentCourseEnrollment;
use App\Models\User;
use App\Models\Course;
use Illuminate\Database\Seeder;

class StudentCourseEnrollmentSeeder extends Seeder
{
    public function run()
    {
        $students = User::where('role', 'student')->take(10)->get();
        $courses = Course::take(5)->get();

        foreach ($students as $student) {
            foreach ($courses->random(3) as $course) {
                StudentCourseEnrollment::create([
                    'student_id' => $student->id,
                    'course_id' => $course->id,
                    'enrolled_at' => now()->subDays(rand(1, 30)),
                    'status' => collect(['active', 'completed'])->random(),
                    'progress' => rand(0, 100),
                    'grade' => rand(60, 100)
                ]);
            }
        }
    }
}
```

## خطوات الحل السريع

### الطريقة الأولى: إنشاء الجدول يدوياً
1. افتح phpMyAdmin أو أي أداة إدارة قاعدة بيانات
2. اختر قاعدة البيانات الخاصة بك
3. نفذ الاستعلام SQL أعلاه

### الطريقة الثانية: استخدام Laravel Migration
```bash
# إنشاء ملف migration
php artisan make:migration create_student_course_enrollments_table

# تعديل الملف بالكود أعلاه ثم تنفيذ
php artisan migrate

# إنشاء بيانات تجريبية (اختياري)
php artisan make:seeder StudentCourseEnrollmentSeeder
php artisan db:seed --class=StudentCourseEnrollmentSeeder
```

### الطريقة الثالثة: التحقق من وجود الجدول في الكود
```php
// في Backend - يمكن إضافة هذا للتحقق من وجود الجدول
if (!Schema::hasTable('student_course_enrollments')) {
    throw new Exception('Table student_course_enrollments does not exist. Please run migrations.');
}
```

## ملاحظات مهمة

1. **تأكد من وجود الجداول المرتبطة**: `users` و `courses`
2. **تحقق من صحة المفاتيح الخارجية**
3. **قم بإنشاء فهارس للأداء الأفضل**
4. **أضف قيود unique لمنع التسجيل المكرر**

## إعدادات إضافية للـ API

إذا كان الجدول موجود ولكن لا يزال هناك خطأ، تحقق من:

1. **أذونات قاعدة البيانات**
2. **اتصال قاعدة البيانات في ملف .env**
3. **تحديد اسم قاعدة البيانات الصحيح**
4. **التأكد من أن المستخدم له صلاحيات SELECT على الجدول**
