import {FoodOffer} from "../types/FoodOffer";

export default class FindFood {
    execute(food: FoodOffer): Promise<void> {
        return Promise.resolve();
    }
}