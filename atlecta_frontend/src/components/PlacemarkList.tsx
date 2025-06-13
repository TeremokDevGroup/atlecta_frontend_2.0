import { useEffect, useState } from "react";
import { Placemark } from "@pbe/react-yandex-maps";
import { getPlacemarks, getFilteredPlacemarks } from "../services/placemarkService";
import { Placemark as PlacemarkType } from "../types/placemark";

interface Props {
  onSelectPlacemark: (placemark: PlacemarkType) => void;
  filters?: { types: string[] }; // Убедимся, что filters есть и имеет правильный тип
}

const PlacemarkList = ({ onSelectPlacemark, filters }: Props) => {
  const [placemarks, setPlacemarks] = useState<PlacemarkType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlacemarks = async () => {
      try {
        const data = filters?.types?.length
          ? await getFilteredPlacemarks(filters)
          : await getPlacemarks();
        setPlacemarks(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить объекты.");
      }
    };

    fetchPlacemarks();
  }, [filters]);

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <>
      {placemarks.map((mark) => (
        <Placemark
          key={mark.id}
          geometry={[mark.y_coord, mark.x_coord]}
          onClick={() => onSelectPlacemark(mark)}
        />
      ))}

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-600">Ошибка</h3>
              <button 
                onClick={closeErrorModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
    </>
  );
};

export default PlacemarkList;