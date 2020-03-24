import {FoodOffer} from "../types/FoodOffer";

const LOCAL_STORAGE_KEY = "yotecocino-myFoods";

export default class MyCreatedFoodsRepository {

    save(food: FoodOffer): FoodOffer {
        const allFoods = this.findAll();
        allFoods.push(food);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allFoods));
        return food
    }

    find(id: String): FoodOffer | undefined {
        const allFoods = this.findAll();
        return allFoods.find((food) => food.food === id);
    }

    findAll(): FoodOffer[] {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
    }

    delete(foodOffer: FoodOffer | string): void {
        const allFoods = this.findAll();
        const lessFood = allFoods.filter((item) => {
            const food = typeof foodOffer === "string" ? foodOffer : foodOffer.food;
            return item.food !== food;
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessFood));
    }

}