import {FoodOffer} from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class FindFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(food: FoodOffer): Promise<void> {
        this.myCreatedFoodsRepository.delete(food);
        return Promise.resolve();
    }
}