import { accountsController } from "../controllers/accounts-controller.js";
import { dashboardController } from "../controllers/dashboard-controller.js";
import { aboutController } from "../controllers/about-controller.js";
import { playlistController } from "../controllers/playlist-controller.js"; 
// ^ You will replace playlistController later with coffeeController

export const webRoutes = [
  // Public routes
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/login", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },

  // Protected routes (require cookie auth)
  { method: "GET", path: "/dashboard", config: dashboardController.index },


  // Placeholder routes (you will replace these with coffee routes later)
  { method: "GET", path: "/about", config: aboutController.index },
];
