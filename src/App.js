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

// Wrap component with MainLayout
const withMainLayout = (Component) => {
  return (props) => (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <ToastProvider>
              <AuthProvider>
                <Routes>
                  {/* تغيير المسار الرئيسي لعرض الصفحة الرئيسية */}
                  <Route path="/" element={withMainLayout(Home)()} />

                  {/* نقل مسار تسجيل الدخول */}
                  <Route path="/auth" element={withMainLayout(AuthPage)()} />

                  {/* باقي المسارات */}
                  <Route path="/unauthorized" element={withMainLayout(Unauthorized)()} />
                  <Route path="/server-error" element={withMainLayout(ServerError)()} />
                  <Route path="/not-found" element={withMainLayout(NotFound)()} />

                  {/* المسارات المحمية - تم تعطيلها مؤقتاً لأغراض التطوير */}
                  {/* للتطوير فقط: تم إزالة ProtectedRoute مؤقتاً */}
                  {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/dashboard" element={withMainLayout(Dashboard)()} />
                  <Route path="/profile" element={withMainLayout(Profile)()} />

                  {/* Course Routes */}
                  <Route path="/courses" element={withMainLayout(AllCoursesPage)()} />
                  <Route
                    path="/courses/enrolled"
                    element={withMainLayout(EnrolledCoursesPage)()}
                  />
                  {/* تغيير مسارات الكورس لتكون: */}
                  {/* 1. صفحة معلومات الكورس (الجديدة) */}
                  <Route
                    path="/courses/:courseId"
                    element={withMainLayout(CourseInfoPage)()}
                  />
                  {/* 2. صفحة محتوى الكورس (القديمة) */}
                  <Route
                    path="/courses/:courseId/content"
                    element={withMainLayout(CourseDetailPage)()}
                  />

                  {/* صفحات نظام الامتحانات */}
                  <Route path="/exams" element={withMainLayout(MyExamsPage)()} />
                  <Route path="/exams/:examId" element={withMainLayout(ExamDetailsPage)()} />
                  <Route
                    path="/exams/:examId/questions"
                    element={withMainLayout(ExamQuestionsPage)()}
                  />
                  <Route
                    path="/exams/:examId/results"
                    element={withMainLayout(ExamResultsPage)()}
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
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
