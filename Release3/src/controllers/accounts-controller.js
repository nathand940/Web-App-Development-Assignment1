import { userMongoStore } from "../models/mongo/user-mongo-store.js";
import { placemarkMongoStore } from "../models/mongo/placemark-mongo-store.js";
import { categoryMongoStore } from "../models/mongo/category-mongo-store.js";

import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import bcrypt from "bcrypt";

export const accountsController = {

  // -------------------------------------------------------
  // HOME PAGE
  // -------------------------------------------------------
  index: {
    auth: { mode: "optional" },
    handler: function (request, h) {
      const user = request.auth.credentials;
      if (user) {
        return h.redirect("/dashboard");
      }
      return h.view("main", { title: "Welcome to Coffee Placemarks" });
    },
  },

  // -------------------------------------------------------
  // SIGNUP
  // -------------------------------------------------------
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign Up" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h
          .view("signup-view", {
            title: "Sign Up Error",
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

      await userMongoStore.addUser(user);
      return h.redirect("/login");
    },
  },

  // -------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------
  showLogin: {
    auth: false,
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
            title: "Login Error",
            error: error.details[0].message,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await userMongoStore.getUserByEmail(email);

      if (!user) {
        return h.view("login-view", {
          title: "Login Error",
          error: "User not found",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return h.view("login-view", {
          title: "Login Error",
          error: "Invalid password",
        });
      }

      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  // -------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  // -------------------------------------------------------
  // SETTINGS PAGE
  // -------------------------------------------------------
  showSettings: {
    handler: function (request, h) {
      const user = request.auth.credentials;

      return h.view("settings-view", {
        title: "Account Settings",
        user: user,
      });
    },
  },

  updateSettings: {
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h
          .view("settings-view", {
            title: "Account Settings",
            user: request.auth.credentials,
            error: error.details[0].message,
          })
          .takeover()
          .code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const updated = request.payload;

      // Hash password if changed
      const passwordChanged = !(await bcrypt.compare(updated.password, loggedInUser.password));
      if (passwordChanged) {
        updated.password = await bcrypt.hash(updated.password, 10);
      }

      await userMongoStore.updateUser(loggedInUser._id, updated);

      return h.redirect("/settings");
    },
  },

  // -------------------------------------------------------
  // ADMIN: LIST USERS
  // -------------------------------------------------------
  listUsers: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await userMongoStore.getAllUsers();

      return h.view("admin-users-view", {
        title: "User Administration",
        user: loggedInUser,
        users: users,
      });
    },
  },

  // -------------------------------------------------------
  // ADMIN: DELETE USER
  // -------------------------------------------------------
  deleteUser: {
    handler: async function (request, h) {
      await userMongoStore.deleteUserById(request.params.id);
      return h.redirect("/admin/users");
    },
  },

  // -------------------------------------------------------
  // ADMIN DASHBOARD
  // -------------------------------------------------------
  adminDashboard: {
    handler: async function (request, h) {
      const users = await userMongoStore.getAllUsers();
      const placemarks = await placemarkMongoStore.getAllPlacemarks();
      const categories = await categoryMongoStore.getAllCategories();

      return h.view("admin-dashboard-view", {
        title: "Admin Dashboard",
        users: users,
        userCount: users.length,
        placemarkCount: placemarks.length,
        categoryCount: categories.length,
      });
    },
  },

  // -------------------------------------------------------
  // COOKIE AUTH VALIDATION
  // -------------------------------------------------------
  validate: async function (request, session) {
    const user = await userMongoStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};

