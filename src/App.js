import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import ErrorBoundary from "./components/ui/feedback/ErrorBoundary";
import PageTransition from "./components/ui/PageTransition";

// Layout components
import MainLayout from "./components/layout/MainLayout";

// Auth pages
import AuthPage from "./pages/auth/AuthPage.jsx";

// Main pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/common/HomePage.jsx";
import Profile from "./pages/user/ProfilePage.jsx";

// Course Pages
import EnrolledCoursesPage from "./pages/courses/EnrolledCoursesPage.jsx";
import CourseDetailPage from "./pages/courses/CourseDetailPage.jsx";
import CourseInfoPage from "./pages/courses/CourseInfoPage.jsx";
import AllCoursesPage from "./pages/courses/AllCoursesPage.jsx";

// Error pages
import NotFound from "./pages/common/NotFound.jsx";
import Unauthorized from "./pages/common/Unauthorized.jsx";
import ServerError from "./pages/common/ServerError.jsx";

// Exam System pages
import MyExamsPage from "./pages/exams/MyExamsPage.jsx";
import ExamDetailsPage from "./pages/exams/ExamDetailsPage.jsx";
import ExamQuestionsPage from "./pages/exams/ExamQuestionsPage.jsx";
import ExamResultsPage from "./pages/exams/ExamResultsPage.jsx";

// Protected route component
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

// Wrap component with MainLayout - الكود المعدل لتجنب مشاكل الراوتر
const withMainLayout = (Component) => {
  // سنقوم بإنشاء مكون جديد بدون استخدام مكون MainLayout مباشرة
  return function WrappedComponent(props) {
    return (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    );
  };
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <AuthProvider>
                {/* Page Transition Component */}
                <PageTransition />
                
                <Routes>
                  {/* الصفحة الرئيسية */}
                  <Route path="/" element={<MainLayout><Home /></MainLayout>} />

                  {/* صفحة تسجيل الدخول - بدون MainLayout */}
                  <Route path="/auth" element={<AuthPage />} />

                  {/* صفحات الخطأ */}
                  <Route path="/unauthorized" element={<MainLayout><Unauthorized /></MainLayout>} />
                  <Route path="/server-error" element={<MainLayout><ServerError /></MainLayout>} />
                  <Route path="/not-found" element={<MainLayout><NotFound /></MainLayout>} />

                  {/* المسارات المحمية - تم تعطيلها مؤقتاً لأغراض التطوير */}
                  {/* للتطوير فقط: تم إزالة ProtectedRoute مؤقتاً */}
                  {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                  <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />

                  {/* مسارات الكورسات */}
                  <Route path="/courses" element={<MainLayout><AllCoursesPage /></MainLayout>} />
                  <Route
                    path="/courses/enrolled"
                    element={<MainLayout><EnrolledCoursesPage /></MainLayout>}
                  />
                  {/* صفحة معلومات الكورس */}
                  <Route
                    path="/courses/:courseId"
                    element={<MainLayout><CourseInfoPage /></MainLayout>}
                  />
                  {/* صفحة محتوى الكورس */}
                  <Route
                    path="/courses/:courseId/content"
                    element={<MainLayout><CourseDetailPage /></MainLayout>}
                  />

                  {/* صفحات نظام الامتحانات */}
                  <Route path="/exams" element={<MainLayout><MyExamsPage /></MainLayout>} />
                  <Route path="/exams/:examId" element={<MainLayout><ExamDetailsPage /></MainLayout>} />
                  <Route
                    path="/exams/:examId/questions"
                    element={<MainLayout><ExamQuestionsPage /></MainLayout>}
                  />
                  <Route
                    path="/exams/:examId/results"
                    element={<MainLayout><ExamResultsPage /></MainLayout>}
                  />
                  {/* </Route> */}

                  {/* مسار احتياطي لتوجيه المسارات غير الموجودة */}
                  <Route
                    path="*"
                    element={<Navigate to="/not-found" replace />}
                  />
                </Routes>
              </AuthProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
