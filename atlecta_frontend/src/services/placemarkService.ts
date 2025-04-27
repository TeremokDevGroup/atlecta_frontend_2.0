import http from "./http";
import { Placemark } from "../types/placemark";

export const getPlacemarks = async (): Promise<Placemark[]> => {
  const res = await http.get("sports/objects/");
  return res.data;
};

export const createPlacemark = async (data: Placemark): Promise<void> => {
  await http.post("/sports/object/", data);
};