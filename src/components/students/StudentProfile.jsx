// components/students/StudentProfile.jsx
import React from "react";
import { Link } from "react-router-dom";

// Note: We're using the LanguageContext from your app
// We'll handle the case where t might not be available

const StudentProfile = ({ student, exams, currentCourses }) => {
  // Default text function if translation isn't available
  const defaultT = (key) => {
    const translations = {
      noStudentData: "No student data available",
      home: "Home",
      profile: "Profile",
      department: "Department",
      level: "Level",
      gpa: "GPA",
      status: "Status",
      academicProgress: "Academic Progress",
      creditsCompleted: "Credits Completed",
      cumulativeGPA: "Cumulative GPA",
      currentCourses: "Current Courses",
      upcomingExams: "Upcoming Exams",
      examHistory: "Exam History",
      course: "Course",
      date: "Date",
      score: "Score",
      status: "Status",
      credits: "credits",
      instructor: "Instructor",
    };
    return translations[key] || key;
  };

  // Get translations - first try from context, fall back to default
  const t = (key) => defaultT(key);

  // Default to LTR if not specified
  const isRtl = false;

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p>{t("noStudentData")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex space-x-2 text-gray-600">
          <li>
            <Link to="/dashboard" className="hover:text-gray-900">
              {t("home")}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-900 font-medium">{t("profile")}</li>
        </ul>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 p-6 text-center">
            <img
              src={student.photo}
              alt={student.name}
              className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-white shadow"
            />
            <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-gray-600 mb-4">{student.id}</p>

            <div className="flex items-center justify-center mb-2">
              <span className="text-gray-700 mr-2">✉</span> {/* Email icon */}
              <span>{student.email}</span>
            </div>

            <div className="flex items-center justify-center mb-4">
              <span className="text-gray-700 mr-2">📱</span> {/* Phone icon */}
              <span>{student.phone}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs text-gray-500">{t("department")}</p>
                <p className="font-semibold text-gray-800">
                  {student.department}
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs text-gray-500">{t("level")}</p>
                <p className="font-semibold text-gray-800">{student.level}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs text-gray-500">{t("gpa")}</p>
                <p className="font-semibold text-green-600">{student.gpa}</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-xs text-gray-500">{t("status")}</p>
                <p className="font-semibold text-green-600">{student.status}</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className={`${isRtl ? "ml-2" : "mr-2"}`}>🎓</span>{" "}
                {/* Graduation cap icon */}
                {t("academicProgress")}
              </h3>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{t("creditsCompleted")}</span>
                  <span className="font-bold">
                    {student.totalCredits} / {student.requiredCredits}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className="bg-green-500 rounded-full h-4"
                    style={{
                      width: `${
                        (student.totalCredits / student.requiredCredits) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow-sm border-t-4 border-green-400">
                  <div className="text-3xl font-bold text-gray-800">
                    {student.gpa}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("cumulativeGPA")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm border-t-4 border-blue-400">
                  <div className="text-3xl font-bold text-gray-800">
                    {currentCourses.length}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("currentCourses")}
                  </div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm border-t-4 border-purple-400">
                  <div className="text-3xl font-bold text-gray-800">
                    {exams.filter((exam) => exam.status === "قادم").length}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("upcomingExams")}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className={`${isRtl ? "ml-2" : "mr-2"}`}>📋</span>{" "}
                {/* Clipboard icon */}
                {t("examHistory")}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th
                        className={`px-4 py-2 ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      >
                        {t("course")}
                      </th>
                      <th
                        className={`px-4 py-2 ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      >
                        {t("date")}
                      </th>
                      <th
                        className={`px-4 py-2 ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      >
                        {t("score")}
                      </th>
                      <th
                        className={`px-4 py-2 ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      >
                        {t("status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr key={exam.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{exam.course}</td>
                        <td className="px-4 py-3">
                          {new Date(exam.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {exam.score !== null ? (
                            <span className="font-medium">
                              {exam.score} / {exam.maxScore}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              exam.status === "مكتمل" ||
                              exam.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className={`${isRtl ? "ml-2" : "mr-2"}`}>📚</span>{" "}
            {/* Book icon */}
            {t("currentCourses")}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{course.name}</h4>
                    <p className="text-sm text-gray-600">
                      {course.code} · {course.credits} {t("credits")}
                    </p>
                  </div>
                  <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-sm">
                    <span className="text-gray-800 font-bold">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm mb-2">
                    <span className="text-gray-500">{t("instructor")}:</span>{" "}
                    {course.instructor}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
