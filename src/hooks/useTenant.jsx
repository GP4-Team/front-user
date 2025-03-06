import { useContext } from 'react';
import { TenantContext } from '@/context/TenantContext';

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }

  // Add any additional tenant-related functionality here
  const validateTenantAccess = async (tenantId) => {
    // Implementation would verify user's access to the tenant
    console.log('Validating access to tenant:', tenantId);
    return Promise.resolve(true);
  };

  return {
    ...context,
    validateTenantAccess,
  };
};