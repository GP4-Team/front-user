# LearnNova - Educational Platform

A modern, interactive educational platform built with React, providing comprehensive learning solutions for students and educators.

## 🌟 Features

- **Authentication System**: Secure login/register with JWT tokens
- **Course Management**: Browse, enroll, and track course progress  
- **Examination System**: Interactive exams with timer and results
- **Student Profile**: Comprehensive dashboard with academic progress
- **Multi-language Support**: Arabic and English interface
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all devices
- **Environment Configuration**: Easy deployment across different environments

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front-user
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy .env.example to .env and update the API URL
REACT_APP_API_BASE_URL=https://your-api-server.com/api
```

4. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm run build`
Builds the app for production. The build is optimized and ready for deployment.

### `npm test`
Launches the test runner in interactive watch mode.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── config/             # Configuration files
├── layouts/            # Layout components
├── middleware/         # Route protection and middleware
└── styles/             # Global styles and CSS
```

## 🌍 Environment Configuration

The app supports multiple environments through environment variables:

- **Development**: `http://localhost:8000/api`
- **Staging**: `https://staging.learnnova.com/api`
- **Production**: `https://api.learnnova.com/api`
- **Docker**: `http://backend-container:8000/api`

## 🎨 Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, GSAP animations
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📱 Features Overview

### Authentication
- Secure JWT-based authentication
- Login/Register forms with validation
- Protected routes and session management

### Courses
- Browse all available courses
- View detailed course information
- Enroll in courses
- Track learning progress

### Examinations
- Take interactive online exams
- Timer functionality
- Multiple question types
- Instant results and feedback

### Profile Management
- View academic progress
- Manage enrolled courses
- Course registration system
- Performance analytics

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t learnnova-frontend .
docker run -p 3000:80 learnnova-frontend
```

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License.

---

**LearnNova** - Empowering education through technology 🎓
