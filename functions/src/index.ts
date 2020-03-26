import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";

interface FoodOffer {
  contact: string;
  food_name: string;
  location_geohash: string;
  location: admin.firestore.GeoPoint;
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

admin.initializeApp();

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
        const foodName: string = request.body.foodname;
        const locationGeohash: string = request.body.geohash;
        const latitude: number = request.body.latitude;
        const longitude: number = request.body.longitude;

        const foodOffer = {
          contact,
          food_name: foodName,
          location_geohash: locationGeohash,
          location: new admin.firestore.GeoPoint(latitude, longitude)
        };
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
    response.set("Access-Control-Allow-Origin", "*");

    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "DELETE");
        break;
      case "DELETE":
        const id: string = request.query.id;

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
    response.set("Access-Control-Allow-Origin", "*");

    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "GET");
        break;
      case "GET":
        const rawGeohashes: string = request.query.geohashes;

        const geohashes = rawGeohashes.split(",");

        if (geohashes.length !== 9) {
          response.sendStatus(400);
          return;
        }

        const document = await admin
          .firestore()
          .collection("food-offers")
          .where("location_geohash", "in", geohashes)
          .get();

        if (document.docs.length === 0) {
          response.sendStatus(404);
        } else {
          response.status(200).send(
            document.docs
              .map(doc => doc.data() as FoodOffer)
              .map(foodOffer => {
                return {
                  food: foodOffer.food_name,
                  coordinates: {
                    latitude: foodOffer.location.latitude,
                    longitude: foodOffer.location.longitude
                  },
                  contact: foodOffer.contact
                };
              })
          );
        }
        break;
    }
  });
