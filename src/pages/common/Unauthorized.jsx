// src/pages/common/Unauthorized.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center">
        <div className="bg-red-100 inline-block p-4 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <h2 className="text-xl font-medium mt-2 mb-6">
          You don't have permission to access this page
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Please contact your administrator if you believe this is an error or
          return to the dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go Back
          </button>
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
