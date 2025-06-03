// src/components/SportsObjectsPanel.tsx
import { useState } from 'react';

type SportsObject = {
  id: number;
  name: string;
  type: string;
  coords: [number, number];
};

const sportsObjects: SportsObject[] = [
  { id: 1, name: 'Футбольное поле', type: 'football', coords: [55.751574, 37.573856] },
  { id: 2, name: 'Баскетбольная площадка', type: 'basketball', coords: [55.752, 37.573] },
  { id: 3, name: 'Теннисный корт', type: 'tennis', coords: [55.751, 37.574] },
  { id: 4, name: 'Спортивный зал', type: 'gym', coords: [55.753, 37.575] },
  { id: 5, name: 'Бассейн', type: 'pool', coords: [55.750, 37.572] },
];

type SportsObjectsPanelProps = {
  onSelect: (coords: [number, number]) => void;
};

export const SportsObjectsPanel = ({ onSelect }: SportsObjectsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Спортивные объекты
      </button>

      {isOpen && (
        <div className="mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden">
          <div className="py-1">
            {sportsObjects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => {
                  onSelect(obj.coords);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800"
              >
                {obj.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};