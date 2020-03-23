import { Coordinates } from "./Coordinates";

export interface FoodOffer {
  address: string;
  coordinates: Coordinates;
  food: string;
  contact: string;
}
