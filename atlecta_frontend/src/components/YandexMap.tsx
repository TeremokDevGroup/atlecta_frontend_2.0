import { YMaps, Map } from "@pbe/react-yandex-maps";
import PlacemarkList from "./PlacemarkList";
import { Placemark as PlacemarkType } from "../types/placemark";

interface Props {
  onMapClick?: (info: { x_coord: number; y_coord: number; address: string }) => void;
  onPlacemarkClick?: (placemark: PlacemarkType) => void;
  filters?: { types: string[] };
}

const YandexMap = ({ onMapClick, onPlacemarkClick, filters }: Props) => {
  const handleClick = async (e: ymaps.MapEvent) => {
    try {
      const coords = e.get("coords");
      const [lat, lon] = coords;

      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}&geocode=${lon},${lat}`
      );
      const data = await response.json();
      const address =
        data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text || "";

      onMapClick?.({ x_coord: lat, y_coord: lon, address });
    } catch (error) {
      console.error('Ошибка при геокодировании:', error);
    }
  };

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY }}>
      <Map defaultState={{ center: [56.01, 92.85], zoom: 12 }} width="100%" height="100%" onClick={handleClick}>
        <PlacemarkList onSelectPlacemark={onPlacemarkClick!} filters={filters} />
      </Map>
    </YMaps>
  );
};

export default YandexMap;