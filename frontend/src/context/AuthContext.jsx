import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication on mount and when page loads
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setLoading(true);
        console.log('🔍 Checking authentication status...');
        
        // Try to verify token with backend
        const response = await authAPI.checkAuth();
        
        if (response.data.authenticated && response.data.user) {
          console.log('✓ User authenticated:', response.data.user.username);
          setUser(response.data.user);
          setIsAuthenticated(true);
          setError(null);
        }
      } catch (err) {
        console.log('ℹ No valid token found, user not authenticated');
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  // Login function
  const login = useCallback((userData) => {
    console.log('✓ Login successful for:', userData.username);
    setUser(userData);
    setIsAuthenticated(true);
    setError(null);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
      console.log('✓ Logout successful');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
