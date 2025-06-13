// src/App.js - Fixed version for React Router v6
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { TenantProvider } from "./contexts/TenantContext.jsx";
import ErrorBoundary from "./components/ui/feedback/ErrorBoundary";
import PageTransition from "./components/ui/PageTransition";
import MainLayout from "./components/layout/MainLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AuthPage from "./pages/auth/AuthPage.jsx";
import EnrolledCoursesPage from "./pages/courses/EnrolledCoursesPage.jsx";
import CourseDetailPage from "./pages/courses/CourseDetailPage.jsx";
import CourseInfoPage from "./pages/courses/CourseInfoPage.jsx";
import AllCoursesPage from "./pages/courses/AllCoursesPage.jsx";
import NotFound from "./pages/common/NotFound.jsx";
import Unauthorized from "./pages/common/Unauthorized.jsx";
import ServerError from "./pages/common/ServerError.jsx";
import AboutUs from "./pages/common/AboutUs.jsx";
import ContactUs from "./pages/common/ContactUs.jsx";
import MyExamsPage from "./pages/exams/MyExamsPage.jsx";
import ExamDetailsPage from "./pages/exams/ExamDetailsPage.jsx";
import ExamQuestionsPage from "./pages/exams/ExamQuestionsPage.jsx";
import ExamResultsPage from "./pages/exams/ExamResultsPage.jsx";
import ExamReviewPage from "./pages/exams/ExamReviewPage.jsx";
import ExamPage from "./pages/exam/ExamPage.jsx";
import AIWeaknessPortal from "./pages/student/AIWeaknessPortal.jsx";
import PrivateRoute from "./middleware/PrivateRoute.jsx";
import "./App.css";
import "./styles/ExamStyles.css";

import Home from "./pages/common/HomePage.jsx";

// Lazy loaded components
const Profile = React.lazy(() => import("./pages/user/ProfilePage.jsx"));

/**
 * Root layout component with page transition
 * This wraps all context providers in the correct order
 * Ensuring PageTransition has access to the Router context
 */
const RootLayout = () => {
  const location = useLocation();
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TenantProvider>
          {/* ToastProvider removed as requested */}
          <AuthProvider>
            <PageTransition pathname={location.pathname} />
            <Outlet />
          </AuthProvider>
          {/* ToastProvider removed as requested */}
        </TenantProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

// Create router with routes configuration and enable all v7 future flags
const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        // Authentication Routes
        {
          path: "/auth",
          element: <AuthPage />,
        },
        // Redirect old routes to auth page
        {
          path: "/login",
          element: <Navigate to="/auth?mode=login" replace />,
        },
        {
          path: "/register",
          element: <Navigate to="/auth?mode=register" replace />,
        },

        // Public Routes with Guest Layout
        {
          path: "/",
          element: (
            <GuestLayout>
              <Home />
            </GuestLayout>
          ),
        },
        {
          path: "/courses",
          element: (
            <GuestLayout>
              <AllCoursesPage />
            </GuestLayout>
          ),
        },
        {
          path: "/courses/:courseId",
          element: (
            <GuestLayout>
              <CourseInfoPage />
            </GuestLayout>
          ),
        },
        {
          path: "/exams",
          element: (
            <GuestLayout>
              <div className="exam-page-background">
                <MyExamsPage />
              </div>
            </GuestLayout>
          ),
        },

        // Protected Routes
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <MainLayout>
                <React.Suspense
                  fallback={
                    <div className="flex justify-center items-center h-96">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  }
                >
                  <Profile />
                </React.Suspense>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/courses/enrolled",
          element: (
            <PrivateRoute>
              <MainLayout>
                <EnrolledCoursesPage />
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/courses/:courseId/content",
          element: (
            <PrivateRoute>
              <MainLayout>
                <CourseDetailPage />
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamDetailsPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/take",
          element: (
            <PrivateRoute>
              <div className="exam-page-background">
                <ExamPage />
              </div>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/questions",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamQuestionsPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/results",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamResultsPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/results/:attemptId",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamResultsPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/review",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamReviewPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/exams/:examId/review/:attemptId",
          element: (
            <PrivateRoute>
              <MainLayout>
                <div className="exam-page-background">
                  <ExamReviewPage />
                </div>
              </MainLayout>
            </PrivateRoute>
          ),
        },
        {
          path: "/student/ai-portal",
          element: (
            <PrivateRoute>
              <MainLayout>
                <AIWeaknessPortal />
              </MainLayout>
            </PrivateRoute>
          ),
        },

        // Help Center Routes
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/privacy",
          element: (
            <GuestLayout>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Privacy Policy
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Coming Soon...
                  </p>
                </div>
              </div>
            </GuestLayout>
          ),
        },
        {
          path: "/terms",
          element: (
            <GuestLayout>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Terms of Service
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Coming Soon...
                  </p>
                </div>
              </div>
            </GuestLayout>
          ),
        },

        // Error Routes
        {
          path: "/unauthorized",
          element: (
            <MainLayout>
              <Unauthorized />
            </MainLayout>
          ),
        },
        {
          path: "/server-error",
          element: (
            <MainLayout>
              <ServerError />
            </MainLayout>
          ),
        },
        {
          path: "/not-found",
          element: (
            <MainLayout>
              <NotFound />
            </MainLayout>
          ),
        },

        // Catch all route
        {
          path: "*",
          element: (
            <MainLayout>
              <NotFound />
            </MainLayout>
          ),
        },
      ],
    },
  ],
  {
    // Enable all future flags to remove warnings
    future: {
      v7_startTransition: true,
      v7_normalizeFormMethod: true,
      v7_prependBasename: true,
      v7_relativeSplatPath: true,
    },
  }
);

/**
 * Main App component
 * Uses Context Providers in the correct order to ensure Router context is available
 */
function App() {
  return (
    <ErrorBoundary>
      {/* Router Provider should be placed at the top level for context access */}
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        }
      />
    </ErrorBoundary>
  );
}

export default App;
