import { Coordinates } from "./Coordinates";
import { Service } from "./Service";

export interface FoodSearchCriteria {
  day: Date;
  service: Service;
  nearTo: Coordinates;
}
