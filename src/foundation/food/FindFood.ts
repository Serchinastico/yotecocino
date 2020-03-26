import { FoodOffer } from "../types/FoodOffer";
import { FoodSearchCriteria } from "../types/FoodSearchCriteria";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";
import Geohash from "latlon-geohash";

export default class FindFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(criteria: FoodSearchCriteria): Promise<FoodOffer[]> {
    const geohash = Geohash.encode(
      criteria.nearTo.latitude,
      criteria.nearTo.longitude,
      6
    );
    const neighborGeohashes = Geohash.neighbours(geohash);
    const allGeohashes = [
      neighborGeohashes.nw,
      neighborGeohashes.n,
      neighborGeohashes.ne,
      neighborGeohashes.e,
      neighborGeohashes.se,
      neighborGeohashes.s,
      neighborGeohashes.sw,
      neighborGeohashes.w,
      geohash
    ];

    try {
      const response = await axios.get(
        `https://europe-west1-yotecocino-d6292.cloudfunctions.net/offer?geohashes=${allGeohashes}`
      );

      return response?.data ?? [];
    } catch (_) {
      return [];
    }
  }
}
