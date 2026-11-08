import { userMongoStore } from "../models/mongo/user-mongo-store.js";
import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";
import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";

export const adminController = {

  dashboard: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async function (request, h) {

      const users = await userMongoStore.getAllUsers();
      const categories = await categoryMongoStore.getAllCategories();
      const placemarks = await placemarkMongoStore.getAllPlacemarks();

      // Placemark count per category
      const categoryStats = categories.map((category) => {
        const count = placemarks.filter(p => p.categoryId?.toString() === category._id.toString()).length;
        return {
          name: category.name,
          count,
        };
      });

      return h.view("admin-dashboard-view", {
        usersCount: users.length,
        categoriesCount: categories.length,
        placemarksCount: placemarks.length,
        categoryStats,
      });
    },
  },

  users: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async function (request, h) {
      const users = await userMongoStore.getAllUsers();
      return h.view("admin-users-view", { users });
    },
  },

  deleteUser: {
    auth: {
      strategy: "session",
      scope: ["admin"],
    },
    handler: async function (request, h) {
      const id = request.params.id;
      await userMongoStore.deleteUser(id);
      return h.redirect("/admin/users");
    },
  },
};
