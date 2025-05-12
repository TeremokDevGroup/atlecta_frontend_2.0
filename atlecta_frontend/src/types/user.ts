export interface UserProfile {
  first_name: string;
  last_name: string;
  age: number;
  height: number;
  weight: number;
  gender: number;
  sports: { name: string }[];
  user_id: string;
  bio: string;
  profile_picture?: string;
}

export interface UserImage {
  url: string;
  id: string;
  is_profile_picture: boolean;
  uploaded_at: string;
}