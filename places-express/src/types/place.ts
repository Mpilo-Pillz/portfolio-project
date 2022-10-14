export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  title: string;
  description: string;
  coordinates?: Coordinates;
  location?: Coordinates;
  address: string;
  creator: string;
  imageUrl?: string;
  id?: string;
}
