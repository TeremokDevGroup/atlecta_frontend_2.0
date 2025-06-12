import { useState, useEffect } from 'react';
import { getTags } from '../services/tagService';

interface MapFilterProps {
  onApply: (filters: { types: string[] }) => void;
  onReset: () => void;
}

const MapFilter = ({ onApply, onReset }: MapFilterProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить теги.');
      }
    };

    fetchTags();
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onApply({ types: selectedTypes });
    setDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    onReset();
    setDropdownOpen(false);
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 w-64">
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">Виды спорта</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between bg-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-xs text-gray-700">
              {selectedTypes.length > 0 ? selectedTypes.join(', ') : 'Выберите виды спорта'}
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
                tags.map((type) => (
                  <label
                    key={type}
                    className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xs text-gray-700">{type}</span>
                  </label>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-gray-500">Загрузка тегов...</div>
              )}
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

export default MapFilter;