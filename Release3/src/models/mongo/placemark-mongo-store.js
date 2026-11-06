import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    return Placemark.find().lean();
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    return newPlacemark.save();
  },

  async getPlacemarksByUser(userId) {
    return Placemark.find({ userId }).lean();
  },

  async deletePlacemark(id) {
    return Placemark.findByIdAndDelete(id);
  },

  async getPlacemarkById(id) {
    return Placemark.findById(id).lean();
  },

  async updatePlacemarkImages(id, images) {
    return Placemark.findByIdAndUpdate(id, { images: images }, { new: true }).lean();
  },

  async getPlacemarksByCategory(userId, categoryId) {
    return Placemark.find({ userId, categoryId }).lean();
  },

  async updatePlacemark(id, updatedPlacemark) {
    return Placemark.findByIdAndUpdate(id, updatedPlacemark, { new: true }).lean();
  }
};

