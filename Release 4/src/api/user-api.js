import { userMongoStore } from "../models/mongo/user-mongo-store.js";

export const userApi = {
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await userMongoStore.authenticate(email, password);
      return user;
    },
  },
};
