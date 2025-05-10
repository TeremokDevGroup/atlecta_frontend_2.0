import { useState } from "react";
import YandexMap from "../components/YandexMap";
import MapForm from "../components/MapForm";
import PlacemarkSidebar from "../components/PlacemarkSidebar";
import { Placemark as PlacemarkType } from "../types/placemark";

const YandexMapPage = () => {
  const [formCoords, setFormCoords] = useState<{
    x_coord: number;
    y_coord: number;
    address: string;
  } | null>(null);

  const [selectedPlacemark, setSelectedPlacemark] = useState<PlacemarkType | null>(null);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <YandexMap onMapClick={setFormCoords} onPlacemarkClick={setSelectedPlacemark} />

      {formCoords && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="pointer-events-auto z-10">
            <MapForm
              initialCoords={formCoords}
              onClose={() => setFormCoords(null)}
            />
          </div>
        </div>
      )}

      <PlacemarkSidebar placemark={selectedPlacemark} onClose={() => setSelectedPlacemark(null)} />
    </div>
  );
};

export default YandexMapPage;