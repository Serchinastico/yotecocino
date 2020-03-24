export interface Coordinates {
  latitude: number;
  longitude: number;
}


export interface RichLocation extends Coordinates{
  geohash: string
}