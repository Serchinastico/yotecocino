import {FoodOffer} from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class SaveFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(food: FoodOffer): Promise<FoodOffer> {
        const foodWithId = {
            food: Date().toString(),
            ...food
        }
        this.myCreatedFoodsRepository.save(foodWithId);
        return Promise.resolve(foodWithId);
    }
}