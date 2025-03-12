import React, { useState, useEffect } from "react";

const ModernAuth = () => {
  const [activePanel, setActivePanel] = useState("login");
  const [formData, setFormData] = useState({
    login: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    signup: {
      fullName: "",
      email: "",
      phoneNo: "",
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });
  const [errors, setErrors] = useState({
    login: {},
    signup: {},
  });
  const [showPassword, setShowPassword] = useState({
    login: false,
    signup: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (panel, e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [panel]: {
        ...formData[panel],
        [name]: type === "checkbox" ? checked : value,
      },
    });

    // Clear error when field is modified
    if (errors[panel][name]) {
      setErrors({
        ...errors,
        [panel]: {
          ...errors[panel],
          [name]: "",
        },
      });
    }

    // Password strength calculation
    if (panel === "signup" && name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "#f87171";
    if (passwordStrength < 75) return "#FFC107";
    return "#A5D6A7";
  };

  const validateForm = (panel) => {
    const newErrors = {};

    if (panel === "login") {
      if (!formData.login.emailOrUsername.trim()) {
        newErrors.emailOrUsername = "البريد الإلكتروني أو اسم المستخدم مطلوب";
      }

      if (!formData.login.password) {
        newErrors.password = "كلمة المرور مطلوبة";
      }
    } else if (panel === "signup") {
      if (!formData.signup.fullName.trim()) {
        newErrors.fullName = "الاسم الكامل مطلوب";
      }

      if (!formData.signup.email.trim()) {
        newErrors.email = "البريد الإلكتروني مطلوب";
      } else if (!/\S+@\S+\.\S+/.test(formData.signup.email)) {
        newErrors.email = "عنوان البريد الإلكتروني غير صالح";
      }

      if (!formData.signup.phoneNo.trim()) {
        newErrors.phoneNo = "رقم الهاتف مطلوب";
      } else if (!/^\d{10,}$/.test(formData.signup.phoneNo.trim())) {
        newErrors.phoneNo = "رقم الهاتف غير صالح";
      }

      if (!formData.signup.username.trim()) {
        newErrors.username = "اسم المستخدم مطلوب";
      } else if (formData.signup.username.length < 4) {
        newErrors.username = "يجب أن يتكون اسم المستخدم من 4 أحرف على الأقل";
      }

      if (!formData.signup.password) {
        newErrors.password = "كلمة المرور مطلوبة";
      } else if (formData.signup.password.length < 8) {
        newErrors.password = "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل";
      }

      if (!formData.signup.confirmPassword) {
        newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
      } else if (formData.signup.confirmPassword !== formData.signup.password) {
        newErrors.confirmPassword = "كلمات المرور غير متطابقة";
      }

      if (!formData.signup.acceptTerms) {
        newErrors.acceptTerms = "يجب قبول شروط الخدمة";
      }
    }

    setErrors({
      ...errors,
      [panel]: newErrors,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (panel, e) => {
    e.preventDefault();

    if (validateForm(panel)) {
      if (panel === "login") {
        console.log("Login with:", formData.login);

        // Here you would typically make an API call to authenticate
        const token = "simulated-jwt-token";
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            emailOrUsername: formData.login.emailOrUsername,
            rememberMe: formData.login.rememberMe,
          })
        );

        alert("تم تسجيل الدخول بنجاح!");
      } else if (panel === "signup") {
        console.log("Sign up with:", formData.signup);

        // Here you would typically make an API call to register
        const token = "simulated-jwt-token";
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            fullName: formData.signup.fullName,
            email: formData.signup.email,
            username: formData.signup.username,
          })
        );

        alert("تم إنشاء الحساب بنجاح!");
      }
    }
  };

  const toggleShowPassword = (panel) => {
    setShowPassword({
      ...showPassword,
      [panel]: !showPassword[panel],
    });
  };

  // Simplified Logo component
  const EduaraLogo = () => (
    <div className="flex items-center">
      <div className="mr-2">
        <div className="w-3 h-3 rounded-full bg-[#FFC107]"></div>
      </div>
      <h2 className="text-white text-2xl font-bold">Eduara</h2>
      <div className="ml-1 w-16 h-1 bg-[#FFC107] mt-6"></div>
    </div>
  );

  return (
    <div
      dir="rtl"
      className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50"
    >
      {/* Background with educational pattern in logo colors */}
      <div className="fixed inset-0 bg-[#F0F4F8]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cdefs%3E%3Cpattern id='eduPattern' x='0' y='0' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3C!-- Books --%3E%3Cpath d='M50,80 L80,70 L80,120 L50,130 Z' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Cpath d='M80,70 L110,80 L110,130 L80,120 Z' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3C!-- Pencil --%3E%3Cpath d='M150,50 L170,30 L180,40 L160,60 Z' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='160' y1='60' x2='190' y2='90' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3C!-- Atom --%3E%3Ccircle cx='250' cy='100' r='5' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2'/%3E%3Cellipse cx='250' cy='100' rx='35' ry='18' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2'/%3E%3Cellipse cx='250' cy='100' rx='35' ry='18' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2' transform='rotate(60,250,100)'/%3E%3Cellipse cx='250' cy='100' rx='35' ry='18' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2' transform='rotate(120,250,100)'/%3E%3C!-- Lab Flask --%3E%3Cpath d='M360,50 L360,90 L350,130 L370,130 Z' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='350' y1='50' x2='370' y2='50' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3C!-- Triangle --%3E%3Cpath d='M120,170 L150,200 L90,200 Z' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3C!-- Globe --%3E%3Ccircle cx='220' cy='200' r='30' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.15'/%3E%3Cellipse cx='220' cy='200' rx='30' ry='15' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.15'/%3E%3Cline x1='190' y1='200' x2='250' y2='200' stroke='%23FFC107' stroke-width='1.5' opacity='0.15'/%3E%3Cline x1='220' y1='170' x2='220' y2='230' stroke='%23FFC107' stroke-width='1.5' opacity='0.15'/%3E%3C!-- Graduation Cap --%3E%3Cpath d='M280,180 L320,160 L360,180 L320,200 Z' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='320' y1='200' x2='320' y2='220' stroke='%231A237E' stroke-width='1.5' opacity='0.2'/%3E%3Ccircle cx='320' cy='220' r='3' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.2'/%3E%3C!-- Calculator --%3E%3Crect x='50' y='230' width='60' height='80' rx='3' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Crect x='60' y='240' width='40' height='15' rx='2' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Ccircle cx='65' cy='270' r='4' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Ccircle cx='85' cy='270' r='4' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Ccircle cx='65' cy='290' r='4' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3Ccircle cx='85' cy='290' r='4' fill='none' stroke='%233949AB' stroke-width='1.5' opacity='0.15'/%3E%3C!-- DNA --%3E%3Cpath d='M150,250 Q170,270 150,290 Q130,310 150,330' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cpath d='M190,250 Q170,270 190,290 Q210,310 190,330' fill='none' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='260' x2='190' y2='260' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='280' x2='190' y2='280' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='300' x2='190' y2='300' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='320' x2='190' y2='320' stroke='%23FFC107' stroke-width='1.5' opacity='0.2'/%3E%3C!-- Math Symbols --%3E%3Cpath d='M240,260 L270,260 M255,245 L255,275' fill='none' stroke='%231A237E' stroke-width='2' opacity='0.15'/%3E%3Cpath d='M240,310 L270,310' fill='none' stroke='%231A237E' stroke-width='2' opacity='0.15'/%3E%3Cpath d='M320,260 L340,280 M340,260 L320,280' fill='none' stroke='%231A237E' stroke-width='2' opacity='0.15'/%3E%3Cpath d='M320,310 L340,310 L330,295 L320,310 L340,310 L330,325 Z' fill='none' stroke='%231A237E' stroke-width='1.5' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23eduPattern)'/%3E%3C/svg%3E")`,
            backgroundSize: "800px",
          }}
        ></div>
      </div>

      {/* Auth Container */}
      <div
        className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white my-8 mx-4"
        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        {/* Left Side - Branding Area */}
        <div className="w-full md:w-5/12 bg-[#1A237E] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Add subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-12">
              <EduaraLogo />
            </div>
            <h1 className="text-white text-2xl md:text-3xl font-bold mt-8">
              مرحبًا بك في رحلتك التعليمية
            </h1>
            <p className="text-white text-opacity-80 mt-4 max-w-sm">
              توفر منصة إدوارا نظامًا تعليميًا شاملاً للطلاب والمدرسين والمؤسسات
              لتحقيق التميز الأكاديمي.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-[#7986CB] bg-opacity-20 rounded-full flex items-center justify-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#FFC107]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-white">مسارات تعليمية مخصصة</span>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-[#7986CB] bg-opacity-20 rounded-full flex items-center justify-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#FFC107]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-white">تقييمات تفاعلية</span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#7986CB] bg-opacity-20 rounded-full flex items-center justify-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#FFC107]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-white">تحليلات أداء في الوقت الفعلي</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
          {/* Toggle Between Login and Signup */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1 max-w-xs">
            <button
              onClick={() => setActivePanel("login")}
              className={`flex-1 py-2 px-4 rounded-md transition duration-200 font-medium text-sm ${
                activePanel === "login"
                  ? "bg-white shadow-sm text-[#37474F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setActivePanel("signup")}
              className={`flex-1 py-2 px-4 rounded-md transition duration-200 font-medium text-sm ${
                activePanel === "signup"
                  ? "bg-white shadow-sm text-[#37474F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <h2 className="text-[#37474F] text-2xl font-bold mb-6">
            {activePanel === "login"
              ? "تسجيل الدخول إلى حسابك"
              : "إنشاء حساب جديد"}
          </h2>

          {/* Login Form */}
          {activePanel === "login" && (
            <form onSubmit={(e) => handleSubmit("login", e)}>
              <div className="mb-4">
                <input
                  type="text"
                  name="emailOrUsername"
                  value={formData.login.emailOrUsername}
                  onChange={(e) => handleChange("login", e)}
                  placeholder="البريد الإلكتروني أو اسم المستخدم"
                  className={`w-full p-3 rounded-lg bg-gray-50 border ${
                    errors.login.emailOrUsername
                      ? "border-red-500"
                      : "border-gray-200"
                  } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                />
                {errors.login.emailOrUsername && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.login.emailOrUsername}
                  </p>
                )}
              </div>

              <div className="mb-5 relative">
                <input
                  type={showPassword.login ? "text" : "password"}
                  name="password"
                  value={formData.login.password}
                  onChange={(e) => handleChange("login", e)}
                  placeholder="كلمة المرور"
                  className={`w-full p-3 rounded-lg bg-gray-50 border ${
                    errors.login.password ? "border-red-500" : "border-gray-200"
                  } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("login")}
                  className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.login ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
                {errors.login.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.login.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-[#FFC107] hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.login.rememberMe}
                    onChange={(e) => handleChange("login", e)}
                    className="rounded border-gray-300 text-[#3949AB] focus:ring-[#3949AB]"
                  />
                  <span className="mr-2 text-sm text-gray-600">تذكرني</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3949AB] hover:bg-[#1A237E] text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-4"
              >
                تسجيل الدخول
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-500 text-sm">
                  ليس لديك حساب؟{" "}
                  <button
                    type="button"
                    onClick={() => setActivePanel("signup")}
                    className="text-[#FFC107] hover:text-[#FFA000] font-medium hover:underline"
                  >
                    إنشاء حساب
                  </button>
                </span>
              </div>
            </form>
          )}
          {/* Sign Up Form */}
          {activePanel === "signup" && (
            <form onSubmit={(e) => handleSubmit("signup", e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.signup.fullName}
                    onChange={(e) => handleChange("signup", e)}
                    placeholder="الاسم الكامل"
                    className={`w-full p-3 rounded-lg bg-gray-50 border ${
                      errors.signup.fullName
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                  />
                  {errors.signup.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.signup.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.signup.email}
                    onChange={(e) => handleChange("signup", e)}
                    placeholder="البريد الإلكتروني"
                    className={`w-full p-3 rounded-lg bg-gray-50 border ${
                      errors.signup.email ? "border-red-500" : "border-gray-200"
                    } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                  />
                  {errors.signup.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.signup.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.signup.phoneNo}
                    onChange={(e) => handleChange("signup", e)}
                    placeholder="رقم الهاتف"
                    className={`w-full p-3 rounded-lg bg-gray-50 border ${
                      errors.signup.phoneNo
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                  />
                  {errors.signup.phoneNo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.signup.phoneNo}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="username"
                    value={formData.signup.username}
                    onChange={(e) => handleChange("signup", e)}
                    placeholder="اسم المستخدم"
                    className={`w-full p-3 rounded-lg bg-gray-50 border ${
                      errors.signup.username
                        ? "border-red-500"
                        : "border-gray-200"
                    } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                  />
                  {errors.signup.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.signup.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword.signup ? "text" : "password"}
                  name="password"
                  value={formData.signup.password}
                  onChange={(e) => handleChange("signup", e)}
                  placeholder="كلمة المرور"
                  className={`w-full p-3 rounded-lg bg-gray-50 border ${
                    errors.signup.password
                      ? "border-red-500"
                      : "border-gray-200"
                  } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword("signup")}
                  className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.signup ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
                {errors.signup.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.signup.password}
                  </p>
                )}
              </div>
              {formData.signup.password && (
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {passwordStrength < 50 && "كلمة مرور ضعيفة"}
                    {passwordStrength >= 50 &&
                      passwordStrength < 75 &&
                      "كلمة مرور متوسطة"}
                    {passwordStrength >= 75 && "كلمة مرور قوية"}
                  </p>
                </div>
              )}

              <div className="mb-5 relative">
                <input
                  type={showPassword.signup ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.signup.confirmPassword}
                  onChange={(e) => handleChange("signup", e)}
                  placeholder="تأكيد كلمة المرور"
                  className={`w-full p-3 rounded-lg bg-gray-50 border ${
                    errors.signup.confirmPassword
                      ? "border-red-500"
                      : "border-gray-200"
                  } focus:border-[#3949AB] focus:ring focus:ring-[#7986CB] focus:ring-opacity-50`}
                />
                {errors.signup.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.signup.confirmPassword}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.signup.acceptTerms}
                    onChange={(e) => handleChange("signup", e)}
                    className={`mt-1 rounded border-gray-300 text-[#3949AB] focus:ring-[#3949AB] ${
                      errors.signup.acceptTerms ? "border-red-500" : ""
                    }`}
                  />
                  <span className="mr-2 text-sm text-gray-600">
                    أوافق على{" "}
                    <a
                      href="#"
                      className="text-[#FFC107] hover:text-[#FFA000] hover:underline"
                    >
                      شروط الخدمة
                    </a>{" "}
                    و{" "}
                    <a
                      href="#"
                      className="text-[#FFC107] hover:text-[#FFA000] hover:underline"
                    >
                      سياسة الخصوصية
                    </a>
                  </span>
                </label>
                {errors.signup.acceptTerms && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.signup.acceptTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#3949AB] hover:bg-[#1A237E] text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-4"
              >
                إنشاء حساب
              </button>

              <p className="text-center text-gray-500 text-sm">
                لا تحتاج إلى بطاقة ائتمان
              </p>

              <div className="text-center mt-4">
                <span className="text-gray-500 text-sm">
                  لديك حساب بالفعل؟{" "}
                  <button
                    type="button"
                    onClick={() => setActivePanel("login")}
                    className="text-[#FFC107] hover:text-[#FFA000] font-medium hover:underline"
                  >
                    تسجيل الدخول
                  </button>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernAuth;
