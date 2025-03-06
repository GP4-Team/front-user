import React, { createContext, useState, useContext } from 'react';

const TenantContext = createContext(null);

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(() => {
    return Cookies.get('tenantId') || 'default';
  });

  const changeTenant = (tenantId) => {
    Cookies.set('tenantId', tenantId);
    setTenant(tenantId);
  };

  return (
    <TenantContext.Provider value={{ tenant, changeTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

// src/middleware/AuthMiddleware.jsx
