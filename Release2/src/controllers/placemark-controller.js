import { placemarkJsonStore } from "../models/json/placemark-json-store.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarks = await placemarkMemStore.getPlacemarksByUser(user._id);

      return h.view("placemark-view", {
        title: "Your Placemarks",
        user: user,
        placemarks: placemarks,
      });
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      failAction: function (request, h, error) {
        return h
          .view("placemark-view", {
            title: "Your Placemarks",
            user: request.auth.credentials,
            error: error.details[0].message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const newPlacemark = request.payload;

      newPlacemark.userId = user._id;

      await placemarkMemStore.addPlacemark(newPlacemark);
      return h.redirect("/placemarks");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const id = request.params.id;
      await placemarkMemStore.deletePlacemark(id);
      return h.redirect("/placemarks");
    },
  },
};
