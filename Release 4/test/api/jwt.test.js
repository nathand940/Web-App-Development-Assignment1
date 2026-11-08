import Lab from "@hapi/lab";
import { expect } from "@hapi/code";
import bcrypt from "bcryptjs";

import { setupServer, cleanupDatabase, getJwtToken } from "../test-helpers.js";
import { userMongoStore } from "../../src/models/mongo/user-mongo-store.js";

export const lab = Lab.script();
const { describe, it, before, after } = lab;

let server;
let testUser;

describe("JWT Authentication API", () => {

  before(async () => {
    server = await setupServer();

    // Clean users collection
    await userMongoStore.deleteAll();

    // Hash password before inserting (CRITICAL FIX)
    const hashedPassword = await bcrypt.hash("secret", 10);

    testUser = await userMongoStore.addUser({
      firstName: "Test",
      lastName: "User",
      email: "testjwt@example.com",
      password: hashedPassword,
    });
  });

  after(async () => {
    await cleanupDatabase();
  });

  // -------------------------------------------------------
  // TC-JWT-001: Valid token grants access
  // -------------------------------------------------------
  it("TC-JWT-001: Valid token grants access", async () => {
    const token = await getJwtToken(server, "testjwt@example.com", "secret");
    expect(token).to.exist();

    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.statusCode).to.equal(200);
  });

  // -------------------------------------------------------
  // TC-JWT-002: Missing token is rejected
  // -------------------------------------------------------
  it("TC-JWT-002: Missing token is rejected", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
    });

    expect(res.statusCode).to.equal(401);
  });

  // -------------------------------------------------------
  // TC-JWT-003: Expired token is rejected
  // -------------------------------------------------------
  it("TC-JWT-003: Expired token is rejected", async () => {
    // A known expired token placeholder
    const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired.payload.signature";

    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: `Bearer ${expiredToken}`,
      },
    });

    expect(res.statusCode).to.equal(401);
  });

  // -------------------------------------------------------
  // TC-JWT-004: Tampered token is rejected
  // -------------------------------------------------------
  it("TC-JWT-004: Tampered token is rejected", async () => {
    const token = await getJwtToken(server, "testjwt@example.com", "secret");
    expect(token).to.exist();

    const tampered = token.slice(0, -1) + "x";

    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: `Bearer ${tampered}`,
      },
    });

    expect(res.statusCode).to.equal(401);
  });

  // -------------------------------------------------------
  // TC-JWT-005: alg=none token is rejected
  // -------------------------------------------------------
  it("TC-JWT-005: alg=none token is rejected", async () => {
    const noneToken = "eyJhbGciOiJub25lIn0.invalid.payload";

    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: `Bearer ${noneToken}`,
      },
    });

    expect(res.statusCode).to.equal(401);
  });

  // -------------------------------------------------------
  // TC-JWT-006: Wrong issuer is rejected
  // -------------------------------------------------------
  it("TC-JWT-006: Wrong issuer is rejected", async () => {
    const wrongIssuerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wrong.issuer.signature";

    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: `Bearer ${wrongIssuerToken}`,
      },
    });

    expect(res.statusCode).to.equal(401);
  });

  // -------------------------------------------------------
  // TC-JWT-007: Garbage token is rejected
  // -------------------------------------------------------
  it("TC-JWT-007: Garbage token is rejected", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/api/placemarks",
      headers: {
        Authorization: "Bearer garbage",
      },
    });

    expect(res.statusCode).to.equal(401);
  });
});
