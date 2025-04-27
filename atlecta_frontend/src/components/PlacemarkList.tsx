import { Placemark as YPlacemark } from '@pbe/react-yandex-maps';
import { usePlacemarkData } from '../hooks/usePlacermarkData';

const PlacemarkList = () => {
  const { placemarks } = usePlacemarkData();

  return (
    <>
      {placemarks.map((item) => (
        <YPlacemark
          key={item.id}
          geometry={[item.x_coord, item.y_coord]}
          properties={{
            balloonContent: `
              <strong>${item.name}</strong><br/>
              <br>${item.address}<br/>
              Теги: ${item.tags.map((tag) => tag.name).join(', ')}`
          }}
        />
      ))}
    </>
  );
};

export default PlacemarkList;