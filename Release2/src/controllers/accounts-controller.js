import { userJsonStore } from "../models/json/user-json-store.js";
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
    payload: UserSpec,   // reuse your existing Joi schema
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

    // If password changed, hash it
    if (updated.password !== loggedInUser.password) {
      updated.password = await bcrypt.hash(updated.password, 10);
    }

    // Update user in mem store
    loggedInUser.firstName = updated.firstName;
    loggedInUser.lastName = updated.lastName;
    loggedInUser.email = updated.email;
    loggedInUser.password = updated.password;

    return h.redirect("/dashboard");
  },
},

listUsers: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const users = await userMemStore.getAllUsers();

    const viewData = {
      title: "User Administration",
      user: loggedInUser,
      users: users,
    };

    return h.view("admin-users-view", viewData);
  },
},

deleteUser: {
  handler: async function (request, h) {
    const userId = request.params.id;
    await userMemStore.deleteUserById(userId);
    return h.redirect("/admin/users");
  },
},

