import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import { setupServer, cleanupDatabase } from "../test-helpers.js";

// Correct Mongoose model import
import { User } from "../../src/models/mongo/user.js";

export const lab = Lab.script();
const { describe, it, before, after } = lab;

describe("User API Tests", () => {

  let server;

  before(async () => {
    server = await setupServer();

    // Clean DB before tests
    await User.deleteMany({});
  });

  after(async () => {
    await cleanupDatabase();
  });

  it("creates a new user", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        password: "pass"
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.email).to.equal("test@test.com");
  });

  it("authenticates and returns JWT", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/users/authenticate",
      payload: {
        email: "test@test.com",
        password: "pass"
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.token).to.exist();
  });

  it("rejects invalid login", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/users/authenticate",
      payload: {
        email: "test@test.com",
        password: "wrong"
      }
    });

    expect(res.statusCode).to.equal(401);
  });

});
