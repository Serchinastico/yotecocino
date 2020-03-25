import { FoodOffer } from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";

export default class FindFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(food: FoodOffer | string): Promise<boolean> {
    const effectiveFood =
      typeof food === "string"
        ? this.myCreatedFoodsRepository.find(food)
        : food;

    if (effectiveFood) {
      const response = await axios.delete(
        `https://europe-west1-yotecocino-d6292.cloudfunctions.net/deleteOffer?id=${effectiveFood?.id}`
      );

      if (response.status === 200) {
        this.myCreatedFoodsRepository.delete(effectiveFood);
      }
      
      return response.status === 200;
    } else {
      return false;
    }
  }
}
