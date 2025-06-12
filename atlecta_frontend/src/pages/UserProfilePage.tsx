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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-xl font-medium text-gray-600">Загрузка профиля...</div>
    </div>
  );

  if (!profile) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-xl font-medium text-red-600 ml-2 mr-2">Профиль не найден</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Шапка профиля на всю ширину */}
      <div className="relative w-full h-80 bg-gray-100">
        {profile?.images?.length > 0 && profile.images[0].url ? (
          <img
            src={profile.images[profile.images.length - 1].url}
            alt="Фото профиля"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Основное содержание с боковыми отступами */}
      <div className="w-full px-6 py-8 mx-auto">
        {/* Блок с именем и основной информацией */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile.first_name} {profile.last_name}
          </h1>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{profile.age} лет</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>{profile.height} см</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>{profile.weight} кг</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{profile.gender === 1 ? "Мужской" : "Женский"}</span>
            </div>
          </div>
        </div>

        {/* Блок "О себе" */}
        {profile.bio && (
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">О себе</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Блок "Виды спорта" */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Виды спорта</h2>
          <div className="flex flex-wrap gap-3">
            {profile.sports.map((sport, index) => (
              <div key={index} className="px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-gray-800 font-medium">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};