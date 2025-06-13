import { useEffect, useState } from 'react';
import { UserProfile, UserImage } from '../types/user';
import { http } from '../services/http';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await http.get<UserProfile>("/users/profiles/me");
        const data = response.data;

        const updatedImages = data.images.map((image: UserImage) => ({
          ...image,
          url: image.url ? `${import.meta.env.VITE_IMAGE_BASE_URL}${image.url}` : "",
        }));

        setProfile({ ...data, images: updatedImages });
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (updatedData: UserProfile) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sports, images, ...profileParams } = updatedData;
      
      // Формируем URL с query параметрами
      const queryString = new URLSearchParams();
      Object.entries(profileParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryString.append(key, String(value));
        }
      });

      const url = `/users/profiles/me?${queryString.toString()}`;
      
      // Отправляем массив sports напрямую (без обертки в объект)
      await http.patch(url, sports);
      
      console.log('Профиль обновлён:', { ...profileParams, sports });
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      throw error;
    }
  };

  const uploadProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await http.post('/users/profiles/me/profile_image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Обновить профиль после загрузки фото
      const response = await http.get<UserProfile>('/users/profiles/me');
      const data = response.data;
      const updatedImages = data.images.map((image: UserImage) => ({
        ...image,
        url: image.url ? `${import.meta.env.VITE_IMAGE_BASE_URL}${image.url}` : "",
      }));
      const updatedProfile = { ...data, images: updatedImages };
      setProfile(updatedProfile);
      return updatedProfile; // Возвращаем обновлённый профиль
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      throw error;
    }
  };

  return { profile, updateProfile, uploadProfileImage };
};