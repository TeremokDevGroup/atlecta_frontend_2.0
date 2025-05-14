import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../services/userService";
import { UserProfile } from "../types/user";

export const UserProfilePage = () => {
  const { user_id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      getUserProfileById(user_id)
        .then(setProfile)
        .catch(console.error)
        .finally(() => setLoading(false));
    }

  }, [user_id]);

  if (loading) return <div className="p-4">Загрузка...</div>;
  if (!profile) return <div className="p-4 text-red-600">Профиль не найден</div>;

  return (
    <div className="min-h-screen bg-white pt-14 px-4">
      <div className="max-w-xl mx-auto p-6 bg-gray-50 border rounded-xl shadow">
        {profile?.images?.length > 0 && profile.images[0].url && (
          <div className="w-full h-40 bg-gray-300 rounded-md mb-4 overflow-hidden flex items-center justify-center">
            <img
              src={profile.images[0].url}
              alt="Фото профиля"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4 text-black">
          {profile.first_name} {profile.last_name}
        </h1>

        <div className="text-black space-y-2">
          <p><span className="font-bold">Возраст:</span> {profile.age}</p>
          <p><span className="font-bold">Рост:</span> {profile.height} см</p>
          <p><span className="font-bold">Вес:</span> {profile.weight} кг</p>
          <p><span className="font-bold">Пол:</span> {profile.gender === 1 ? "Мужской" : "Женский"}</p>
          <p><span className="font-bold">О себе:</span> {profile.bio}</p>
          <p>
            <span className="font-bold">Виды спорта:</span>{" "}
            {profile.sports.map((s) => s.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};
