// src/services/imageService.ts
import { http } from "../services/http";

export interface ObjectImage {
  url: string;
  id: string;
  is_profile_picture: boolean;
  uploaded_at: string;
}

/**
 * Получить все изображения спортивного объекта по его ID
 */
export const getObjectImages = async (objectId: number): Promise<string[]> => {
  try {
    const response = await http.get<ObjectImage[]>(`/sports/objects/${objectId}/images`);
    const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
    return response.data.map(img => `${baseUrl}${img.url}`);
  } catch (error) {
    console.error("Ошибка при получении изображений объекта:", error);
    return [];
  }
};

/**
 * Загрузить изображение для спортивного объекта
 */
export const uploadObjectImage = async (placemarkId: number, file: File) => {
  const formData = new FormData();
  formData.append("files", file);

  try {
    await http.post(`/sports/objects/${placemarkId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Ошибка загрузки изображения спорт-объекта:", error);
    throw error;
  }
};
