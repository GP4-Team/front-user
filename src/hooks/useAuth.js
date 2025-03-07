import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

/**
 * Hook for accessing authentication context
 * This is a wrapper around the useContext hook for AuthContext
 * 
 * @returns {object} Authentication context object with user, token, login, logout, etc.
 */
function useAuthHook() {
  const auth = useContext(AuthContext);
  
  if (auth === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return auth;
}

export default useAuthHook;