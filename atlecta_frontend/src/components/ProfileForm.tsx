import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { UserProfile } from '../types/user';
import { getTags } from '../services/tagService';
import { getUserProfileImages } from "../services/userService";

export const ProfileForm = () => {
  const { profile, updateProfile, uploadProfileImage } = useProfile();// Хук useProfile для получения и обновления профиля
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [availableSports, setAvailableSports] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      getTags().then(setAvailableSports).catch(console.error);
      setFormData(profile);
      if (profile) {
        getUserProfileImages(profile.user_id).then(setProfilePicture);
      }
    }
  }, [profile]);

  if (!formData) return <div>Загрузка...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfileImage(file);
      alert('Фото успешно обновлено!');
    } catch {
      alert('Ошибка при загрузке фото');
    }
  };


  const toggleSport = (sport: string) => {
    if (!formData) return;
    const exists = formData.sports.find(s => s.name === sport);
    const updatedSports = exists
      ? formData.sports.filter(s => s.name !== sport)
      : [...formData.sports, { name: sport }];
    setFormData({ ...formData, sports: updatedSports });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        // Здесь вызываем функцию обновления профиля через хук
        await updateProfile(formData); // Отправка данных на сервер
        alert('Профиль обновлён!');
        setIsEditing(false); // После успешного сохранения, выключаем режим редактирования
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        alert('Произошла ошибка при обновлении профиля');
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 h-screen overflow-auto">
      <div className="text-right">
        <button
          type="button"
          onClick={() => setIsEditing(prev => !prev)}
          className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mb-4"
        >
          {isEditing ? 'Отменить редактирование' : 'Редактировать'}
        </button>
      </div>
      {/* Image */}
      <div className="flex justify-center">
        <div className="w-full h-40 bg-gray-300 rounded-md mb-4 overflow-hidden flex items-center justify-center">
          {profilePicture ? (
            <img src={profilePicture} alt="Фото профиля" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 text-sm">Фото отсутствует</span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="text-center mb-4">
          <label className="cursor-pointer text-blue-600 underline text-sm">
            Загрузить фото
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md p-6 border rounded-xl shadow bg-white">
        {/* Имя */}
        <div>
          <label className="block text-black font-medium mb-2">Имя</label>
          {isEditing ? (
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Имя"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.first_name}</div>
          )}
        </div>

        {/* Фамилия */}
        <div>
          <label className="block text-black font-medium mb-2">Фамилия</label>
          {isEditing ? (
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Фамилия"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.last_name}</div>
          )}
        </div>

        {/* Возраст */}
        <div>
          <label className="block text-black font-medium mb-2">Возраст</label>
          {isEditing ? (
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="Возраст"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.age}</div>
          )}
        </div>

        {/* Рост */}
        <div>
          <label className="block text-black font-medium mb-2">Рост</label>
          {isEditing ? (
            <input
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              placeholder="Рост"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.height}</div>
          )}
        </div>

        {/* Вес */}
        <div>
          <label className="block text-black font-medium mb-2">Вес</label>
          {isEditing ? (
            <input
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Вес"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.weight}</div>
          )}
        </div>

        {/* О себе */}
        <div>
          <label className="block text-black font-medium mb-2">О себе</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="О себе"
              className="border p-2 rounded w-full"
            />
          ) : (
            <div className="text-gray-700">{formData.bio}</div>
          )}
        </div>

        {/* Выбор видов спорта */}
        <div>
          <label className='text-black'>Виды спорта</label>
          {isEditing ? (
            <div className="relative">
              <div
                className="border p-2 rounded cursor-pointer text-black"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                {formData.sports.length
                  ? formData.sports.map(s => s.name).join(', ')
                  : 'Выбери виды спорта'}
              </div>
              {dropdownOpen && (
                <div className="absolute mt-1 z-10 bg-white text-black border rounded shadow w-full max-h-48 overflow-y-auto">
                  {availableSports.map(sport => (
                    <label
                      key={sport}
                      className="flex items-center p-2 cursor-pointer text-black"
                    >
                      <input
                        type="checkbox"
                        checked={formData.sports.some(s => s.name === sport)}
                        onChange={() => toggleSport(sport)}
                        className="mr-2 text-black"
                      />
                      <span className="text-black">{sport}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-black">{formData.sports.map(s => s.name).join(', ')}</p>
          )}
        </div>


        {isEditing && (
          <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Сохранить
          </button>
        )}
      </form>
    </div>
  );
};
