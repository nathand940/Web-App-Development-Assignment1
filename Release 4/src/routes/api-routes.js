import { apiController } from "../controllers/api-controller.js";

export const apiRoutes = [

  // PUBLIC ROUTES
  {
    method: "POST",
    path: "/api/users/authenticate",
    config: apiController.authenticate
  },

  {
    method: "POST",
    path: "/api/users",
    config: apiController.createUser
  },

  // USERS
  {
    method: "GET",
    path: "/api/users",
    config: apiController.getAllUsers
  },

  // PLACEMARKS
  {
    method: "GET",
    path: "/api/placemarks",
    config: apiController.getAllPlacemarks
  },

  {
    method: "POST",
    path: "/api/placemarks",
    config: apiController.addPlacemark
  },

  {
    method: "GET",
    path: "/api/placemarks/{id}",
    config: apiController.getPlacemarkById
  },

  {
    method: "PUT",
    path: "/api/placemarks/{id}",
    config: apiController.updatePlacemark
  },

  {
    method: "DELETE",
    path: "/api/placemarks/{id}",
    config: apiController.deletePlacemark
  },

  {
    method: "POST",
    path: "/api/placemarks/{id}/images",
    config: apiController.addPlacemarkImage
  },


  // CATEGORY → PLACEMARK NESTED ROUTES
  {
    method: "GET",
    path: "/api/categories/{id}/placemarks",
    config: apiController.getPlacemarksByCategory
  },

  {
    method: "POST",
    path: "/api/categories/{id}/placemarks",
    config: apiController.addPlacemarkToCategory
  },

  // CATEGORIES
  {
    method: "GET",
    path: "/api/categories",
    config: apiController.getAllCategories
  },

  {
    method: "GET",
    path: "/api/categories/{id}",
    config: apiController.getCategoryById
  },

  {
    method: "POST",
    path: "/api/categories",
    config: apiController.addCategory
  },

  {
    method: "DELETE",
    path: "/api/categories/{id}",
    config: apiController.deleteCategory
  },
];
