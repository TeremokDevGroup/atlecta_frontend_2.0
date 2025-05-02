import { http } from "./http";
import { Placemark } from "../types/placemark";

// Получение меток (пунктов на карте)
export const getPlacemarks = async (): Promise<Placemark[]> => {
  try {
    const res = await http.get("sports/objects/");
    return res.data;
  } catch (error) {
    console.error('Ошибка при получении меток:', error);
    throw error; // Выбросим ошибку, чтобы обработать её в месте вызова
  }
};

// Создание новой метки
export const createPlacemark = async (data: Placemark): Promise<void> => {
  try {
    await http.post("/sports/object/", data);
  } catch (error) {
    console.error('Ошибка при создании метки:', error);
    throw error; // Выбросим ошибку для дальнейшей обработки
  }
};
