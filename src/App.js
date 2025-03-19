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

// Layout components

import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";

// Auth pages
import AuthPage from "./pages/auth/AuthPage.jsx";

// Main pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/common/HomePage.jsx";
import Profile from "./pages/user/ProfilePage.jsx";

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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <Routes>
              {/* تغيير المسار الرئيسي لعرض الصفحة الرئيسية */}
              <Route path="/" element={<Home />} />

              {/* نقل مسار تسجيل الدخول */}
              <Route path="/auth" element={<AuthPage />} />

              {/* باقي المسارات */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/server-error" element={<ServerError />} />
              <Route path="/not-found" element={<NotFound />} />

              {/* المسارات المحمية */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                {/* صفحات نظام الامتحانات */}
                <Route path="/exams" element={<MyExamsPage />} />
                <Route path="/exams/:examId" element={<ExamDetailsPage />} />
                <Route
                  path="/exams/:examId/questions"
                  element={<ExamQuestionsPage />}
                />
                <Route
                  path="/exams/:examId/results"
                  element={<ExamResultsPage />}
                />
              </Route>

              {/* مسار احتياطي لتوجيه المسارات غير الموجودة */}
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
