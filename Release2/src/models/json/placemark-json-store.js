import { v4 as uuid } from "uuid";
import { db, init, save } from "./lowdb.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await init();
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await init();
    placemark._id = uuid();
    db.data.placemarks.push(placemark);
    await save();
    return placemark;
  },

  async getPlacemarksByUser(userId) {
    await init();
    return db.data.placemarks.filter((p) => p.userId === userId);
  },

  async deletePlacemark(id) {
    await init();
    db.data.placemarks = db.data.placemarks.filter((p) => p._id !== id);
    await save();
  },
};
