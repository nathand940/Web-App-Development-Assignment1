import { v4 as uuid } from "uuid";
import { db, init, save } from "./lowdb.js";

export const userJsonStore = {
  async getAllUsers() {
    await init();
    return db.data.users;
  },

  async addUser(user) {
    await init();
    user._id = uuid();
    db.data.users.push(user);
    await save();
    return user;
  },

  async getUserById(id) {
    await init();
    return db.data.users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    await init();
    return db.data.users.find((user) => user.email === email);
  },

  async deleteUserById(id) {
    await init();
    db.data.users = db.data.users.filter((user) => user._id !== id);
    await save();
  },
};
