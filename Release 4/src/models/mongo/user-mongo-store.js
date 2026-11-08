import bcrypt from "bcryptjs";
import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    return User.find().lean();
  },

  async addUser(user) {
    // If password is plain text, hash it
    if (user.password && !user.password.startsWith("$2")) {
      user.password = await bcrypt.hash(user.password, 10);
    }

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

  async deleteAll() {
    return User.deleteMany({});
  },
};
