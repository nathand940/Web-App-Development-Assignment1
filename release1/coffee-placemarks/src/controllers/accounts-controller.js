// src/controllers/accounts-controller.js

import { userMemStore } from "../models/mem/user-mem-store.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import bcrypt from "bcrypt";

export const accountsController = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "Welcome" });
    },
  },

  showSignup: {
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h
          .view("signup-view", {
            title: "Sign up",
            error: error.details[0].message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;

      // Hash password
      user.password = await bcrypt.hash(user.password, 10);

      await userMemStore.addUser(user);
      return h.redirect("/login");
    },
  },

  showLogin: {
    handler: function (request, h) {
      return h.view("login-view", { title: "Login" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      failAction: function (request, h, error) {
        return h
          .view("login-view", {
            title: "Login",
            error: error.details[0].message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await userMemStore.getUserByEmail(email);

      if (!user) {
        return h.view("login-view", {
          title: "Login",
          error: "User not found",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return h.view("login-view", {
          title: "Login",
          error: "Invalid password",
        });
      }

      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  validate: async function (request, session) {
    const user = await userMemStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
