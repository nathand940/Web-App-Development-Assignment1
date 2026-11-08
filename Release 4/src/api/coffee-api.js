import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";

export const coffeeApi = {
  getAllPlacemarks: {
    auth: false,
    handler: async function (request, h) {
      const placemarks = await placemarkMongoStore.getAllPlacemarks();
      return placemarks;
    },
  },

  addPlacemark: {
    auth: false,
    handler: async function (request, h) {
      const newPlacemark = request.payload;
      const placemark = await placemarkMongoStore.addPlacemark(newPlacemark);
      return placemark;
    },
  },

  deletePlacemark: {
    auth: false,
    handler: async function (request, h) {
      const id = request.params.id;
      await placemarkMongoStore.deletePlacemark(id);
      return { success: true };
    },
  },
};
