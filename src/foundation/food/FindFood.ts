import {FoodOffer} from "../types/FoodOffer";
import {FoodSearchCriteria} from "../types/FoodSearchCriteria";

export default class FindFood {
    execute(criteira: FoodSearchCriteria): Promise<FoodOffer[]> {
        return Promise.resolve([]);
    }
}