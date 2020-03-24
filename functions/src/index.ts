import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";

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

export const offer = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    const rawGeohashes: string = request.query.geohashes;
    const dayInISO: string = request.query.day;
    const service: string = request.query.service;

    const geohashes = rawGeohashes.split(",");
    const day = dayjs(dayInISO);

    if (geohashes.length > 8) {
      response.sendStatus(400);
      return;
    }

    admin.initializeApp();

    const document = await admin
      .firestore()
      .collection("food-offers")
      .where("location_geohash", "in", geohashes)
      .where("day", ">=", day.startOf("day").toDate())
      .where(
        "day",
        "<",
        day
          .add(1, "day")
          .startOf("day")
          .toDate()
      )
      .where("service", "==", service)
      .get();

    if (document.docs.length === 0) {
      response.sendStatus(404);
    } else {
      response.send(document.docs[0].data() as FoodOffer);
      response.sendStatus(200);
    }
  });
