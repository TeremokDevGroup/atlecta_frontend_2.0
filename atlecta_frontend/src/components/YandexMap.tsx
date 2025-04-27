import { YMaps, Map } from "@pbe/react-yandex-maps";
import PlacemarkList from "./PlacemarkList";

const YandexMap = ({ onMapClick }: { onMapClick?: (info: { x_coord: number; y_coord: number; address: string }) => void }) => {
  const handleClick = async (e: ymaps.MapEvent) => {
    const coords = e.get("coords");
    const [lat, lon] = coords;

    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${import.meta.env.VITE_YANDEX_MAP_API_KEY}&geocode=${lon},${lat}`
    );
    const data = await response.json();
    const address =
      data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text || "";

    if (onMapClick) {
      onMapClick({ x_coord: lat, y_coord: lon, address });
    }
  };

  return (
    <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY }}>
      <Map
        defaultState={{
          center: [56.0105, 92.8526],
          zoom: 12,
        }}
        width="100%"
        height="100%"
        onClick={handleClick} // если ты передаёшь через пропсы
      >

        <PlacemarkList />
      </Map>
    </YMaps>
  );
};

export default YandexMap;