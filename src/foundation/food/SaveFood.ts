import { FoodOffer } from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";
import dayjs from "dayjs";
import Geohash from "latlon-geohash";

export default class SaveFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(food: FoodOffer): Promise<FoodOffer | undefined> {
    const geohash = Geohash.encode(
      food.coordinates.latitude,
      food.coordinates.longitude,
      6
    );

    try {
      const response = await axios.post(
        "https://europe-west1-yotecocino-d6292.cloudfunctions.net/createOffer",
        {
          contact: food.contact,
          day: dayjs(food.date).format("YYYY-MM-DD"),
          foodname: food.food,
          geohash: geohash,
          latitude: food.coordinates.latitude,
          longitude: food.coordinates.longitude,
          service: food.service
        }
      );

      if (response.status !== 201 || response.data === undefined) {
        return undefined;
      }

      const foodWithId = {
        id: response.data.id,
        ...food
      };
      this.myCreatedFoodsRepository.save(foodWithId);
      return foodWithId;
    } catch (_) {
      return undefined;
    }
  }
}
