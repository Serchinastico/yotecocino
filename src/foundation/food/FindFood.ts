import { FoodOffer } from "../types/FoodOffer";
import { FoodSearchCriteria } from "../types/FoodSearchCriteria";
import MyCreatedFoodsRepository from "./MyCreatedFoodsRepository";
import axios from "axios";
import dayjs from "dayjs";
import Geohash from "latlon-geohash";

export default class FindFood {
  private myCreatedFoodsRepository = new MyCreatedFoodsRepository();

  async execute(criteria: FoodSearchCriteria): Promise<FoodOffer[]> {
    const day = dayjs(criteria.day).format("YYYY-MM-DD");
    const geohash = Geohash.encode(
      criteria.nearTo.latitude,
      criteria.nearTo.longitude,
      6
    );
    const neighborGeohashes = Geohash.neighbours(geohash);
    const neighbors = [
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
    const service = criteria.service.toString();

    const response = await axios.get(
      `https://europe-west1-yotecocino-d6292.cloudfunctions.net/offer?geohashes=${neighbors}&day=${day}&service=${service}`
    );
    return response.data;
  }
}
