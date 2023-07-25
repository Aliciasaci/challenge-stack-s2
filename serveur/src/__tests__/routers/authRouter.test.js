process.env.NODE_ENV = "test";
import request from "supertest";
import app, { listen } from "../../server.js";
import { describe } from "node:test";

describe("Auth Router", () => {
  let server;
  let createdUser;
  beforeAll(async () => {
    server = listen(3000, () => {
      console.log("App listening on port 3000!");
    });
  });

  afterAll(async () => {
    await server.close();
    await request(app).delete(`/users/${createdUser.id}`);
  });

  describe("POST /register", () => {
    it("should create a user", async () => {
      const response = await request(app).post("/register").send({
        firstname: "Authtest",
        lastname: "Authtest",
        email: "auth@test.com",
        password: "testtest",
      });
      createdUser = response.body;
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /login", () => {
    it("should login a user", async () => {
      const response = await request(app).post("/login").send({
        email: "auth@test.com",
        password: "testtest",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });
});
