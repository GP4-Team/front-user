import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Plus, Trash2, Clock, BookOpen, Target, 
  Save, ArrowLeft, Settings, CheckCircle, AlertCircle,
  FileText, Zap, GraduationCap
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { quizService } from '../../services/api/index';

const CreateQuiz = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const navigate = useNavigate();

  // Form state
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subject: '',
    difficulty: 'medium',
    timeLimit: 15,
    maxAttempts: 3,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        points: 1
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Static subjects for demo
  const subjects = [
    { id: 'math', name: isArabic ? 'الرياضيات' : 'Mathematics' },
    { id: 'physics', name: isArabic ? 'الفيزياء' : 'Physics' },
    { id: 'chemistry', name: isArabic ? 'الكيمياء' : 'Chemistry' },
    { id: 'biology', name: isArabic ? 'الأحياء' : 'Biology' },
    { id: 'english', name: isArabic ? 'اللغة الإنجليزية' : 'English' },
    { id: 'arabic', name: isArabic ? 'اللغة العربية' : 'Arabic' }
  ];

  const difficulties = [
    { value: 'easy', label: isArabic ? 'سهل' : 'Easy' },
    { value: 'medium', label: isArabic ? 'متوسط' : 'Medium' },
    { value: 'hard', label: isArabic ? 'صعب' : 'Hard' }
  ];

  const questionTypes = [
    { value: 'multiple_choice', label: isArabic ? 'اختيار من متعدد' : 'Multiple Choice' },
    { value: 'true_false', label: isArabic ? 'صح أم خطأ' : 'True/False' },
    { value: 'short_answer', label: isArabic ? 'إجابة قصيرة' : 'Short Answer' }
  ];

  // Add new question
  const addQuestion = () => {
    const newQuestion = {
      id: quizData.questions.length + 1,
      question: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: 1
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion]
    });
  };

  // Remove question
  const removeQuestion = (questionId) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter(q => q.id !== questionId)
      });
    }
  };

  // Update question
  const updateQuestion = (questionId, field, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    });
  };

  // Update question option
  const updateQuestionOption = (questionId, optionIndex, value) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
          : q
      )
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!quizData.title.trim()) {
      newErrors.title = isArabic ? 'عنوان الامتحان مطلوب' : 'Quiz title is required';
    }
    
    if (!quizData.subject) {
      newErrors.subject = isArabic ? 'المادة الدراسية مطلوبة' : 'Subject is required';
    }

    // Validate questions
    quizData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${question.id}`] = isArabic 
          ? `السؤال ${index + 1} مطلوب` 
          : `Question ${index + 1} is required`;
      }
      
      if (question.type === 'multiple_choice') {
        const validOptions = question.options.filter(opt => opt.trim());
        if (validOptions.length < 2) {
          newErrors[`options_${question.id}`] = isArabic 
            ? 'يجب وضع خيارين على الأقل' 
            : 'At least 2 options are required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call actual Quiz API
      const result = await quizService.createQuiz(quizData);
      
      if (result.success) {
        // Show success message and redirect
        alert(isArabic ? 'تم إنشاء الامتحان بنجاح!' : 'Quiz created successfully!');
        navigate('/student/ai-portal');
      } else {
        // Handle API errors
        if (result.validationErrors) {
          setErrors(result.validationErrors);
        }
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(isArabic ? 'حدث خطأ في إنشاء الامتحان' : 'Error creating quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-background-dark' : 'bg-background-light'
    } pt-20 pb-8`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-background-card-dark text-text-light hover:bg-neutral-800' 
                  : 'bg-background-card-light text-text-dark hover:bg-neutral-100'
              } transition-colors`}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${
                isDarkMode ? 'text-text-light' : 'text-text-dark'
              } flex items-center gap-2`}>
                <Brain className="text-primary-base" size={28} />
                {isArabic ? 'إنشاء امتحان جديد' : 'Create New Quiz'}
              </h1>
              <p className={`${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              } mt-1`}>
                {isArabic 
                  ? 'أنشئ امتحاناً مخصصاً لتحسين مستوى الطلاب' 
                  : 'Create a custom quiz to improve student performance'
                }
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Basic Info */}
          <div className={`${
            isDarkMode ? 'bg-background-card-dark' : 'bg-background-card-light'
          } rounded-xl p-6 shadow-sm`}>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-text-light' : 'text-text-dark'
            } mb-4 flex items-center gap-2`}>
              <Settings size={20} className="text-primary-base" />
              {isArabic ? 'معلومات الامتحان الأساسية' : 'Quiz Basic Information'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quiz Title */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'عنوان الامتحان' : 'Quiz Title'} *
                </label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all ${
                    errors.title ? 'border-state-error' : ''
                  }`}
                  placeholder={isArabic ? 'مثال: امتحان الجبر للصف الأول الثانوي' : 'Example: Algebra Quiz for Grade 10'}
                />
                {errors.title && (
                  <p className="text-state-error text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'المادة الدراسية' : 'Subject'} *
                </label>
                <select
                  value={quizData.subject}
                  onChange={(e) => setQuizData({...quizData, subject: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all ${
                    errors.subject ? 'border-state-error' : ''
                  }`}
                >
                  <option value="">{isArabic ? 'اختر المادة' : 'Select Subject'}</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-state-error text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'مستوى الصعوبة' : 'Difficulty Level'}
                </label>
                <select
                  value={quizData.difficulty}
                  onChange={(e) => setQuizData({...quizData, difficulty: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Limit */}
              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'المدة الزمنية (دقيقة)' : 'Time Limit (minutes)'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={quizData.timeLimit}
                  onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value)})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                />
              </div>

              {/* Max Attempts */}
              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'عدد المحاولات المسموحة' : 'Max Attempts'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quizData.maxAttempts}
                  onChange={(e) => setQuizData({...quizData, maxAttempts: parseInt(e.target.value)})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-text-light' : 'text-text-dark'
                } mb-2`}>
                  {isArabic ? 'وصف الامتحان' : 'Quiz Description'}
                </label>
                <textarea
                  rows={3}
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                      : 'bg-white border-neutral-300 text-text-dark'
                  } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all resize-none`}
                  placeholder={isArabic 
                    ? 'وصف مختصر للامتحان وأهدافه...' 
                    : 'Brief description of the quiz and its objectives...'
                  }
                />
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className={`${
            isDarkMode ? 'bg-background-card-dark' : 'bg-background-card-light'
          } rounded-xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-text-light' : 'text-text-dark'
              } flex items-center gap-2`}>
                <FileText size={20} className="text-primary-base" />
                {isArabic ? 'الأسئلة' : 'Questions'} ({quizData.questions.length})
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-primary-base text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus size={16} />
                {isArabic ? 'إضافة سؤال' : 'Add Question'}
              </button>
            </div>

            <div className="space-y-6">
              {quizData.questions.map((question, index) => (
                <div key={question.id} className={`border ${
                  isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
                } rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-text-light' : 'text-text-dark'
                    }`}>
                      {isArabic ? `السؤال ${index + 1}` : `Question ${index + 1}`}
                    </h3>
                    {quizData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="p-1 text-state-error hover:bg-state-error/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-text-light' : 'text-text-dark'
                    } mb-2`}>
                      {isArabic ? 'نص السؤال' : 'Question Text'} *
                    </label>
                    <textarea
                      rows={2}
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                          : 'bg-white border-neutral-300 text-text-dark'
                      } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all resize-none ${
                        errors[`question_${question.id}`] ? 'border-state-error' : ''
                      }`}
                      placeholder={isArabic ? 'اكتب السؤال هنا...' : 'Write your question here...'}
                    />
                    {errors[`question_${question.id}`] && (
                      <p className="text-state-error text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors[`question_${question.id}`]}
                      </p>
                    )}
                  </div>

                  {/* Question Type */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-text-light' : 'text-text-dark'
                    } mb-2`}>
                      {isArabic ? 'نوع السؤال' : 'Question Type'}
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                          : 'bg-white border-neutral-300 text-text-dark'
                      } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                    >
                      {questionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Options for Multiple Choice */}
                  {question.type === 'multiple_choice' && (
                    <div className="mb-4">
                      <label className={`block text-sm font-medium ${
                        isDarkMode ? 'text-text-light' : 'text-text-dark'
                      } mb-2`}>
                        {isArabic ? 'الخيارات' : 'Options'} *
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct_${question.id}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                              className="text-primary-base"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                              className={`flex-1 px-3 py-2 rounded-lg border ${
                                isDarkMode 
                                  ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                                  : 'bg-white border-neutral-300 text-text-dark'
                              } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                              placeholder={`${isArabic ? 'الخيار' : 'Option'} ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      {errors[`options_${question.id}`] && (
                        <p className="text-state-error text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors[`options_${question.id}`]}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Points */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-text-light' : 'text-text-dark'
                    } mb-2`}>
                      {isArabic ? 'النقاط' : 'Points'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={question.points}
                      onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                      className={`w-20 px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                          : 'bg-white border-neutral-300 text-text-dark'
                      } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all`}
                    />
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDarkMode ? 'text-text-light' : 'text-text-dark'
                    } mb-2`}>
                      {isArabic ? 'توضيح الإجابة (اختياري)' : 'Answer Explanation (Optional)'}
                    </label>
                    <textarea
                      rows={2}
                      value={question.explanation}
                      onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700 text-text-light' 
                          : 'bg-white border-neutral-300 text-text-dark'
                      } focus:ring-2 focus:ring-primary-base focus:border-transparent transition-all resize-none`}
                      placeholder={isArabic 
                        ? 'اشرح لماذا هذه الإجابة صحيحة...' 
                        : 'Explain why this answer is correct...'
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-6 py-3 rounded-lg border ${
                isDarkMode 
                  ? 'border-neutral-700 text-text-light hover:bg-neutral-800' 
                  : 'border-neutral-300 text-text-dark hover:bg-neutral-100'
              } transition-colors`}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 bg-primary-base text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  {isArabic ? 'جاري الحفظ...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isArabic ? 'إنشاء الامتحان' : 'Create Quiz'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;