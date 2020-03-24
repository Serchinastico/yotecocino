import { Coordinates } from "./Coordinates";
import {Service} from "./Service";

export interface FoodOffer {
  address: string;
  coordinates: Coordinates;
  food: string;
  service: Service
  contact: string;
}
