import { FoodOffer } from "../types/FoodOffer";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";

export default class FindFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(food: FoodOffer | string): Promise<void> {
    const effectiveFood =
      typeof food === "string"
        ? this.myCreatedFoodsRepository.find(food)
        : food;

    if (effectiveFood) {
      await axios.delete(
        `https://europe-west1-yotecocino-d6292.cloudfunctions.net/deleteOffer?id=${effectiveFood?.id}`
      );
      this.myCreatedFoodsRepository.delete(effectiveFood);
    }
  }
}
