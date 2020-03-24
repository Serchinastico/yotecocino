import { FoodOffer } from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";
import dayjs from "dayjs";
import Geohash from "latlon-geohash";

export default class SaveFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(food: FoodOffer): Promise<FoodOffer> {
    const geohash = Geohash.encode(
      food.coordinates.latitude,
      food.coordinates.longitude,
      7
    );

    const response = await axios.post(
      "https://europe-west1-yotecocino-d6292.cloudfunctions.net/createOffer",
      {
        contact: food.contact,
        day: dayjs(food.date).format("YYYY-MM-dd"),
        foodname: food.food,
        geohash: geohash,
        service: food.service
      }
    );

    const foodWithId = {
      id: response.data.id,
      ...food
    };
    this.myCreatedFoodsRepository.save(foodWithId);
    return foodWithId;
  }
}
