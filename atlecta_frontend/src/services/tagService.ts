import http from "./http";

export const getTags = async (): Promise<string[]> => {
  const res = await http.get("/sports/"); //#TODO: Update the endpoint to fetch tags
  return res.data.map((tag: { name: string }) => tag.name);
};