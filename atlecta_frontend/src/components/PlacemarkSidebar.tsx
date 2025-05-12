import { useEffect, useState } from "react";
import { Placemark as PlacemarkType } from "../types/placemark";
import { getObjectImages, uploadObjectImage } from "../services/imageService";

interface Props {
  placemark: PlacemarkType | null;
  onClose: () => void;
}

const PlacemarkSidebar = ({ placemark, onClose }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (placemark?.id) {
      getObjectImages(placemark.id).then(setImages);
    }
  }, [placemark]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && placemark?.id) {
      await uploadObjectImage(placemark.id, file);
      const updated = await getObjectImages(placemark.id);
      setImages(updated);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${placemark ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Информация</h2>
          <button onClick={onClose} className="text-blue-600">Закрыть</button>
        </div>
        {images.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden h-60 w-full rounded-lg">
              <img
                src={images[currentIndex]}
                alt={`Фото ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Стрелки */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow text-black"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow text-black"
            >
              →
            </button>
            {/* Индикаторы */}
            <div className="flex justify-center mt-2 space-x-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center">
          <div className="text-sm text-blue-600 underline cursor-pointer mt-4">
            <label>
              Загрузить фото
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-black">
          {placemark ? (
            <>
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
            </>
          ) : (
            <p className="text-gray-500">Нет данных</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacemarkSidebar;
