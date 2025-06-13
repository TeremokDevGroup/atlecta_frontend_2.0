export interface Placemark {
  name: string;
  x_coord: number;
  y_coord: number;
  address: string;
  tags: { name: string }[];
  inventory?: { amount: number; inventory: { name: string } }[];
  id?: number;
}

export interface PlacemarkClickInfo {
  x_coord: number;
  y_coord: number;
  address: string;
}
