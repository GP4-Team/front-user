// src/middleware/TenantMiddleware.jsx
import { useEffect } from 'react';
import { useTenant } from '@/context/TenantContext';

export const TenantMiddleware = ({ children }) => {
  const { tenant } = useTenant();

  useEffect(() => {
    // Add tenant ID to API requests
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      if (args[1]?.headers) {
        args[1].headers['X-Tenant-ID'] = tenant;
      } else {
        args[1] = {
          ...(args[1] || {}),
          headers: { 'X-Tenant-ID': tenant },
        };
      }
      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [tenant]);

  return children;
};
