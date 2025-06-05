// src/utils/apiHealthMonitor.js
import api from '../services/api';

/**
 * API Health Monitor - Monitors API endpoints and tracks their health status
 */
class ApiHealthMonitor {
  constructor() {
    this.endpoints = new Map();
    this.listeners = new Set();
    this.monitoringInterval = null;
    this.retryAttempts = 0;
    this.maxRetries = 10;
    this.retryDelay = 30000; // 30 seconds
  }

  /**
   * Register an endpoint for monitoring
   * @param {string} name - Endpoint identifier
   * @param {string} url - API endpoint URL
   * @param {Object} options - Request options
   */
  registerEndpoint(name, url, options = {}) {
    this.endpoints.set(name, {
      url,
      options: {
        timeout: 5000,
        ...options
      },
      status: 'unknown',
      lastCheck: null,
      lastSuccess: null,
      lastError: null,
      consecutiveFailures: 0,
      isMonitoring: false
    });
  }

  /**
   * Add a listener for health status changes
   * @param {Function} callback - Callback function
   */
  addListener(callback) {
    this.listeners.add(callback);
  }

  /**
   * Remove a listener
   * @param {Function} callback - Callback function to remove
   */
  removeListener(callback) {
    this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of status changes
   * @param {string} endpoint - Endpoint name
   * @param {Object} status - Status object
   */
  notifyListeners(endpoint, status) {
    this.listeners.forEach(callback => {
      try {
        callback(endpoint, status);
      } catch (error) {
        console.error('Error in health monitor listener:', error);
      }
    });
  }

  /**
   * Check health of a specific endpoint
   * @param {string} name - Endpoint identifier
   * @returns {Promise<Object>} Health check result
   */
  async checkEndpoint(name) {
    const endpoint = this.endpoints.get(name);
    if (!endpoint) {
      throw new Error(`Endpoint '${name}' not registered`);
    }

    const startTime = Date.now();
    endpoint.lastCheck = new Date();

    try {
      console.log(`🔍 Checking health of ${name}: ${endpoint.url}`);
      
      const response = await api.get(endpoint.url, endpoint.options);
      const responseTime = Date.now() - startTime;

      const healthStatus = {
        status: 'healthy',
        responseTime,
        statusCode: response.status,
        lastCheck: endpoint.lastCheck,
        consecutiveFailures: 0,
        dataCount: response.data?.data?.length || 0,
        response: response.data
      };

      endpoint.status = 'healthy';
      endpoint.lastSuccess = new Date();
      endpoint.consecutiveFailures = 0;
      endpoint.lastError = null;

      console.log(`✅ ${name} is healthy - ${responseTime}ms`);
      this.notifyListeners(name, healthStatus);

      return healthStatus;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      endpoint.consecutiveFailures++;

      const healthStatus = {
        status: 'unhealthy',
        responseTime,
        statusCode: error.response?.status || 'Network Error',
        lastCheck: endpoint.lastCheck,
        consecutiveFailures: endpoint.consecutiveFailures,
        error: {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        }
      };

      endpoint.status = 'unhealthy';
      endpoint.lastError = {
        timestamp: new Date(),
        error: healthStatus.error
      };

      console.log(`❌ ${name} is unhealthy - ${error.message}`);
      this.notifyListeners(name, healthStatus);

      return healthStatus;
    }
  }

  /**
   * Check health of all registered endpoints
   * @returns {Promise<Map>} Map of endpoint health results
   */
  async checkAllEndpoints() {
    const results = new Map();
    
    for (const [name] of this.endpoints) {
      try {
        const result = await this.checkEndpoint(name);
        results.set(name, result);
      } catch (error) {
        results.set(name, {
          status: 'error',
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Start monitoring endpoints with periodic health checks
   * @param {number} interval - Check interval in milliseconds (default: 30 seconds)
   */
  startMonitoring(interval = 30000) {
    if (this.monitoringInterval) {
      this.stopMonitoring();
    }

    console.log(`🚀 Starting API health monitoring (interval: ${interval}ms)`);
    
    // Run initial check
    this.checkAllEndpoints();

    // Set up periodic monitoring
    this.monitoringInterval = setInterval(() => {
      this.checkAllEndpoints();
    }, interval);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      console.log('🛑 Stopped API health monitoring');
    }
  }

  /**
   * Get current status of all endpoints
   * @returns {Map} Current status map
   */
  getCurrentStatus() {
    const statusMap = new Map();
    
    for (const [name, endpoint] of this.endpoints) {
      statusMap.set(name, {
        status: endpoint.status,
        lastCheck: endpoint.lastCheck,
        lastSuccess: endpoint.lastSuccess,
        lastError: endpoint.lastError,
        consecutiveFailures: endpoint.consecutiveFailures
      });
    }

    return statusMap;
  }

  /**
   * Get detailed report of all endpoints
   * @returns {Object} Detailed health report
   */
  getHealthReport() {
    const report = {
      timestamp: new Date(),
      endpoints: {},
      summary: {
        total: this.endpoints.size,
        healthy: 0,
        unhealthy: 0,
        unknown: 0
      }
    };

    for (const [name, endpoint] of this.endpoints) {
      report.endpoints[name] = {
        url: endpoint.url,
        status: endpoint.status,
        lastCheck: endpoint.lastCheck,
        lastSuccess: endpoint.lastSuccess,
        lastError: endpoint.lastError,
        consecutiveFailures: endpoint.consecutiveFailures
      };

      // Update summary
      if (endpoint.status === 'healthy') {
        report.summary.healthy++;
      } else if (endpoint.status === 'unhealthy') {
        report.summary.unhealthy++;
      } else {
        report.summary.unknown++;
      }
    }

    return report;
  }

  /**
   * Reset monitoring state for an endpoint
   * @param {string} name - Endpoint identifier
   */
  resetEndpoint(name) {
    const endpoint = this.endpoints.get(name);
    if (endpoint) {
      endpoint.status = 'unknown';
      endpoint.lastCheck = null;
      endpoint.lastSuccess = null;
      endpoint.lastError = null;
      endpoint.consecutiveFailures = 0;
    }
  }
}

// Create global instance
const apiHealthMonitor = new ApiHealthMonitor();

// Register common endpoints
apiHealthMonitor.registerEndpoint('featuredExams', '/exams/featured', { params: { limit: 6 } });
apiHealthMonitor.registerEndpoint('featuredCourses', '/courses/featured');
apiHealthMonitor.registerEndpoint('appInfo', '/app-info');
apiHealthMonitor.registerEndpoint('educationLevels', '/courses/education-levels');
apiHealthMonitor.registerEndpoint('allCourses', '/courses');

// Add to window for debugging
if (typeof window !== 'undefined') {
  window.apiHealthMonitor = apiHealthMonitor;
  console.log('🛠️ API Health Monitor available at window.apiHealthMonitor');
  console.log('Commands:');
  console.log('- window.apiHealthMonitor.checkAllEndpoints() - Check all endpoints');
  console.log('- window.apiHealthMonitor.startMonitoring(30000) - Start monitoring (30s interval)');
  console.log('- window.apiHealthMonitor.stopMonitoring() - Stop monitoring');
  console.log('- window.apiHealthMonitor.getHealthReport() - Get detailed report');
}

export default apiHealthMonitor;