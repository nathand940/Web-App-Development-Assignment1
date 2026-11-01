let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = String(Math.random());   // simple unique ID for mem store
    users.push(user);
    return user;
  },

  async getUserById(id) {
    return users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    return users.find((user) => user.email === email);
  },

  async deleteUser(id) {
    users = users.filter((user) => user._id !== id);
  },

  async deleteAll() {
    users = [];
  },
};
