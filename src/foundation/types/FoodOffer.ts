import { Coordinates } from "./Coordinates";

export interface FoodOffer {
  id?: string;
  food: string;
  coordinates: Coordinates;
  contact: string;
}
