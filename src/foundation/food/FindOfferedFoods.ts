import {FoodOffer} from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class FindOfferedFoods {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(): Promise<FoodOffer[]> {
        return Promise.resolve(
            this.myCreatedFoodsRepository.findAll()
        );
    }
}