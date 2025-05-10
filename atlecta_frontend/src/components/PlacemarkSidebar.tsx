import { Placemark as PlacemarkType } from "../types/placemark";

interface Props {
  placemark: PlacemarkType | null;
  onClose: () => void;
}

const PlacemarkSidebar = ({ placemark, onClose }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        placemark ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Информация</h2>
          <button onClick={onClose} className="text-blue-600">Закрыть</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {placemark ? (
            <div className="text-black space-y-4">
              <div>
                <h3 className="text-lg font-bold">{placemark.name}</h3>
                <p className="text-gray-600">{placemark.address}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Теги:</p>
                <ul className="list-disc list-inside space-y-1">
                  {placemark.tags.map((tag, i) => (
                    <li key={i}>{tag.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Нет данных</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacemarkSidebar;
