// src/services/http.ts
import axios from 'axios';


const TOKEN_LIFETIME = 3600 * 1000; //millisecond

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

// Функция для получения токена с проверкой времени его истечения
const getAccessToken = () => {
  const token = localStorage.getItem('access_token');
  const expiry = localStorage.getItem('token_expiry');

  if (token && expiry && Date.now() < Number(expiry)) {
    return token;
  }

  return null;
};

// Функция для сохранения токена с его временем истечения
const setAccessToken = (token: string) => {
  const expiryTime = Date.now() + TOKEN_LIFETIME; // Устанавливаем время истечения токена
  localStorage.setItem('access_token', token);
  localStorage.setItem('token_expiry', expiryTime.toString());
};

// Интерцептор запроса для добавления токена в заголовки запроса
http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для ответа (если токен истек, удаляем его)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
    }
    return Promise.reject(error);
  }
);

export { http, setAccessToken };
