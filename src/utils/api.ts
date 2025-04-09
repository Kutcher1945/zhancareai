// utils/api.ts
import axios from 'axios';

// ✅ Используем env-переменные для гибкости
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://zhancareai-back.vercel.app/api/v1';
export const baseURLImg = process.env.NEXT_PUBLIC_API_IMG_URL || 'https://zhancareai-back.vercel.app/api/v1';

// ✅ Создаем инстанс axios
const axiosInstance = axios.create({
  baseURL,
  paramsSerializer: (params: any) => new URLSearchParams(params).toString(),
});

// ✅ Интерцептор для автоматического добавления токена авторизации
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Token ${token}`; // У тебя на сервере Token, не Bearer
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Интерцептор для обработки ошибок (дополнительно — рекомендую)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        console.warn('⛔️ Unauthorized, redirecting to login...');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
