import {FoodOffer} from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class SaveFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(food: FoodOffer): Promise<FoodOffer> {
        this.myCreatedFoodsRepository.save(food);
        return Promise.resolve(food);
    }
}