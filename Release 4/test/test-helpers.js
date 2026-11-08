import mongoose from "mongoose";
import { init } from "../src/server.js";

process.env.NODE_ENV = "test";

const TEST_DB = "mongodb://127.0.0.1:27017/placemark-test";

// Ensure test DB connection
async function ensureTestDbConnection() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_DB);
  }
}

// Create Hapi server for tests
export async function setupServer() {
  await ensureTestDbConnection();

  const server = await init();
  await server.initialize(); // required for server.inject()

  return server;
}

// Drop DB and close connection after tests
export async function cleanupDatabase() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
}

// Helper to get JWT token via API
export async function getJwtToken(server, email, password) {
  const res = await server.inject({
    method: "POST",
    url: "/api/users/authenticate",
    payload: { email, password },
  });

  return res.result?.token || null;
}
