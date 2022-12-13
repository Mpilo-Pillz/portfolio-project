export interface Place {
  id: string;
  title: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
  image: string;
}

export type googleMapsLocations = {
  lat: number;
  lng: number;
};
