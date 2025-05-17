import { useEffect, useState } from "react";
import { Placemark } from "@pbe/react-yandex-maps";
import { getPlacemarks } from "../services/placemarkService";
import { Placemark as PlacemarkType } from "../types/placemark";

interface Props {
  onSelectPlacemark: (placemark: PlacemarkType) => void;
}

const PlacemarkList = ({ onSelectPlacemark }: Props) => {
  const [placemarks, setPlacemarks] = useState<PlacemarkType[]>([]);

  useEffect(() => {
    getPlacemarks().then(setPlacemarks).catch(console.error);
  }, []);

  return (
    <>
      {placemarks.map((mark) => (
        <Placemark
          key={mark.id}
          geometry={[mark.y_coord, mark.x_coord]}
          onClick={() => onSelectPlacemark(mark)}
        />
      ))}
    </>
  );
};

export default PlacemarkList;