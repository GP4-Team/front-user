import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button, Tabs, Card, Badge, Collapse } from 'antd';
import { PlayCircleOutlined, FileTextOutlined, VideoCameraOutlined, SoundOutlined, FilePdfOutlined, FileOutlined, ClockCircleOutlined, CheckCircleOutlined, QuestionCircleOutlined, BookOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;

// Course Content Page - Main page shown after clicking "دخول للمادة"
const CourseContentPage = () => {
  const { courseId } = useParams();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('lessons');
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Color palette from the design
  const colors = {
    primaryDark: '#1A237F',    // Primary Dark
    primaryBase: '#3949AB',    // Primary Base
    primaryLight: '#7986CB',   // Primary Light
    accent: '#FFC107',         // Accent/Yellow
    textDark: '#37474F',       // Text Dark
    bgLight: '#ECEFF1',        // Background Light
    white: '#FFFFFF',          // White
    purple: '#6B3DD2',         // Purple from screenshots
  };

  // Mock course data - in real implementation, this would come from an API
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Mock data for demonstration
        const mockCourseData = {
          id: courseId || '1',
          title: 'كيمياء عضوية - المركبات الهيدروكربونية',
          description: 'دراسة المركبات العضوية وتفاعلاتها',
          instructor: 'د. محمد السيد',
          category: 'مركبات عضوية - ثالثة ثانوي',
          enrolledStudents: 100,
          duration: '58 ساعة',
          sections: [
            {
              id: 1,
              title: 'شرح الألكينات',
              lessons: [
                {
                  id: 101,
                  title: 'درس يوتيوب تجريبي',
                  type: 'video',
                  duration: '92 دقيقة',
                  completed: true,
                  url: '/courses/1/lessons/101'
                },
                {
                  id: 102,
                  title: 'يوتيوب مجمع',
                  type: 'video',
                  duration: '96 دقيقة',
                  completed: true,
                  url: '/courses/1/lessons/102'
                },
                {
                  id: 103,
                  title: 'انفوجرافيك',
                  type: 'infographic',
                  completed: true,
                  url: '/courses/1/lessons/103'
                },
                {
                  id: 104,
                  title: 'درس صورة تجريبة 1',
                  type: 'image',
                  completed: true,
                  url: '/courses/1/lessons/104'
                },
                {
                  id: 105,
                  title: 'درس صوت تجربة',
                  type: 'audio',
                  duration: '22 دقيقة',
                  completed: false,
                  url: '/courses/1/lessons/105'
                }
              ]
            },
            {
              id: 2,
              title: 'تفاعلات الألكينات',
              lessons: [
                {
                  id: 201,
                  title: 'امتحان تجريبي 1',
                  type: 'exam',
                  duration: '10 دقائق',
                  completed: false,
                  url: '/exams/201/details'
                },
                {
                  id: 202,
                  title: 'امتحان تجريبي 2',
                  type: 'exam',
                  duration: '10 دقائق',
                  completed: false,
                  url: '/exams/202/details'
                }
              ]
            }
          ]
        };
        
        setCourseData(mockCourseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Get icon based on lesson type
  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <VideoCameraOutlined style={{ color: colors.purple }} />;
      case 'audio':
        return <SoundOutlined style={{ color: colors.purple }} />;
      case 'pdf':
        return <FilePdfOutlined style={{ color: colors.purple }} />;
      case 'text':
        return <FileTextOutlined style={{ color: colors.purple }} />;
      case 'exam':
        return <QuestionCircleOutlined style={{ color: colors.purple }} />;
      case 'infographic':
        return <FileOutlined style={{ color: colors.purple }} />;
      case 'image':
        return <FileOutlined style={{ color: colors.purple }} />;
      default:
        return <FileOutlined style={{ color: colors.purple }} />;
    }
  };

  // Get lesson status badge
  const getLessonStatusBadge = (lesson) => {
    if (lesson.completed) {
      return <CheckCircleOutlined style={{ color: 'green' }} />;
    }
    return null;
  };

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  if (loading) {
    return <div className="text-center p-8">جاري التحميل...</div>;
  }

  if (!courseData) {
    return <div className="text-center p-8">لم يتم العثور على المادة</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar - Course Details */}
        <div className="md:col-span-1">
          <Card 
            className={`shadow-md mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            style={{ border: 'none' }}
          >
            <Button 
              type="primary" 
              block 
              className="mb-6" 
              style={{ 
                backgroundColor: colors.primaryBase, 
                borderColor: colors.primaryBase, 
                height: '44px' 
              }}
            >
              دخول للمادة
            </Button>

            <h3 className="text-lg font-bold mb-4">معلومات المادة:</h3>
            
            <div className="mb-2 flex items-center">
              <ClockCircleOutlined className="mr-2" style={{ color: colors.purple }} />
              <span>{courseData.duration} من الشرح المفصل</span>
            </div>
            
            <div className="mb-2 flex items-center">
              <BookOutlined className="mr-2" style={{ color: colors.purple }} />
              <span>شرح كيمياء عضوية ثالثة ثانوي</span>
            </div>
            
            <div className="mb-2 flex items-center">
              <FileTextOutlined className="mr-2" style={{ color: colors.purple }} />
              <span>66 تمرين على المركبات العضوية</span>
            </div>
            
            <div className="mb-2 flex items-center">
              <CheckCircleOutlined className="mr-2" style={{ color: colors.purple }} />
              <span>متاحة دائماً</span>
            </div>
          </Card>

          <Card 
            className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            style={{ border: 'none' }}
          >
            <h3 className="text-lg font-bold mb-4">مشاركة المادة</h3>
            <div className="flex space-x-4">
              <Button type="text" icon={<span className="fab fa-linkedin"></span>} />
              <Button type="text" icon={<span className="fab fa-twitter"></span>} />
              <Button type="text" icon={<span className="fab fa-whatsapp"></span>} />
              <Button type="text" icon={<span className="fas fa-share"></span>} />
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Card 
            className={`shadow-md mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
            style={{ border: 'none' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">{courseData.title}</h1>
                <p className="text-gray-600 dark:text-gray-300">{courseData.description}</p>
              </div>
              <Badge count={'+100'} style={{ backgroundColor: colors.accent }} className="mr-2">
                <span className="text-gray-600 dark:text-gray-300">طالب</span>
              </Badge>
            </div>
            
            <div className="mt-2">
              <p className="text-gray-600 dark:text-gray-300">{courseData.instructor}</p>
              <p className="text-gray-500 dark:text-gray-400">{courseData.category}</p>
            </div>
          </Card>

          <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange}
            type="card"
            className="course-content-tabs"
            style={{ marginBottom: 0 }}
          >
            <TabPane tab="الدروس" key="lessons">
              <Card 
                className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                style={{ border: 'none' }}
              >
                <Collapse
                  defaultActiveKey={['1']}
                  expandIconPosition="end"
                  className="custom-collapse"
                >
                  {courseData.sections.map((section) => (
                    <Panel
                      key={section.id}
                      header={
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs mr-2">
                              {section.id}
                            </span>
                            <span className="font-medium">{section.title}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {section.lessons.length} {language === 'ar' ? 'درس' : 'lessons'}
                          </div>
                        </div>
                      }
                      style={{ 
                        borderRadius: '8px', 
                        marginBottom: '8px',
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
                      }}
                    >
                      <div className="space-y-3">
                        {section.lessons.map((lesson) => (
                          <Link 
                            key={lesson.id} 
                            to={lesson.url} 
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                            } transition-colors`}
                          >
                            <div className="flex items-center">
                              {getLessonIcon(lesson.type)}
                              <div className="ml-3">
                                <div className={`${lesson.completed ? 'text-green-500' : ''}`}>
                                  {lesson.title}
                                </div>
                                {lesson.duration && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    <ClockCircleOutlined className="mr-1" />
                                    {lesson.duration}
                                  </div>
                                )}
                              </div>
                            </div>
                            {getLessonStatusBadge(lesson)}
                          </Link>
                        ))}
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </Card>
            </TabPane>
            <TabPane tab="الوصف" key="description">
              <Card 
                className={`shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                style={{ border: 'none' }}
              >
                <h3 className="text-lg font-bold mb-4">وصف المادة</h3>
                <p>
                  هذه المادة تقدم مقدمة شاملة عن الكيمياء العضوية مع التركيز على المركبات الهيدروكربونية.
                  ستتعلم تركيب وخصائص وتفاعلات مختلف أنواع المركبات العضوية، بدءًا من الألكانات والألكينات والألكاينات.
                  المادة تشمل محاضرات نظرية، عروض تقديمية، وتمارين عملية لتعزيز فهم المفاهيم.
                </p>
                <h4 className="text-md font-bold mt-4 mb-2">ماذا ستتعلم:</h4>
                <ul className="list-disc list-inside">
                  <li>أساسيات الكيمياء العضوية</li>
                  <li>تصنيف وتسمية المركبات العضوية</li>
                  <li>التفاعلات الأساسية للألكينات</li>
                  <li>تطبيقات المركبات العضوية في الحياة اليومية</li>
                </ul>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;