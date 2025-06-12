// src/components/ProfileForm.tsx
import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { UserProfile } from '../types/user';
import { getTags } from '../services/tagService';

export const ProfileForm = () => {
  const { profile, updateProfile, uploadProfileImage } = useProfile();
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [availableSports, setAvailableSports] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      getTags().then(setAvailableSports).catch(console.error);
      setFormData(profile);
    }
  }, [profile]);

  if (!formData) return <div className="text-center py-8">Загрузка профиля...</div>;

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
        await updateProfile(formData);
        alert('Профиль обновлён!');
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        alert('Произошла ошибка при обновлении профиля');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Шапка профиля */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Мой профиль</h1>
            <button
              onClick={() => setIsEditing(prev => !prev)}
              className={`px-4 py-2 rounded-lg ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-800'} transition-colors`}
            >
              {isEditing ? 'Отменить' : 'Редактировать'}
            </button>
          </div>
        </div>

        {/* Основное содержимое */}
        <div className="p-6">
          {/* Аватар */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-blue-100 shadow">
              {formData?.images?.[0]?.url ? (
                <img src={formData.images[formData.images.length - 1].url} alt="Фото профиля" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span>Нет фото</span>
                </div>
              )}
            </div>
            {isEditing && (
              <label className="cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                Изменить фото
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Имя */}
              <div>
                <label className="block text-black font-medium mb-2">Имя</label>
                {isEditing ? (
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{formData.first_name || '—'}</div>
                )}
              </div>

              {/* Фамилия */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Фамилия</label>
                {isEditing ? (
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{formData.last_name || '—'}</div>
                )}
              </div>

              {/* Возраст */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Возраст</label>
                {isEditing ? (
                  <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{formData.age || '—'}</div>
                )}
              </div>

              {/* Рост */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Рост (см)</label>
                {isEditing ? (
                  <input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{formData.height || '—'}</div>
                )}
              </div>

              {/* Вес */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Вес (кг)</label>
                {isEditing ? (
                  <input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">{formData.weight || '—'}</div>
                )}
              </div>
            </div>

            {/* О себе */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">О себе</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg whitespace-pre-line">
                  {formData.bio || '—'}
                </div>
              )}
            </div>

            {/* Виды спорта */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Предпочитаемые виды спорта</label>
              {isEditing ? (
                <div className="relative">
                  <div
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span>
                      {formData.sports.length > 0 
                        ? formData.sports.map(s => s.name).join(', ')
                        : 'Выберите виды спорта'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {availableSports.map(sport => (
                        <label
                          key={sport}
                          className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.sports.some(s => s.name === sport)}
                            onChange={() => toggleSport(sport)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">{sport}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  {formData.sports.length > 0 
                    ? formData.sports.map(s => s.name).join(', ')
                    : 'Не указано'}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Сохранить изменения
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};