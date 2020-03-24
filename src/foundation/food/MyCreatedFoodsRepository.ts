import {FoodOffer} from "../types/FoodOffer";

const LOCAL_STORAGE_KEY = "yotecocino-myFoods";

export default class MyCreatedFoodsRepository {

    save(food: FoodOffer): FoodOffer {
        const allFoods = this.findAll();
        allFoods.push(food);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allFoods));
        return food
    }

    findAll(): FoodOffer[] {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
    }

    delete(foodOffer: FoodOffer ): void{
        const allFoods = this.findAll();
        const lessFood = allFoods.filter((item) =>  {
            return item.food !== foodOffer.food;
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessFood));
    }

}