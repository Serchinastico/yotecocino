import {Service} from "./Service";
import {Coordinates} from "./Coordinates";

export interface FoodSearchCriteria {
    day: Date,
    service: Service,
    nearTo: Coordinates
}


