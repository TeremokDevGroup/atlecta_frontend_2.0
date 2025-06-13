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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (placemark?.id) {
      getObjectImages(placemark.id).then(setImages);
      setCurrentIndex(0);
    }
  }, [placemark]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && placemark?.id) {
      try {
        setIsUploading(true);
        await uploadObjectImage(placemark.id, file);
        const updated = await getObjectImages(placemark.id);
        setImages(updated);
      } finally {
        setIsUploading(false);
      }
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
      className={`fixed top-0 left-0 h-screen w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        placemark ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col mt-10">
        {/* Шапка сайдбара */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Детали объекта</h2>
            <button 
              onClick={onClose} 
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {placemark && (
            <p className="mt-2 text-blue-100">
              Просмотр информации о спортивном объекте
            </p>
          )}
        </div>

        {/* Галерея изображений */}
        <div className="relative bg-gray-50">
          {images.length > 0 ? (
            <>
              <div className="h-64 w-full overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={images[currentIndex]}
                  alt={`Фото объекта ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Навигация по фото */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Индикаторы */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentIndex ? "bg-blue-600 scale-125" : "bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 w-full flex items-center justify-center bg-gray-100 text-gray-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Нет изображений</p>
              </div>
            </div>
          )}
        </div>

        {/* Кнопка загрузки */}
        <div className="p-4 border-b border-gray-200">
          <label className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg cursor-pointer transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>{isUploading ? "Загрузка..." : "Добавить фото"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Основная информация */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {placemark ? (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{placemark.name}</h3>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{placemark.address}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Теги объекта
                </h4>
                <div className="flex flex-wrap gap-2">
                  {placemark.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Инвентарь */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                  </svg>
                  Инвентарь
                </h4>
                {placemark.inventory && placemark.inventory.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {placemark.inventory.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                      >
                        {item.inventory.name} ({item.amount})
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Инвентарь не указан</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Выберите объект на карте для просмотра информации</p>
            </div>
          )}
        </div>

        {/* Футер */}
        {/* {placemark && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Редактировать объект
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PlacemarkSidebar;