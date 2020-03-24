import {FoodOffer} from "../types/FoodOffer";
import {FoodSearchCriteria} from "../types/FoodSearchCriteria";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class FindFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(criteira: FoodSearchCriteria): Promise<FoodOffer[]> {
        return Promise.resolve(
            this.myCreatedFoodsRepository.findAll()
        );

    }
}