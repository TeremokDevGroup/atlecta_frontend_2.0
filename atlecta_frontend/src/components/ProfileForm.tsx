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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Инициализируем 0

  useEffect(() => {
    if (profile) {
      getTags().then(setAvailableSports).catch(console.error);
      setFormData(profile);
      setCurrentImageIndex(profile.images?.length ? profile.images.length - 1 : 0); // Устанавливаем последний индекс
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
      const updatedProfile = await uploadProfileImage(file);
      setFormData(updatedProfile); // Синхронизируем formData с обновлённым профилем
      setCurrentImageIndex(updatedProfile.images.length - 1); // Переходим к новому фото
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
            <div className="w-full h-64 rounded-lg bg-gray-200 mb-4 overflow-hidden shadow-lg relative">
              {formData?.images?.length ? (
                <>
                  {/* Основное изображение с использованием currentImageIndex */}
                  <img
                    src={formData.images[currentImageIndex].url}
                    alt="Фото профиля"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Навигация по карусели */}
                  {formData.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev =>
                          (prev - 1 + formData.images.length) % formData.images.length
                        )}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <button
                        onClick={() => setCurrentImageIndex(prev =>
                          (prev + 1) % formData.images.length
                        )}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Индикаторы с активным состоянием */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {formData.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
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