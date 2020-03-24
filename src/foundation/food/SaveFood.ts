import {FoodOffer} from "../types/FoodOffer";
import {Service} from "../types/Service";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";

export default class SaveFood {
    private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

    execute(food: FoodOffer): Promise<FoodOffer> {
        this.myCreatedFoodsRepository.save(food);
        return Promise.resolve(
            {
                address: "my address",
                coordinates: {
                    latitude: 54,
                    longitude: 5
                },
                food: "palomitas",
                service: Service.lunch,
                contact: "@Tylosan"
            }
        );
    }
}