// src/services/authService.ts
import http from './http';

/**
 * Отправка данных для авторизации в формате application/x-www-form-urlencoded
 */
export const login = (username: string, password: string) => {
  const payload = new URLSearchParams();
  payload.append('grant_type', 'password');
  payload.append('username', username);
  payload.append('password', password);
  payload.append('scope', '');
  payload.append('client_id', 'string');
  payload.append('client_secret', 'string');

  return http.post('/auth/jwt/login', payload);
};

/**
 * Регистрация нового пользователя (остается как есть)
 */
export const register = (email: string, password: string) => {
  return http.post('/auth/register', { email, password });
};
