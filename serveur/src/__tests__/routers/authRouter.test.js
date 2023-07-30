process.env.NODE_ENV = "test";
import request from "supertest";
import app, { listen } from "../../server.js";
import { describe } from "node:test";
const bcrypt = require("bcrypt");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Auth Router", () => {
  let server;
  let createdUser;
  beforeAll(async () => {
    server = app.listen(0); // Listen on a random port
    const address = server.address();
    console.log(`Auth App listening on port ${address.port}!`);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /register", () => {
    it("should create a user", async () => {
      const user = {
        firstname: "Authtest",
        lastname: "Authtest",
        email: "auth@test.com",
        password: "testtest",
      };
      const response = await request(app).post("/register").send(user);
      createdUser = response.body;
      expect(response.status).toBe(201);
      compareAllExceptId(createdUser, user);
    });
  });

  describe("POST /login", () => {
    it("should login a user", async () => {
      const response = await request(app).post("/login").send({
        email: "auth@test.com",
        password: "testtest",
      });
      expect(response.status).toBe(200);
      compareAllExceptId(createdUser, response.body.user);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      const response = await request(app).delete(`/users/${createdUser.id}`);
      expect(response.status).toBe(204);
    });
  });

  async function compareAllExceptId(expectedUser, actualUser) {
    expect(actualUser).toEqual(expect.any(Object));
    expect(actualUser).toHaveProperty("firstname", expectedUser.firstname);
    expect(actualUser).toHaveProperty("lastname", expectedUser.lastname);
    expect(actualUser).toHaveProperty("email", expectedUser.email);
  }
});
