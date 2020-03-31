import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as bent from "bent";

const amplitudeApiKey = "5c31bee2a13ac300d00b08bf0f24826d";

const trackInAmplitude = bent(
  "https://api.amplitude.com/",
  "POST",
  "json",
  200
);

interface FoodOffer {
  contact: string;
  food_name: string;
  location_geohash: string;
  location: admin.firestore.GeoPoint;
  insertion_date: Date;
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

function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function track(event: any) {
  try {
    await trackInAmplitude("2/httpapi", {
      api_key: amplitudeApiKey,
      events: [{ user_id: makeId(16), ...event }]
    });
  } catch (error) {
    console.error(`Unable to track event: ${error}`);
  }
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
        const insertionDate = Date();

        const foodOffer = {
          contact,
          food_name: foodName,
          location_geohash: locationGeohash,
          location: new admin.firestore.GeoPoint(latitude, longitude),
          insertion_date: insertionDate
        };
        const document = await admin
          .firestore()
          .collection("food-offers")
          .add(foodOffer);

        await track({
          event_type: "create_food_offer",
          event_properties: { geohash: locationGeohash }
        });

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
          await track({
            event_type: "delete_food_offer",
            event_properties: { id }
          });
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
          await track({
            event_type: "find_food_offers",
            event_properties: {
              geohash: geohashes[8],
              number_of_items_found: document.docs.length
            }
          });
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

export const offerCount = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");

    switch (request.method) {
      case "OPTIONS":
        setCorsResponse(response, "GET");
        break;
      case "GET":
        const secret: string = request.query.secret;

        if (secret !== "gViCt8wfe3tZ!hmuect*neAAGv") {
          response.sendStatus(404);
        }

        const document = await admin
          .firestore()
          .collection("food-offers")
          .get();

        response.status(200).send({ count: document.docs.length });
        break;
    }
  });
