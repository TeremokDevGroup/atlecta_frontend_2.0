// src/services/http.ts
import axios from 'axios';

const TOKEN_LIFETIME = 3600 * 1000; // milliseconds

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

// Получение токена с проверкой времени истечения
const getAccessToken = () => {
  const token = localStorage.getItem('access_token');
  const expiry = localStorage.getItem('token_expiry');

  if (token && expiry && Date.now() < Number(expiry)) {
    return token;
  }

  return null;
};

// Сохранение токена с временем истечения
const setAccessToken = (token: string) => {
  const expiryTime = Date.now() + TOKEN_LIFETIME;
  localStorage.setItem('access_token', token);
  localStorage.setItem('token_expiry', expiryTime.toString());
};

// Удаление токена
const clearAccessToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_expiry');
};

// Интерцептор запроса — добавляет токен
http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор ответа — удаляет токен при 401
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
    }
    return Promise.reject(error);
  }
);

export { http, setAccessToken, getAccessToken, clearAccessToken };
