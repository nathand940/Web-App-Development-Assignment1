import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";

import { webRoutes } from "./src/routes/web-routes.js";
import { accountsController } from "./src/controllers/accounts-controller.js";

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register plugins
  await server.register([Vision, Inert, Cookie]);

  // Configure Handlebars
  server.views({
    engines: { hbs: require("handlebars") },
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
      isSecure: false, // set true in production
    },
    redirectTo: "/login",
    validateFunc: accountsController.validate,
  });

  server.auth.default("session");

  // Register web routes
  server.route(webRoutes);

  // Coffee API disabled for now
  // import { coffeeRoutes } from "./src/routes/coffee-routes.js";
  // server.route(coffeeRoutes);

  await server.start();
  console.log("Server running on:", server.info.uri);
};

init();
