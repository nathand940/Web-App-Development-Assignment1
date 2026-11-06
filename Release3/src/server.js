import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";

import { connectMongo } from "./src/models/db/mongo.js";
import { webRoutes } from "./src/routes/web-routes.js";
import { accountsController } from "./src/controllers/accounts-controller.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectMongo();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register plugins
  await server.register([Vision, Inert, Cookie]);

  // Register Handlebars helpers
  Handlebars.registerHelper("ifEquals", function (a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this);
  });

  // Configure Handlebars
  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./src/views",
    layoutPath: "./src/views/layouts",
    layout: "main-layout",
    partialsPath: "./src/views/partials",
  });

  // Cookie Auth Strategy
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "coffee-session",
      password: process.env.COOKIE_PASSWORD || "supersecretpassword",
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  // Register routes
  server.route(webRoutes);

  await server.start();
  console.log("Server running on:", server.info.uri);
};

init();



