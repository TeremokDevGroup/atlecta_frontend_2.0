import { UserProfile, UserImage } from "../types/user";
import { http } from "../services/http";

export const getUserProfiles = async (): Promise<UserProfile[]> => {
  const response = await http.get("/users/profiles/me");
  return response.data;
};

export const getUserProfileById = async (id: string): Promise<UserProfile> => {
  const response = await http.get(`/users/profiles/${id}`);
  return response.data;
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const response = await http.get("/users/profiles/");
  return response.data;
};

export const getUserProfileImages = async (id: string): Promise<string | null> => {
  try {
    const response = await http.get<UserImage[]>(`/users/profiles/${id}/images/`);
    const profileImage = response.data.find(img => img.is_profile_picture);
    if (profileImage) {
      const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
      return `${baseUrl}${profileImage.url}`;
    }
    return null;
  } catch (error) {
    console.error("Ошибка при получении изображения пользователя:",  error);
    return null;
  }
};

