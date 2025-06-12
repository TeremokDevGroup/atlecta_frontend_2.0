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
  const response = await http.get<UserProfile>(`/users/profiles/${id}`);

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
  const response = await http.get<UserProfile[]>("/users/profiles");

  const modifiedProfiles = response.data.map((profile) => ({
    ...profile,
    images: profile.images.map((image: UserImage) => ({
      ...image,
      url: image.url ? `${BASE_URL}${image.url}` : "",
    })),
  }));

  return modifiedProfiles;
};

export const getFilteredUsers = async (filters: { sports?: string[]; orderBy?: string[] }): Promise<UserProfile[]> => {
  const params = new URLSearchParams();
  if (filters.sports && filters.sports.length > 0) {
    params.append("sports__name__in", filters.sports.join(","));
  }
  if (filters.orderBy && filters.orderBy.length > 0) {
    params.append("order_by", filters.orderBy.join(","));
  }

  const response = await http.get<UserProfile[]>(`/users/profiles?${params.toString()}`);

  const modifiedProfiles = response.data.map((profile) => ({
    ...profile,
    images: profile.images.map((image: UserImage) => ({
      ...image,
      url: image.url ? `${BASE_URL}${image.url}` : "",
    })),
  }));

  return modifiedProfiles;
};