import { userMongoStore } from "../models/mongo/user-mongo-store.js";
import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";
import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";


export const dashboardController = {

  // USER DASHBOARD (unchanged)
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;

      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
      };

      return h.view("dashboard-view", viewData);
    },
  },

  // ADMIN DASHBOARD WITH ANALYTICS (Release 4)
  admin: {
    handler: async function (request, h) {

      const users = await userMongoStore.getAllUsers();
      const placemarks = await placemarkMongoStore.getAllPlacemarks();
      const categories = await categoryMongoStore.getAllCategories();

      // Placemarks per category
      const placemarksPerCategory = categories.map((category) => {
        const count = placemarks.filter((p) => p.categoryId === category._id).length;
        return { name: category.name, count };
      });

      // Placemarks per user
      const placemarksPerUser = users.map((user) => {
        const count = placemarks.filter((p) => p.userId === user._id).length;
        return { name: `${user.firstName} ${user.lastName}`, count };
      });

      const viewData = {
        title: "Admin Dashboard",
        userCount: users.length,
        placemarkCount: placemarks.length,
        categoryCount: categories.length,
        users: users,
        analytics: {
          placemarksPerCategory,
          placemarksPerUser,
        },
      };

      return h.view("admin-dashboard-view", viewData);
    },
  },
};
