import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile'; // Хук для работы с профилем
import { UserProfile } from '../types/user'; // Типы профиля
import { getTags } from '../services/tagService'; // Сервис для получения доступных видов спорта

export const ProfileForm = () => {
  const { profile, updateProfile } = useProfile(); // Хук useProfile для получения и обновления профиля
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [availableSports, setAvailableSports] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Для отслеживания режима редактирования

  useEffect(() => {
    if (profile) {
      getTags().then(setAvailableSports).catch(console.error);
      setFormData(profile);
    }
  }, [profile]);

  if (!formData) return <div>Загрузка...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
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
    <div className="flex flex-col gap-6">
      <div className="text-right">
        <button
          type="button"
          onClick={() => setIsEditing(prev => !prev)}
          className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mb-4"
        >
          {isEditing ? 'Отменить редактирование' : 'Редактировать'}
        </button>
      </div>

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
          <label>Виды спорта</label>
          {isEditing ? (
            <div className="relative">
              <div
                className="border p-2 rounded cursor-pointer"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                {formData.sports.length
                  ? formData.sports.map(s => s.name).join(', ')
                  : 'Выбери виды спорта'}
              </div>
              {dropdownOpen && (
                <div className="absolute mt-1 z-10 bg-white border rounded shadow w-full max-h-48 overflow-y-auto">
                  {availableSports.map(sport => (
                    <label
                      key={sport}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.sports.some(s => s.name === sport)}
                        onChange={() => toggleSport(sport)}
                        className="mr-2"
                      />
                      <span className="text-black">{sport}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p>{formData.sports.map(s => s.name).join(', ')}</p>
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
