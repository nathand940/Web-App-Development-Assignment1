import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { userMongoStore } from "../models/mongo/user-mongo-store.js";
import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";
import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";

import { uploadImageToFirebase } from "../utils/firebase-upload.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

export const apiController = {

  // -------------------------------------------------------
  // AUTHENTICATE USER (returns JWT)
  // -------------------------------------------------------
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await userMongoStore.getUserByEmail(email);

      if (!user) {
        return h.response({ error: "User not found" }).code(401);
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return h.response({ error: "Invalid password" }).code(401);
      }

      const token = jwt.sign(
        {
          id: user._id,
          iss: "coffee-placemark-api",
          aud: "coffee-placemark-client",
        },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    },
  },

  // -------------------------------------------------------
  // CREATE USER (public)
  // -------------------------------------------------------
  createUser: {
    auth: false,
    handler: async function (request, h) {
      const newUser = await userMongoStore.addUser(request.payload);
      return h.response(newUser).code(201);
    },
  },

  // -------------------------------------------------------
  // GET ALL USERS (protected)
  // -------------------------------------------------------
  getAllUsers: {
    auth: { strategy: "jwt" },
    handler: async function () {
      return userMongoStore.getAllUsers();
    },
  },

  // -------------------------------------------------------
  // GET ALL PLACEMARKS (protected)
  // -------------------------------------------------------
  getAllPlacemarks: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;
      return placemarkMongoStore.getPlacemarksByUser(user._id);
    },
  },

  // -------------------------------------------------------
  // GET PLACEMARK BY ID (protected)
  // -------------------------------------------------------
  getPlacemarkById: {
    auth: { strategy: "jwt" },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemark = await placemarkMongoStore.getPlacemarkById(request.params.id);

      if (!placemark || placemark.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      return placemark;
    },
  },

  // -------------------------------------------------------
  // ADD PLACEMARK (protected)
  // -------------------------------------------------------
  addPlacemark: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;

      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        categoryId: request.payload.categoryId || null,
        userId: user._id,
        images: [],
      };

      return placemarkMongoStore.addPlacemark(newPlacemark);
    },
  },

  // -------------------------------------------------------
  // UPDATE PLACEMARK (protected)
  // -------------------------------------------------------
  updatePlacemark: {
    auth: { strategy: "jwt" },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarkId = request.params.id;

      const placemark = await placemarkMongoStore.getPlacemarkById(placemarkId);
      if (!placemark || placemark.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      const updatedPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        categoryId: request.payload.categoryId || null,
      };

      return placemarkMongoStore.updatePlacemark(placemarkId, updatedPlacemark);
    },
  },

  // -------------------------------------------------------
  // DELETE PLACEMARK (protected)
  // -------------------------------------------------------
  deletePlacemark: {
    auth: { strategy: "jwt" },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemark = await placemarkMongoStore.getPlacemarkById(request.params.id);

      if (!placemark || placemark.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      await placemarkMongoStore.deletePlacemark(request.params.id);
      return { success: true };
    },
  },

  // -------------------------------------------------------
  // UPLOAD IMAGE TO PLACEMARK (protected)
  // -------------------------------------------------------
  addPlacemarkImage: {
    auth: { strategy: "jwt" },
    payload: {
      maxBytes: 1024 * 1024 * 5, // 5MB
      output: "data",
      parse: true,
      multipart: true,
    },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarkId = request.params.id;

      const placemark = await placemarkMongoStore.getPlacemarkById(placemarkId);
      if (!placemark || placemark.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      const file = request.payload.image;
      if (!file) {
        return h.response({ error: "No file uploaded" }).code(400);
      }

      const url = await uploadImageToFirebase(file);

      placemark.images.push(url);
      await placemark.save();

      return h.response({ success: true, url }).code(200);
    },
  },

  // -------------------------------------------------------
  // GET ALL CATEGORIES (protected)
  // -------------------------------------------------------
  getAllCategories: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;
      return categoryMongoStore.getCategoriesByUser(user._id);
    },
  },

  // -------------------------------------------------------
  // GET CATEGORY BY ID (protected)
  // -------------------------------------------------------
  getCategoryById: {
    auth: { strategy: "jwt" },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const category = await categoryMongoStore.getCategoryById(request.params.id);

      if (!category || category.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      return category;
    },
  },

  // -------------------------------------------------------
  // ADD CATEGORY (protected)
  // -------------------------------------------------------
  addCategory: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;

      const newCategory = {
        name: request.payload.name,
        userId: user._id,
      };

      return categoryMongoStore.addCategory(newCategory);
    },
  },

  // -------------------------------------------------------
  // DELETE CATEGORY (protected)
  // -------------------------------------------------------
  deleteCategory: {
    auth: { strategy: "jwt" },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const category = await categoryMongoStore.getCategoryById(request.params.id);

      if (!category || category.userId.toString() !== user._id.toString()) {
        return h.response({ error: "Unauthorized" }).code(403);
      }

      await categoryMongoStore.deleteCategory(request.params.id);
      return { success: true };
    },
  },

  // -------------------------------------------------------
  // GET PLACEMARKS BY CATEGORY (protected)
  // -------------------------------------------------------
  getPlacemarksByCategory: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;
      const categoryId = request.params.id;

      return placemarkMongoStore.getPlacemarksByCategory(user._id, categoryId);
    },
  },

  // -------------------------------------------------------
  // ADD PLACEMARK TO CATEGORY (protected)
  // -------------------------------------------------------
  addPlacemarkToCategory: {
    auth: { strategy: "jwt" },
    handler: async function (request) {
      const user = request.auth.credentials;
      const categoryId = request.params.id;

      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        categoryId,
        userId: user._id,
        images: [],
      };

      return placemarkMongoStore.addPlacemark(newPlacemark);
    },
  },
};
