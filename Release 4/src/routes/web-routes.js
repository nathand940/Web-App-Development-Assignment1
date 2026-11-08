import { accountsController } from "../controllers/accounts-controller.js";
import { dashboardController } from "../controllers/dashboard-controller.js";
import { placemarkController } from "../controllers/placemark-controller.js";
import { categoryController } from "../controllers/category-controller.js";
import { adminController } from "../controllers/admin-controller.js";

export const webRoutes = [
  // -------------------------------------------------------
  // PUBLIC ROUTES
  // -------------------------------------------------------
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/login", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },

  // -------------------------------------------------------
  // PROTECTED ROUTES (require cookie auth)
  // -------------------------------------------------------
  { method: "GET", path: "/dashboard", config: dashboardController.index },

  // User Settings
  { method: "GET", path: "/settings", config: accountsController.showSettings },
  { method: "POST", path: "/settings", config: accountsController.updateSettings },

  // -------------------------------------------------------
  // PLACEMARK ROUTES
  // -------------------------------------------------------
  { method: "GET", path: "/placemarks", config: placemarkController.index },
  { method: "POST", path: "/placemarks/add", config: placemarkController.addPlacemark },
  { method: "GET", path: "/placemarks/delete/{id}", config: placemarkController.deletePlacemark },

  // Placemark Details Page
  { method: "GET", path: "/placemark/{id}", config: placemarkController.details },

  // EDIT ROUTES
  { method: "GET", path: "/placemark/{id}/edit", config: placemarkController.showEdit },
  { method: "POST", path: "/placemark/{id}/edit", config: placemarkController.updatePlacemark },

  // Image Upload
  {
    method: "POST",
    path: "/placemark/{id}/uploadimage",
    config: {
      ...placemarkController.uploadImage,
      payload: {
        maxBytes: 209715200,
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
      },
    },
  },

  // -------------------------------------------------------
  // CATEGORY ROUTES
  // -------------------------------------------------------
  { method: "GET", path: "/categories", config: categoryController.index },
  { method: "POST", path: "/categories/add", config: categoryController.addCategory },
  { method: "GET", path: "/categories/delete/{id}", config: categoryController.deleteCategory },

  // -------------------------------------------------------
  // ADMIN ROUTES
  // -------------------------------------------------------
  { method: "GET", path: "/admin/users", config: accountsController.listUsers },
  { method: "GET", path: "/admin/delete/{id}", config: accountsController.deleteUser },
  { method: "GET", path: "/admin", config: accountsController.adminDashboard },
];


