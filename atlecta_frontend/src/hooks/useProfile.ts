// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
import http from '../services/http';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await http.get('/users/profiles/me/'); // Убедись, что эндпоинт правильный
        console.log('Ответ от сервера с профилем:', response.data);
        setProfile(response.data); // Запишем данные профиля в стейт
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updatedData: UserProfile) => {
    try {
      await http.put(`/users/profiles/`, updatedData); 
      console.log('Профиль обновлён:', updatedData);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
    }
  };

  return { profile, updateProfile };
};
