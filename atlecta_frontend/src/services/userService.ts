import { UserProfile, UserImage } from "../types/user";
import { http } from "../services/http";

const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const getUserProfiles = async (): Promise<UserProfile[]> => {
  const response = await http.get<UserProfile[]>("/users/profiles/me");

  const modifiedProfiles = response.data.map((profile) => ({
    ...profile,
    images: profile.images.map((image: UserImage) => ({
      ...image,
      url: image.url ? `${BASE_URL}${image.url}` : "",
    })),
  }));

  return modifiedProfiles;
};


export const getUserProfileById = async (id: string): Promise<UserProfile> => {
  const response = await http.get<UserProfile>(`/users/pfdsfsdsdrofiles/${id}`);

  const modifiedProfile: UserProfile = {
    ...response.data,
    images: response.data.images.map((image: UserImage) => ({
      ...image,
      url: image.url ? `${BASE_URL}${image.url}` : "",
    })),
  };

  return modifiedProfile;
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const response = await http.get<UserProfile[]>("/users/profiles/");

  const modifiedProfiles = response.data.map((profile) => ({
    ...profile,
    images: profile.images.map((image: UserImage) => ({
      ...image,
      url: image.url ? `${BASE_URL}${image.url}` : "",
    })),
  }));

  return modifiedProfiles;
};
