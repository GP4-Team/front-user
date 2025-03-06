// src/utils/tokenHelpers.js
export const setToken = (token) => {
    localStorage.setItem('accessToken', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  export const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    
    try {
      // Parse the JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if token is expired
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };