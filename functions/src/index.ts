import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";

interface FoodOffer {
  contact: string;
  day: Date;
  food_name: string;
  location_geohash: string;
  service: string;
}

function setCorsResponse(
  response: functions.Response<any>,
  allowedMethod: string
) {
  response.set("Access-Control-Allow-Methods", allowedMethod);
  response.set("Access-Control-Allow-Headers", "Content-Type");
  response.set("Access-Control-Max-Age", "3600");
  response.status(204).send("");
}

export const createOffer = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");

    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "POST");
        break;
      case "POST":
        const contact: string = request.body.contact;
        const dayInISO: string = request.body.day;
        const foodName: string = request.body.foodname;
        const locationGeohash: string = request.body.geohash;
        const service: string = request.body.service;

        const foodOffer = {
          contact,
          day: dayjs(dayInISO).toDate(),
          food_name: foodName,
          location_geohash: locationGeohash,
          service
        };
        admin.initializeApp();
        const document = await admin
          .firestore()
          .collection("food-offers")
          .add(foodOffer);

        response
          .status(201)
          .send(JSON.stringify({ id: document.id, ...foodOffer }));
    }
  });

export const deleteOffer = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "DELETE");
        break;
      case "DELETE":
        const id: string = request.query.id;

        admin.initializeApp();
        const document = await admin
          .firestore()
          .collection("food-offers")
          .doc(id)
          .get();

        if (!document.exists) {
          response.sendStatus(404);
        } else {
          await document.ref.delete();
          response.sendStatus(200);
        }
        break;
    }
  });

export const offer = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "GET");
        break;
      case "GET":
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
          response.status(200).send(document.docs[0].data() as FoodOffer);
        }
        break;
    }
  });
