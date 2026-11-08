import Lab from "@hapi/lab";
import { expect } from "@hapi/code";

import { setupServer, cleanupDatabase, getJwtToken } from "../test-helpers.js";

// Correct Mongoose model imports
import { User } from "../../src/models/mongo/user.js";
import { Category } from "../../src/models/mongo/category.js";
import { Placemark } from "../../src/models/mongo/placemark.js";

export const lab = Lab.script();
const { describe, it, before, after } = lab;

describe("Category API Tests", () => {

  let server;
  let token;
  let categoryId;

  before(async () => {
    server = await setupServer();

    // Clean DB before tests
    await User.deleteMany({});
    await Category.deleteMany({});
    await Placemark.deleteMany({});

    // Create test user
    await server.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        firstName: "Cat",
        lastName: "User",
        email: "cat@test.com",
        password: "pass"
      }
    });

    // Get JWT
    token = await getJwtToken(server, "cat@test.com", "pass");
  });

  after(async () => {
    await cleanupDatabase();
  });

  it("creates a category", async () => {
    const res = await server.inject({
      method: "POST",
      url: "/api/categories",
      headers: { Authorization: `Bearer ${token}` },
      payload: { name: "Test Category" }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.name).to.equal("Test Category");

    categoryId = res.result._id;
  });

  it("gets categories for user", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/categories",
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.length).to.be.above(0);
  });

  it("adds placemark to category", async () => {
    const res = await server.inject({
      method: "POST",
      url: `/api/categories/${categoryId}/placemarks`,
      headers: { Authorization: `Bearer ${token}` },
      payload: {
        name: "Cat Placemark",
        description: "Inside Category",
        location: "Somewhere"
      }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.categoryId).to.equal(categoryId);
  });

  it("gets placemarks in category", async () => {
    const res = await server.inject({
      method: "GET",
      url: `/api/categories/${categoryId}/placemarks`,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.length).to.be.above(0);
  });

  it("deletes category", async () => {
    const res = await server.inject({
      method: "DELETE",
      url: `/api/categories/${categoryId}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result.success).to.equal(true);
  });

});
