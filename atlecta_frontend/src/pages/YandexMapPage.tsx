import { useState } from "react";
import YandexMap from "../components/YandexMap";
import MapForm from "../components/MapForm";
import PlacemarkSidebar from "../components/PlacemarkSidebar";
import MapFilter from "../components/MapFilter";
import { Placemark as PlacemarkType } from "../types/placemark";

const YandexMapPage = () => {
  const [formCoords, setFormCoords] = useState<{
    x_coord: number;
    y_coord: number;
    address: string;
  } | null>(null);

  const [selectedPlacemark, setSelectedPlacemark] = useState<PlacemarkType | null>(null);
  const [filters, setFilters] = useState<{ types: string[] } | undefined>(undefined);

  const handleApplyFilters = (newFilters: { types: string[] }) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(undefined);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <YandexMap
        onMapClick={setFormCoords}
        onPlacemarkClick={setSelectedPlacemark}
        filters={filters}
      />

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

      <div className="absolute top-4 left-4 z-20 mt-10">
        <MapFilter onApply={handleApplyFilters} onReset={handleResetFilters} />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <PlacemarkSidebar
          placemark={selectedPlacemark}
          onClose={() => setSelectedPlacemark(null)}
        />
      </div>
    </div>
  );
};

export default YandexMapPage;