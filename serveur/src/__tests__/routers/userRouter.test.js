process.env.NODE_ENV = "test";
import request from "supertest";
const app = require("../../server.js");

describe("User Router", () => {
  let server;
  let testUser;
  let createdUser;
  beforeAll(async () => {
    server = app.listen(3000, () => {
      console.log("App listening on port 3000!");
    });
    const response = await request(app).post("/users").send({
      firstname: "testsTing",
      lastname: "test",
      email: "fodder@email.com",
      password: "12345",
    });
    testUser = response.body;
  });

  afterAll(async () => {
    await request(app).delete(`/users/${testUser.id}`);
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /:id", () => {
    it("should return a user", async () => {
      const response = await request(app).get(`/users/${testUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /", () => {
    it("should create a user", async () => {
      const response = await request(app).post("/users").send({
        firstname: "test",
        email: "test@testing.com",
        password: "test",
      });
      createdUser = response.body;
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("PUT /:id", () => {
    it("should update a user", async () => {
      const response = await request(app).put(`/users/${testUser.id}`).send({
        firstname: "test",
        email: "test@tesv.com",
        password: "test",
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a user", async () => {
      const response = await request(app).delete(`/users/${createdUser.id}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /:id/appid/", () => {
    it("should create an appid", async () => {
      const response = await request(app).post(`/users/${testUser.id}/appid/`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(String));
    });
  });

  describe("GET /:id/tags/", () => {
    it("should return a list of tags", async () => {
      const response = await request(app).get(`/users/${testUser.id}/tags/`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /:id/tunnels/", () => {
    it("should return a list of tunnels", async () => {
      const response = await request(app).get(`/users/${testUser.id}/tunnels/`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });
});
