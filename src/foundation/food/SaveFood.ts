import {FoodOffer} from "../types/FoodOffer";
import {Service} from "../types/Service";

export default class SaveFood {
    execute(food: FoodOffer): Promise<FoodOffer> {
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