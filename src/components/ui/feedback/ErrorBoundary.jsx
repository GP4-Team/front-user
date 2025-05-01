import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This wrapper is needed to use hooks with class components
function ErrorBoundaryWrapper(props) {
  const navigate = useNavigate();
  return <ErrorBoundaryClass {...props} navigate={navigate} />;
}

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mx-auto text-red-500 dark:text-red-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
              {this.props.fallbackMessage || "Oops! Something went wrong"}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 mb-8">
              The application encountered an unexpected error. We apologize for the inconvenience.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-base hover:bg-primary-dark mx-2"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  if (this.props.navigate) {
                    this.props.navigate('/');
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-primary-base bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-primary-light dark:hover:bg-neutral-700 mx-2"
              >
                Back to Home
              </button>
            </div>
            
            {/* Show error details in development mode */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-auto max-h-64">
                <p className="font-mono text-sm text-red-600 dark:text-red-400 mb-2">
                  {this.state.error && this.state.error.toString()}
                </p>
                <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;
