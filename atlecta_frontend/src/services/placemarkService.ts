import { http } from "./http";
import { Placemark } from "../types/placemark";

// Получение меток (пунктов на карте)
export const getPlacemarks = async (): Promise<Placemark[]> => {
  try {
    const res = await http.get("sports/objects");
    return res.data;
  } catch (error) {
    console.error('Ошибка при получении меток:', error);
    throw error;
  }
};

// Создание новой метки

export const createPlacemark = async (data: Placemark): Promise<void> => {
  try {
    const { name, x_coord, y_coord, address, tags } = data;

    const params = new URLSearchParams({
      name,
      x_coord: x_coord.toString(),
      y_coord: y_coord.toString(),
      address,
    });

    await http.post(`/sports/objects?${params.toString()}`, tags);
  } catch (error) {
    console.error("Ошибка при создании метки:", error);
    throw error;
  }
};
