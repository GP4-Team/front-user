import React, { useState, useEffect } from 'react';
import { Radio, Input, Image, message } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import useOnlineExamQuestions from '../../hooks/api/useOnlineExamQuestions';

const { TextArea } = Input;

const QuestionCard = ({ 
  question, 
  userAnswer, 
  onAnswerChange, 
  language, 
  isDarkMode, 
  isReview = false, 
  correctAnswer = null,
  colors = {
    primaryDark: '#1A237F',
    primaryBase: '#3949AB',
    primaryLight: '#7986CB',
    accent: '#FFC107',
    textDark: '#37474F',
    bgLight: '#ECEFF1',
    white: '#FFFFFF',
  },
  imageMaxWidth = 400
}) => {
  // استخدام submitAnswer من hook
  const { submitAnswer } = useOnlineExamQuestions();
  
  // حالة لتتبع الإجابة المرسلة والفيدباك
  const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null); // { is_correct, awarded_mark, max_mark }
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset feedback when question changes
  useEffect(() => {
    setSubmittedAnswer(null);
    setAnswerFeedback(null);
    setIsSubmitting(false);
  }, [question.id]);
  
  // Initialize answer feedback if answer already exists
  useEffect(() => {
    if (userAnswer && !submittedAnswer && !isReview) {
      // If we have an answer but no submitted state, this might be a loaded answer
      // For now, we'll just keep it as is - the feedback will come when user changes answer
    }
  }, [userAnswer, submittedAnswer, isReview]);

  const handleMCQChange = async (e) => {
    const answer = e.target.value;
    
    // تحديث الإجابة محلياً
    onAnswerChange(answer);
    
    // إرسال الإجابة فورياً لل API
    if (!isReview && question.student_answer_id) {
      setIsSubmitting(true);
      
      try {
        console.log(`📤 [QuestionCard] Submitting answer for question ${question.id}:`, answer);
        
        const result = await submitAnswer(question.student_answer_id, answer, question.type);
        
        if (result.success) {
          setSubmittedAnswer(answer);
          setAnswerFeedback(result.data);
          
          console.log('✅ [QuestionCard] Answer submitted successfully:', result.data);
          
          // عرض رسالة نجاح قصيرة مع أيقونة
          if (result.data?.is_correct) {
            message.success({
              content: language === 'ar' ? '✅ إجابة صحيحة!' : '✅ Correct!',
              duration: 2,
              style: { marginTop: '10vh' }
            });
          } else {
            message.error({
              content: language === 'ar' ? '❌ إجابة خاطئة' : '❌ Incorrect',
              duration: 2,
              style: { marginTop: '10vh' }
            });
          }
        } else {
          console.error('❌ [QuestionCard] Failed to submit answer:', result.error);
          message.error(language === 'ar' ? 'خطأ في إرسال الإجابة' : 'Error submitting answer');
        }
      } catch (error) {
        console.error('❌ [QuestionCard] Error submitting answer:', error);
        message.error(language === 'ar' ? 'خطأ في الاتصال' : 'Connection error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEssayChange = async (e) => {
    const answer = e.target.value;
    onAnswerChange(answer);
    
    // Auto-submit essay answers after 2 seconds of no typing
    if (!isReview && question.student_answer_id && answer.trim()) {
      // Clear existing timeout
      if (window.essaySubmitTimeout) {
        clearTimeout(window.essaySubmitTimeout);
      }
      
      // Set new timeout
      window.essaySubmitTimeout = setTimeout(async () => {
        setIsSubmitting(true);
        
        try {
          console.log(`📤 [QuestionCard] Auto-submitting essay answer for question ${question.id}`);
          
          const result = await submitAnswer(question.student_answer_id, answer, question.type);
          
          if (result.success) {
            setSubmittedAnswer(answer);
            setAnswerFeedback(result.data);
            
            console.log('✅ [QuestionCard] Essay answer submitted successfully:', result.data);
          }
        } catch (error) {
          console.error('❌ [QuestionCard] Error submitting essay answer:', error);
        } finally {
          setIsSubmitting(false);
        }
      }, 2000);
    }
  };

  // Custom checkbox component to match the design
  const CustomRadio = ({ children, value, onChange, checked, disabled }) => {
    // تحديد اللون بناءً على الفيدباك
    let borderColor = 'border-gray-300';
    let bgColor = 'bg-white';
    let iconColor = 'text-blue-500';
    let icon = <CheckOutlined className="text-blue-500 text-xs" />;
    
    if (!isReview && answerFeedback && submittedAnswer !== null) {
      // في وضع الامتحان مع فيدباك فوري
      if (value === submittedAnswer) {
        if (answerFeedback.is_correct) {
          borderColor = 'border-green-500';
          bgColor = 'bg-green-50';
          iconColor = 'text-green-500';
          icon = <CheckOutlined className="text-green-500 text-xs" />;
        } else {
          borderColor = 'border-red-500';
          bgColor = 'bg-red-50';
          iconColor = 'text-red-500';
          icon = <CloseOutlined className="text-red-500 text-xs" />;
        }
      } else if (answerFeedback.correct_answer_id && value === answerFeedback.correct_answer_id) {
        // عرض الإجابة الصحيحة من الفيدباك
        borderColor = 'border-green-400';
        bgColor = 'bg-green-50';
        iconColor = 'text-green-400';
        icon = <CheckOutlined className="text-green-400 text-xs" />;
      }
    } else if (isReview && checked) {
      // في وضع المراجعة
      if (value !== correctAnswer) {
        borderColor = 'border-red-500';
        bgColor = 'bg-red-50';
        iconColor = 'text-red-500';
        icon = <CloseOutlined className="text-red-500 text-xs" />;
      } else {
        borderColor = 'border-green-500';
        bgColor = 'bg-green-50';
        iconColor = 'text-green-500';
        icon = <CheckOutlined className="text-green-500 text-xs" />;
      }
    } else if (checked) {
      borderColor = 'border-blue-500';
      bgColor = 'bg-blue-50';
    }
    
    return (
      <label 
        className={`flex items-center cursor-pointer ${disabled && 'cursor-default'} ${isSubmitting && value === userAnswer && 'opacity-50'} transition-all duration-200`}
        onClick={() => !disabled && !isSubmitting && onChange && onChange({ target: { value } })}
      >
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${borderColor} ${bgColor}`}
        >
          {checked && !isSubmitting && icon}
          {isSubmitting && value === userAnswer && (
            <LoadingOutlined className="text-blue-500 text-xs animate-spin" />
          )}
        </div>
        <span className="text-base">{children}</span>
        {isSubmitting && value === userAnswer && (
          <div className="ml-2 text-xs text-gray-500 flex items-center">
            <LoadingOutlined className="mr-1" />
            {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
          </div>
        )}
      </label>
    );
  };

  // Get choices from question data - handle both 'choices' and 'options' properties
  const questionChoices = question.choices || question.options || [];
  
  // Normalize question type - handle both API format and internal format
  const normalizeQuestionType = (type) => {
    if (type === 'MultipleChoice') return 'mcq';
    if (type === 'TrueFalse') return 'true-false';
    return type;
  };
  
  const questionType = normalizeQuestionType(question.type);
  
  console.log('🔍 Question Debug:', {
    questionId: question.id,
    type: question.type,
    normalizedType: questionType,
    choices: questionChoices,
    choicesLength: questionChoices.length
  });

  const renderOptions = () => {
    // Check if we have choices to render
    if (!questionChoices || questionChoices.length === 0) {
      console.warn('⚠️ No choices found for question:', question.id);
      return (
        <div className="w-full mt-6 p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          {language === 'ar' ? 'لا توجد خيارات متاحة لهذا السؤال' : 'No options available for this question'}
        </div>
      );
    }
    
    switch (questionType) {
      case 'mcq':
      case 'MultipleChoice':
        return (
          <div className="w-full mt-6 space-y-4">
            {questionChoices.map((option) => {
              const isChecked = userAnswer === option.id;
              
              let optionClass = "p-4 rounded-lg transition-colors duration-200 shadow-sm border";
              
              // ألوان مختلفة حسب الوضع
              if (!isReview && answerFeedback && submittedAnswer !== null) {
                // في وضع الامتحان مع فيدباك فوري
                if (option.id === submittedAnswer) {
                  if (answerFeedback.is_correct) {
                    optionClass += " border-green-500 bg-green-50 shadow-md";
                  } else {
                    optionClass += " border-red-500 bg-red-50 shadow-md";
                  }
                } else if (answerFeedback.correct_answer_id && option.id === answerFeedback.correct_answer_id) {
                  optionClass += " border-green-400 bg-green-50 opacity-75 shadow-sm";
                } else {
                  optionClass += " border-gray-200 opacity-60";
                }
              } else if (isReview) {
                // في وضع المراجعة
                if (option.id === correctAnswer) {
                  optionClass += " border-green-500 bg-green-50";
                } else if (option.id === userAnswer && option.id !== correctAnswer) {
                  optionClass += " border-red-500 bg-red-50";
                } else {
                  optionClass += " border-gray-200";
                }
              } else {
                // وضع عادي بدون فيدباك
                optionClass += isChecked 
                  ? " border-blue-500 bg-blue-50" 
                  : " border-gray-200 hover:border-blue-300";
              }
              
              if (isDarkMode) {
                optionClass = optionClass.replace("bg-green-50", "bg-green-900 border-green-700")
                  .replace("bg-red-50", "bg-red-900 border-red-700")
                  .replace("bg-blue-50", "bg-blue-900 border-blue-700")
                  .replace("border-gray-200", "border-gray-700")
                  .replace("hover:border-blue-300", "hover:border-blue-600");
              }
              
              return (
                <div key={option.id} className={optionClass}>
                  <CustomRadio
                    value={option.id}
                    checked={isChecked}
                    onChange={handleMCQChange}
                    disabled={isReview}
                  >
                    {option.text}
                  </CustomRadio>
                </div>
              );
            })}
          </div>
        );
        
      case 'true-false':
      case 'TrueFalse':
        return (
          <div className="w-full mt-6 space-y-4">
            {questionChoices.map((option) => {
              const isChecked = userAnswer === option.id;
              
              let optionClass = "p-4 rounded-lg transition-colors duration-200 shadow-sm border";
              
              // ألوان مختلفة حسب الوضع
              if (!isReview && answerFeedback && submittedAnswer !== null) {
                // في وضع الامتحان مع فيدباك فوري
                if (option.id === submittedAnswer) {
                  if (answerFeedback.is_correct) {
                    optionClass += " border-green-500 bg-green-50";
                  } else {
                    optionClass += " border-red-500 bg-red-50";
                  }
                } else if (answerFeedback.correct_answer_id && option.id === answerFeedback.correct_answer_id) {
                  optionClass += " border-green-400 bg-green-50 opacity-80";
                } else {
                  optionClass += " border-gray-200";
                }
              } else if (isReview) {
                // في وضع المراجعة
                if (option.id === correctAnswer) {
                  optionClass += " border-green-500 bg-green-50";
                } else if (option.id === userAnswer && option.id !== correctAnswer) {
                  optionClass += " border-red-500 bg-red-50";
                } else {
                  optionClass += " border-gray-200";
                }
              } else {
                // وضع عادي بدون فيدباك
                optionClass += isChecked 
                  ? " border-blue-500 bg-blue-50" 
                  : " border-gray-200 hover:border-blue-300";
              }
              
              if (isDarkMode) {
                optionClass = optionClass.replace("bg-green-50", "bg-green-900 border-green-700")
                  .replace("bg-red-50", "bg-red-900 border-red-700")
                  .replace("bg-blue-50", "bg-blue-900 border-blue-700")
                  .replace("border-gray-200", "border-gray-700")
                  .replace("hover:border-blue-300", "hover:border-blue-600");
              }
              
              return (
                <div key={option.id} className={optionClass}>
                  <CustomRadio
                    value={option.id}
                    checked={isChecked}
                    onChange={handleMCQChange}
                    disabled={isReview}
                  >
                    {option.text}
                  </CustomRadio>
                </div>
              );
            })}
          </div>
        );
        
      case 'essay':
      case 'Essay':
        return (
          <div className="mt-6">
            <TextArea
              placeholder={language === 'ar' ? "اكتب إجابتك هنا..." : "Write your answer here..."}
              value={userAnswer}
              onChange={handleEssayChange}
              rows={6}
              disabled={isReview || isSubmitting}
              className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-800'} rounded-lg p-4 text-base transition-all duration-200 ${isSubmitting ? 'opacity-50' : ''}`}
              style={{ resize: 'vertical' }}
              suffix={isSubmitting && <LoadingOutlined />}
            />
            {isReview && correctAnswer && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800">
                  {language === 'ar' ? 'الإجابة النموذجية' : 'Model Answer'}:
                </h4>
                <p className="mt-2 text-green-700">{correctAnswer}</p>
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <div className="w-full mt-6 p-4 text-center text-red-500 border border-dashed border-red-300 rounded-lg">
            <p className="font-semibold">{language === 'ar' ? 'نوع سؤال غير مدعوم' : 'Unsupported question type'}</p>
            <p className="text-sm mt-2">Type: {question.type}</p>
            <p className="text-xs mt-1 text-gray-500">
              {language === 'ar' ? 'يرجى إبلاغ المطور عن هذه المشكلة' : 'Please report this issue to the developer'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="question-card">
      <div className="question-content mb-6">
        {/* Question Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            questionType === 'mcq' || questionType === 'MultipleChoice'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : questionType === 'true-false' || questionType === 'TrueFalse'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
          }`}>
            {questionType === 'mcq' || questionType === 'MultipleChoice'
              ? (language === 'ar' ? 'اختيار من متعدد' : 'Multiple Choice')
              : questionType === 'true-false' || questionType === 'TrueFalse'
              ? (language === 'ar' ? 'صح أو خطأ' : 'True/False')
              : question.type
            }
          </span>
          
          {/* Difficulty Badge */}
          {question.hardness && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              question.hardness === "1" 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : question.hardness === "2"
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {question.hardness === "1" 
                ? (language === 'ar' ? 'سهل' : 'Easy')
                : question.hardness === "2"
                ? (language === 'ar' ? 'متوسط' : 'Medium')
                : (language === 'ar' ? 'صعب' : 'Hard')
              }
            </span>
          )}
        </div>
        
        <p className="text-xl mb-4 font-medium">{question.text}</p>
        
        {question.image && (
          <div className="mt-4 flex justify-center mb-6">
            <Image
              src={question.image}
              alt="Question image"
              className="rounded-lg"
              style={{ maxWidth: `${imageMaxWidth}px`, maxHeight: '300px', objectFit: 'contain' }}
              preview={true}
              fallback="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5NzZEMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiLz48cGF0aCBkPSJtOSAxMmwtMi0yIDQtNCA2IDYiLz48L3N2Zz4="
            />
          </div>
        )}
        
        {/* Extra info section */}
        {question.extra_info && (
          <div className={`mt-3 p-3 rounded-lg ${
            isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
          }`}>
            <p className="text-sm">{question.extra_info}</p>
          </div>
        )}
        
        {/* Course idea section */}
        {question.course_idea?.name && (
          <div className={`mt-3 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span className="font-medium">
              {language === 'ar' ? 'المفهوم: ' : 'Concept: '}
            </span>
            <span>{question.course_idea.name}</span>
          </div>
        )}
      </div>
      
      <div className="question-options">
        {renderOptions()}
        
        {/* عرض فيدباك فوري عند استقبال النتائج */}
        {!isReview && answerFeedback && submittedAnswer !== null && (
          <div className={`mt-4 p-4 rounded-lg border-2 transition-all duration-500 shadow-lg ${
            answerFeedback.is_correct 
              ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100' 
              : 'border-red-500 bg-gradient-to-r from-red-50 to-red-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {answerFeedback.is_correct ? (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 shadow-lg">
                    <CheckOutlined className="text-white text-lg" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 shadow-lg">
                    <CloseOutlined className="text-white text-lg" />
                  </div>
                )}
                <span className={`font-bold text-xl ${
                  answerFeedback.is_correct ? 'text-green-700' : 'text-red-700'
                }`}>
                  {answerFeedback.is_correct 
                    ? (language === 'ar' ? '🎉 إجابة صحيحة!' : '🎉 Correct!')
                    : (language === 'ar' ? '❌ إجابة خاطئة' : '❌ Incorrect')
                  }
                </span>
              </div>
              <div className={`text-sm font-bold px-4 py-2 rounded-full shadow-md ${
                answerFeedback.is_correct 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {language === 'ar' 
                  ? `${answerFeedback.awarded_mark || 0}/${answerFeedback.max_mark || 0}`
                  : `${answerFeedback.awarded_mark || 0}/${answerFeedback.max_mark || 0}`
                }
              </div>
            </div>
            
            {/* عرض feedback message إذا كان متوفراً */}
            {answerFeedback.feedback && (
              <div className={`mt-4 p-4 rounded-lg text-sm font-medium border ${
                answerFeedback.is_correct 
                  ? 'bg-green-100 text-green-800 border-green-300' 
                  : 'bg-red-100 text-red-800 border-red-300'
              }`}>
                <div className="flex items-center">
                  <span className="text-lg mr-2">💡</span>
                  <span>{answerFeedback.feedback}</span>
                </div>
              </div>
            )}
            
            {/* عرض معلومات الإجابة الصحيحة إذا كانت متوفرة */}
            {!answerFeedback.is_correct && answerFeedback.correct_answer_id && questionChoices && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border-2 border-green-300 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 mr-2">
                    <CheckOutlined className="text-white text-xs" />
                  </div>
                  <span className="text-sm font-bold text-green-800">
                    {language === 'ar' ? 'الإجابة الصحيحة:' : 'Correct Answer:'}
                  </span>
                </div>
                <div className="text-sm font-medium text-green-700 bg-white p-3 rounded border border-green-200">
                  {questionChoices.find(choice => choice.id === answerFeedback.correct_answer_id)?.text || 'N/A'}
                </div>
              </div>
            )}
            
            {/* عرض الوقت المستغرق إذا كان متوفراً */}
            {answerFeedback.time_taken && (
              <div className="mt-2 text-xs text-gray-600 text-center">
                {language === 'ar' 
                  ? `زمن الإجابة: ${answerFeedback.time_taken} ثانية`
                  : `Time taken: ${answerFeedback.time_taken} seconds`
                }
              </div>
            )}
          </div>
        )}
        
        {/* الباقي من المحتوى */}
        <div className="mt-6 space-y-3">
          {/* Answer status */}
          <div className="text-sm text-gray-500 flex justify-between items-center">
            <div>
              {!userAnswer ? (
                <span className="inline-flex items-center">
                  <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                  {language === 'ar' ? 'لم تتم الإجابة' : 'Not answered yet'}
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  {language === 'ar' ? 'تمت الإجابة' : 'Answered'}
                </span>
              )}
            </div>
          </div>
          
          {/* Show explanation if in review mode or if explanation should be shown */}
          {(isReview || question.show_explanation) && question.explanation_text && (
            <div className={`p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300' 
                : 'bg-yellow-50 border-yellow-200 text-yellow-700'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-800'
              }`}>
                {language === 'ar' ? 'التوضيح:' : 'Explanation:'}
              </h4>
              <p className="text-sm">{question.explanation_text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
