import { useEffect, useState } from 'react';
import { getPlacemarks } from '../services/placemarkService';
import { Placemark } from '../types/placemark';

export const usePlacemarkData = () => {
  const [placemarks, setPlacemarks] = useState<Placemark[]>([]);

  useEffect(() => {
    getPlacemarks().then(setPlacemarks);
  }, []);

  return { placemarks };
};