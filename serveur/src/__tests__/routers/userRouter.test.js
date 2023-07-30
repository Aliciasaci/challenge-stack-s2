import request from "supertest";
process.env.NODE_ENV = "test";
const app = require("../../server.js");
const bcrypt = require("bcrypt");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("User Router", () => {
  let server;
  let testUser;
  let createdUser;
  beforeAll(async () => {
    server = app.listen(0); // Listen on a random port
    const address = server.address();
    console.log(`userRouter listening on port ${address.port}!`);
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
      compareAllExceptId(testUser, response.body);
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

  async function compareAllExceptId(expectedUser, actualUser) {
    expect(actualUser).toEqual(expect.any(Object));
    expect(actualUser).toHaveProperty("firstname", expectedUser.firstname);
    expect(actualUser).toHaveProperty("lastname", expectedUser.lastname);
    expect(actualUser).toHaveProperty("email", expectedUser.email);
    bcrypt.compare(actualUser.password, expectedUser.password, (err, res) => {
      expect(res).toBe(true);
    });
  }
});
