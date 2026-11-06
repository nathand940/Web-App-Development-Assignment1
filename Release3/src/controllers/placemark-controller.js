import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";
import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { upload } from "../utils/multer.js";

export const placemarkController = {

  // -------------------------------------------------------
  // LIST ALL PLACEMARKS
  // -------------------------------------------------------
  index: {
    handler: async function (request, h) {
      const user = request.auth.credentials;

      const placemarks = await placemarkMongoStore.getPlacemarksByUser(user._id);
      const categories = await categoryMongoStore.getCategoriesByUser(user._id);

      return h.view("placemark-view", {
        title: "Your Placemarks",
        user: user,
        placemarks: placemarks,
        categories: categories,
      });
    },
  },

  // -------------------------------------------------------
  // ADD PLACEMARK
  // -------------------------------------------------------
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

      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        categoryId: request.payload.categoryId || null,
        userId: user._id,
        images: [],
      };

      await placemarkMongoStore.addPlacemark(newPlacemark);
      return h.redirect("/placemarks");
    },
  },

  // -------------------------------------------------------
  // DELETE PLACEMARK
  // -------------------------------------------------------
  deletePlacemark: {
    handler: async function (request, h) {
      await placemarkMongoStore.deletePlacemark(request.params.id);
      return h.redirect("/placemarks");
    },
  },

  // -------------------------------------------------------
  // VIEW DETAILS PAGE
  // -------------------------------------------------------
  details: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarkId = request.params.id;

      const placemark = await placemarkMongoStore.getPlacemarkById(placemarkId);
      if (!placemark) return h.redirect("/placemarks");

      const category = placemark.categoryId
        ? await categoryMongoStore.getCategoryById(placemark.categoryId)
        : null;

      return h.view("placemark-details-view", {
        title: placemark.name,
        user: user,
        placemark: placemark,
        category: category,
      });
    },
  },

  // -------------------------------------------------------
  // IMAGE UPLOAD
  // -------------------------------------------------------
  uploadImage: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;

      await new Promise((resolve, reject) => {
        upload.single("image")(request, null, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      if (!request.file) return h.redirect(`/placemark/${placemarkId}`);

      const placemark = await placemarkMongoStore.getPlacemarkById(placemarkId);
      placemark.images.push(request.file.filename);

      await placemarkMongoStore.updatePlacemarkImages(placemarkId, placemark.images);

      return h.redirect(`/placemark/${placemarkId}`);
    },
  },

  // -------------------------------------------------------
  // SHOW EDIT PAGE
  // -------------------------------------------------------
  showEdit: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarkId = request.params.id;

      const placemark = await placemarkMongoStore.getPlacemarkById(placemarkId);
      const categories = await categoryMongoStore.getCategoriesByUser(user._id);

      return h.view("placemark-edit-view", {
        title: "Edit Placemark",
        user: user,
        placemark: placemark,
        categories: categories,
      });
    },
  },

  // -------------------------------------------------------
  // UPDATE PLACEMARK
  // -------------------------------------------------------
  updatePlacemark: {
    handler: async function (request, h) {
      const placemarkId = request.params.id;

      const updatedPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        categoryId: request.payload.categoryId || null,
      };

      await placemarkMongoStore.updatePlacemark(placemarkId, updatedPlacemark);

      return h.redirect(`/placemark/${placemarkId}`);
    },
  },
};




