import { Coordinates } from "./Coordinates";
import {Service} from "./Service";

export interface FoodOffer {
  food?: string;
  coordinates: Coordinates;
  service: Service;
  contact: string;
  date: string;
}
