import { http } from "./http";

export const getTags = async (): Promise<string[]> => {
  try {
    const res = await http.get("/sports");
    return res.data.map((tag: { name: string }) => tag.name);
  } catch (error) {
    console.error("Ошибка при получении тегов:", error);
    throw error; // Выбросим ошибку для дальнейшей обработки
  }
};
