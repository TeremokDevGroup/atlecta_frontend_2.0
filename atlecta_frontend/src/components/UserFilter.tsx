import { useState, useEffect } from 'react';
import { getTags } from '../services/tagService';

interface UserFilterProps {
  initialFilters: { sports?: string[]; gender?: string; ageMin?: number; ageMax?: number; orderBy?: string[] };
  onApply: (filters: { sports?: string[]; gender?: string; ageMin?: number; ageMax?: number; orderBy?: string[] }) => void;
  onReset: () => void;
  onClose: () => void;
}

const UserFilter = ({ initialFilters, onApply, onReset, onClose }: UserFilterProps) => {
  const [selectedSports, setSelectedSports] = useState<string[]>(initialFilters.sports || []);
  const [selectedGender, setSelectedGender] = useState<string | undefined>(initialFilters.gender);
  const [ageMin, setAgeMin] = useState<number | undefined>(initialFilters.ageMin);
  const [ageMax, setAgeMax] = useState<number | undefined>(initialFilters.ageMax);
  const [sortParams, setSortParams] = useState<{ field: string; direction: 'asc' | 'desc' }[]>(
    initialFilters.orderBy?.map((param) => ({
      field: param.startsWith('-') ? param.slice(1) : param,
      direction: param.startsWith('-') ? 'desc' : 'asc',
    })) || []
  );
  const [tags, setTags] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить виды спорта.');
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    setSelectedSports(initialFilters.sports || []);
    setSelectedGender(initialFilters.gender);
    setAgeMin(initialFilters.ageMin);
    setAgeMax(initialFilters.ageMax);
    setSortParams(
      initialFilters.orderBy?.map((param) => ({
        field: param.startsWith('-') ? param.slice(1) : param,
        direction: param.startsWith('-') ? 'desc' : 'asc',
      })) || []
    );
  }, [initialFilters]);

  const toggleSport = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const toggleSortParam = (field: string) => {
    setSortParams((prev) => {
      const existing = prev.find((p) => p.field === field);
      if (!existing) {
        return [...prev, { field, direction: 'asc' }];
      }
      if (existing.direction === 'asc') {
        return prev.map((p) => (p.field === field ? { ...p, direction: 'desc' } : p));
      }
      return prev.filter((p) => p.field !== field);
    });
  };

  const handleApply = () => {
    const orderBy = sortParams.map((p) => (p.direction === 'desc' ? `-${p.field}` : p.field));
    onApply({
      sports: selectedSports,
      gender: selectedGender,
      ageMin,
      ageMax,
      orderBy: orderBy.length > 0 ? orderBy : undefined,
    });
  };

  const handleReset = () => {
    setSelectedSports([]);
    setSelectedGender(undefined);
    setAgeMin(undefined);
    setAgeMax(undefined);
    setSortParams([]);
    onReset();
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-800">Фильтры</h3>
        <button
          onClick={onClose}
          className="hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">Виды спорта</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between bg-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-xs text-gray-700">
              {selectedSports.length > 0 ? selectedSports.join(', ') : 'Выберите виды спорта'}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {tags.length > 0 ? (
                tags.map((sport) => (
                  <label
                    key={sport}
                    className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSports.includes(sport)}
                      onChange={() => toggleSport(sport)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xs text-gray-700">{sport}</span>
                  </label>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-gray-500">Загрузка видов спорта...</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">Пол</label>
        <select
          value={selectedGender || ''}
          onChange={(e) => setSelectedGender(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black text-xs"
        >
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>

      <div className="mb-4 ">
        <label className="block text-xs font-medium text-gray-700 mb-1">Возраст</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={ageMin || ''}
            onChange={(e) => setAgeMin(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs bg-white text-black"
          />
          <input
            type="number"
            placeholder="До"
            value={ageMax || ''}
            onChange={(e) => setAgeMax(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">Сортировка</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between bg-white"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          >
            <span className="text-xs text-gray-700">
              {sortParams.length > 0
                ? sortParams.map((p) => `${p.field} (${p.direction === 'asc' ? '↑' : '↓'})`).join(', ')
                : 'Выберите параметры'}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${sortDropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          {sortDropdownOpen && (
            <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {['age', 'height', 'weight', 'sports'].map((field) => {
                const param = sortParams.find((p) => p.field === field);
                return (
                  <label
                    key={field}
                    className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!param}
                      onChange={() => toggleSortParam(field)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      {field} {param ? `(${param.direction === 'asc' ? '↑' : '↓'})` : ''}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleApply}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
        >
          Применить
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors text-xs"
        >
          Сброс
        </button>
      </div>

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-600">Ошибка</h3>
              <button
                onClick={closeErrorModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-6">{error}</p>
            <div className="flex justify-end">
              <button
                onClick={closeErrorModal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilter;