import { accountsController } from "../controllers/accounts-controller.js";
import { dashboardController } from "../controllers/dashboard-controller.js";
import { aboutController } from "../controllers/about-controller.js";
import { coffeeController } from "../controllers/coffee-controller.js"; 
import { placemarkController } from "../controllers/placemark-controller.js";

export const webRoutes = [
  // Public routes
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/login", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "GET", path: "/settings", config: accountsController.showSettings },
  { method: "POST", path: "/settings", config: accountsController.updateSettings },
  { method: "GET", path: "/admin/users", config: accountsController.listUsers },
  { method: "GET", path: "/admin/delete/{id}", config: accountsController.deleteUser },
  { method: "GET", path: "/placemarks", config: placemarkController.index },
  { method: "POST", path: "/placemarks/add", config: placemarkController.addPlacemark },
  { method: "GET", path: "/placemarks/delete/{id}", config: placemarkController.deletePlacemark },



  // Protected routes (require cookie auth)
  { method: "GET", path: "/dashboard", config: dashboardController.index },


  // Placeholder routes (you will replace these with coffee routes later)
  { method: "GET", path: "/about", config: aboutController.index },
];
