import { Category } from "./category.js";

export const categoryMongoStore = {
  async getAllCategories() {
    return Category.find().lean();
  },

  async getCategoriesByUser(userId) {
    return Category.find({ userId }).lean();
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    return newCategory.save();
  },

  async deleteCategory(id) {
    return Category.findByIdAndDelete(id);
  },

  async getCategoryById(id) {
    return Category.findById(id).lean();
  },

};
