import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface FoodOffer {
  contact: string;
  day: Date;
  food_name: string;
  location: Location;
  location_geohash: string;
  service: string;
}

export const createFoodOffer = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    admin.initializeApp();
    const document = await admin
      .firestore()
      .collection("food-offers")
      .where("contact", "==", "@serchinastico")
      .get();

    const result: FoodOffer = document.docs[0].data() as FoodOffer;
    response.send(`Holi: ${JSON.stringify(result)}`);
    response.sendStatus(201);
  });

export const deleteFoodOffer = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.sendStatus(200);
  });

export const searchFoodOffers = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.sendStatus(200);
  });
