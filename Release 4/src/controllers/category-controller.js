import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const categories = await categoryMongoStore.getCategoriesByUser(user._id);

      return h.view("category-view", {
        title: "Categories",
        user: user,
        categories: categories,
      });
    },
  },

  addCategory: {
    handler: async function (request, h) {
      const user = request.auth.credentials;

      const newCategory = {
        name: request.payload.name,
        userId: user._id,
      };

      await categoryMongoStore.addCategory(newCategory);
      return h.redirect("/categories");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      await categoryMongoStore.deleteCategory(request.params.id);
      return h.redirect("/categories");
    },
  },
};
