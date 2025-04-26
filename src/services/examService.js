import axios from 'axios';

// Base API URL - replace with your actual API base URL
const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exam Service API methods
const examService = {
  // Get all exams for the user
  getUserExams: async () => {
    try {
      const response = await api.get('/exams/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get specific exam details by ID
  getExamById: async (examId) => {
    try {
      const response = await api.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Start an exam and get questions
  startExam: async (examId) => {
    try {
      const response = await api.post(`/exams/${examId}/start`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit an answer during the exam
  submitAnswer: async (examId, questionId, answer) => {
    try {
      const response = await api.post(`/exams/${examId}/questions/${questionId}/answer`, { answer });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit the entire exam
  submitExam: async (examId, answers) => {
    try {
      const response = await api.post(`/exams/${examId}/submit`, { answers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get exam results
  getExamResults: async (examId) => {
    try {
      const response = await api.get(`/exams/${examId}/results`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all previous attempts for an exam
  getExamAttempts: async (examId) => {
    try {
      const response = await api.get(`/exams/${examId}/attempts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default examService;
