import {FoodOffer} from "../types/FoodOffer";

export default class FindOfferedFoods {
    execute(): Promise<FoodOffer[]> {
        return Promise.resolve([]);
    }
}