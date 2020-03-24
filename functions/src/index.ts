import * as functions from "firebase-functions";

export const createFoodOffer = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.sendStatus(201);
  });

export const deleteFoodOffer = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    response.sendStatus(200);
  });
