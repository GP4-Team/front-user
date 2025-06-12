// src/data/mockExamsData/statistics.js

/**
 * إحصائيات الطالب الوهمية
 */
export const mockExamStatistics = {
  totalExams: 15,
  completedExams: 8,
  averageScore: 78.5,
  highestScore: 95,
  pendingExams: 7,
  registered_courses_count: 5,
  passRate: 87.5,
  totalTimeSpent: 420, // بالدقائق
  lastExamDate: '2025-06-10T14:30:00Z',
  improvement: {
    thisMonth: 5.2,
    lastMonth: 2.8
  },
  strongSubjects: ['الرياضيات', 'الفيزياء'],
  weakSubjects: ['الكيمياء', 'اللغة الإنجليزية'],
  monthlyProgress: [
    { month: 'يناير', score: 70, examsCount: 2 },
    { month: 'فبراير', score: 73, examsCount: 3 },
    { month: 'مارس', score: 76, examsCount: 2 },
    { month: 'أبريل', score: 78, examsCount: 4 },
    { month: 'مايو', score: 82, examsCount: 3 },
    { month: 'يونيو', score: 85, examsCount: 2 }
  ],
  recentActivity: [
    {
      date: '2025-06-10',
      action: 'completed_exam',
      examName: 'امتحان الرياضيات - الهندسة التحليلية',
      score: 85
    },
    {
      date: '2025-06-08',
      action: 'started_exam',
      examName: 'امتحان الفيزياء - الكهرباء والمغناطيسية'
    },
    {
      date: '2025-06-05',
      action: 'completed_exam',
      examName: 'امتحان الفيزياء - الحركة والقوى',
      score: 72
    }
  ],
  streakInfo: {
    currentStreak: 5, // أيام متتالية من النشاط
    longestStreak: 12,
    lastActiveDate: '2025-06-10'
  },
  timeAnalysis: {
    averageTimePerExam: 52.5, // دقيقة
    fastestCompletion: 35, // دقيقة
    slowestCompletion: 75, // دقيقة
    preferredTimeSlot: 'morning' // morning, afternoon, evening
  }
};
