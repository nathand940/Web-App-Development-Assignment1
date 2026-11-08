import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import { setupServer, cleanupDatabase, getJwtToken } from "../test-helpers.js";

// Correct Mongoose model imports
import { User } from "../../src/models/mongo/user.js";
import { Placemark } from "../../src/models/mongo/placemark.js";
import { Category } from "../../src/models/mongo/category.js";

export const lab = Lab.script();
const { describe, it, before, after } = lab;

describe("Placemark API Tests", () => {

  let server;
  let token;
  let placemarkId;

  before(async () => {
    server = await setupServer();

    // Clean DB before tests
    await User.deleteMany({});
    await Placemark.deleteMany({});
    await Category.deleteMany({});

    // Create + authenticate user
    await server.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        firstName: "Test",
        lastName: "User",
        email: "placemark@test.com",
        password: "pass"
      }
    });

    token = await getJwtToken(server, "placemark@test.com", "pass");
  });

  after(async () => {
    await cleanupDatabase();
  });

  it("creates a placemark", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/placemarks",
      headers: { Authorization: `Bearer ${token}` },
      payload: {
        name: "Test Placemark",
        description: "Test Description",
        location: "Test Location"
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.name).to.equal("Test Placemark");

    placemarkId = res.result._id;
  });

  it("gets all placemarks for user", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.length).to.be.above(0);
  });

  it("updates a placemark", async () => {
    const res = await server.inject({
      method: "PUT",
      url: `/api/placemarks/${placemarkId}`,
      headers: { Authorization: `Bearer ${token}` },
      payload: {
        name: "Updated Placemark",
        description: "Updated Description",
        location: "Updated Location"
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.name).to.equal("Updated Placemark");
  });

  it("deletes a placemark", async () => {
    const res = await server.inject({
      method: "DELETE",
      url: `/api/placemarks/${placemarkId}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.success).to.equal(true);
  });

});
