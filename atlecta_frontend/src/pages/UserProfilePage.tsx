import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfileById } from "../services/userService";
import friendService from "../services/friendService";
import { UserProfile } from "../types/user";
import { FriendshipStatus } from "../types/friend";

export const UserProfilePage = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>(FriendshipStatus.None);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user_id) {
      Promise.all([
        getUserProfileById(user_id),
        friendService.getFriendshipStatus(user_id),
      ])
        .then(([profileData, status]) => {
          setProfile(profileData);
          setFriendshipStatus(status);
          setCurrentImageIndex(profileData.images?.length ? profileData.images.length - 1 : 0);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user_id]);

  const handleFriendAction = async (action: 'add' | 'block' | 'unblock') => {
    if (!user_id) {
      console.error('user_id is undefined');
      return;
    }
    setActionLoading(true);
    try {
      switch (action) {
        case 'add':
          await friendService.sendFriendRequest(user_id);
          setFriendshipStatus(FriendshipStatus.SentRequest);
          break;
        case 'block':
          await friendService.blockUser(user_id);
          setFriendshipStatus(FriendshipStatus.Blocked);
          break;
        case 'unblock':
          await friendService.unblockUser(user_id);
          setFriendshipStatus(FriendshipStatus.None);
          break;
      }
    } catch (error) {
      console.error('Friend action error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-xl font-medium text-gray-600">Загрузка профиля...</div>
    </div>
  );

  if (!profile) return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-xl font-medium text-red-600">Профиль не найден</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center p-4 mt-10">
        <div className="w-full max-w-4xl my-8 bg-white rounded-lg shadow-sm p-6">
          {/* Шапка профиля */}
          <div className="relative w-[320px] h-[180px] sm:w-[640px] sm:h-[360px] bg-gray-100 overflow-hidden rounded-lg shadow-md mx-auto">
            {profile?.images?.length ? (
              <>
                <img
                  src={profile.images[currentImageIndex].url}
                  alt="Фото профиля"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {profile.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev =>
                          (prev - 1 + profile.images.length) % profile.images.length
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-all z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev =>
                          (prev + 1) % profile.images.length
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-all z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {profile.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-black scale-125' : 'bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mb-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm text-black">Нет фото профиля</span>
              </div>
            )}
          </div>

          {/* Основное содержание */}
          <div className="mt-6">
            {/* Блок с именем и действиями */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                {profile.first_name} {profile.last_name}
              </h1>
              <div className="flex gap-3">
                {friendshipStatus === FriendshipStatus.None && (
                  <button
                    onClick={() => handleFriendAction('add')}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Добавить в друзья
                  </button>
                )}
                {friendshipStatus === FriendshipStatus.SentRequest && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                    Запрос отправлен
                  </span>
                )}
                {friendshipStatus === FriendshipStatus.Friend && (
                  <span className="px-4 py-2 bg-green-100 text-gray-700 rounded-md">
                    Друг
                  </span>
                )}
                {friendshipStatus === FriendshipStatus.ReceivedRequest && (
                  <span className="px-4 py-2 bg-yellow-100 text-gray-700 rounded-md">
                    Запрос в друзья
                  </span>
                )}
                <button
                  onClick={() => handleFriendAction(friendshipStatus === FriendshipStatus.Blocked ? 'unblock' : 'block')}
                  disabled={actionLoading}
                  className={`px-4 py-2 rounded-md ${friendshipStatus === FriendshipStatus.Blocked ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'} disabled:opacity-50`}
                >
                  {friendshipStatus === FriendshipStatus.Blocked ? 'Разблокировать' : 'Заблокировать'}
                </button>
              </div>
            </div>

            {/* Основная информация */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{profile.age} лет</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 22" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>{profile.height} см</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <span>{profile.weight} кг</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{profile.gender === 1 ? "Мужской" : "Женский"}</span>
              </div>
            </div>

            {/* Блок "О себе" */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">О себе</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {profile.bio || 'Нет информации'}
              </p>
            </div>

            {/* Блок "Виды спорта" */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Виды спорта</h2>
              {profile.sports.length ? (
                <div className="flex flex-wrap gap-3">
                  {profile.sports.map((sport, index) => (
                    <div key={index} className="px-4 py-2 bg-gray-100 rounded-full">
                      <span className="text-gray-700 font-medium">{sport.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">Виды спорта не выбраны</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};