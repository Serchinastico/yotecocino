import {FoodOffer} from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class FindFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(food: FoodOffer | string): Promise<void> {
        const effectiveFood = typeof food === "string" ? this.myCreatedFoodsRepository.find(food) : food;
        if (effectiveFood) {
            this.myCreatedFoodsRepository.delete(effectiveFood);
            return Promise.resolve();
        }
        return Promise.resolve();
    }
}