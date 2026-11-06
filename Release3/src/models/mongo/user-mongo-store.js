import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    return User.find().lean();
  },

  async addUser(user) {
    const newUser = new User(user);
    return newUser.save();
  },

  async getUserByEmail(email) {
    return User.findOne({ email }).lean();
  },

  async getUserById(id) {
    return User.findById(id).lean();
  },

  async deleteUserById(id) {
    return User.findByIdAndDelete(id);
  },
};
