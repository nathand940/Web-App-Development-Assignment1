import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import Jwt from "@hapi/jwt";

import { connectMongo } from "./models/db/mongo.js";
import { apiRoutes } from "./routes/api-routes.js";
import { webRoutes } from "./routes/web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { userMongoStore } from "./models/mongo/user-mongo-store.js";

import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  });

  // Avoid double Mongo connections in tests
  if (process.env.NODE_ENV !== "test") {
    await connectMongo();
  }

  await server.register([Vision, Inert, Cookie, Jwt]);

  Handlebars.registerHelper("ifEquals", function (a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("json", (context) => JSON.stringify(context));

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    layout: "main-layout",
    partialsPath: "./views/partials",
  });

  // Session auth for web
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "coffee-session",
      password: process.env.COOKIE_PASSWORD || "supersecretpassword",
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });

  // JWT auth for API
  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET || "supersecretjwt",   // unified fallback
    verify: {
      aud: "coffee-placemark-client",
      iss: "coffee-placemark-api",
      sub: false,
    },
    validate: async (artifacts, request, h) => {
      const userId = artifacts.decoded.payload.id;
      const user = await userMongoStore.getUserById(userId);
      if (!user) {
        return { isValid: false };
      }
      return { isValid: true, credentials: user };
    },
  });

  // Default auth for routes that don't specify one (e.g. "/")
  server.auth.default("session");

  server.route(webRoutes);
  server.route(apiRoutes);

  return server;
};

export const start = async () => {
  const server = await init();
  await server.start();
  console.log("Server running on:", server.info.uri);
  return server;
};

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exitCode = 1;
  });
}
