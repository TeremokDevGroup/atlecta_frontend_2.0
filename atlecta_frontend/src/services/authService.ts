// src/services/authService.ts
import http from './http';

export const login = (email: string, password: string) => {
  return http.post('/auth/login', { email, password });
};

export const register = (email: string, password: string) => {
  return http.post('/auth/register', { email, password });
};
