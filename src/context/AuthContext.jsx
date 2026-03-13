import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restaurar token ao montar o componente
  useEffect(() => {
    restoreToken();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro no login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password, phone, cpf) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(name, email, password, phone, cpf);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erro no cadastro';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  const restoreToken = useCallback(() => {
    setLoading(true);
    try {
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Erro no token:', err);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    restoreToken,
    isSignedIn: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
