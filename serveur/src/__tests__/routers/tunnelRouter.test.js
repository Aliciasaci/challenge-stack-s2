process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");

describe("Tunnel Router", () => {
  let server;
  let testTunnel;
  let createdTunnel;
  let testUser;

  beforeAll(async () => {
    server = app.listen(3000, () => {
      console.log("App listening on port 3000!");
    });
    const userResponse = await request(app).post("/users").send({
      firstname: "testsTing",
      lastname: "test",
      email: "test@testing.com",
      password: "12345",
    });
    testUser = userResponse.body;
    const response = await request(app).post("/tunnels").send({
      id_user: testUser.id,
      commentaire: "TunnelTest",
    });
    testTunnel = response.body;
  });

  afterAll(async () => {
    await request(app).delete(`/tunnels/${testTunnel.id}`);
    await request(app).delete(`/users/${testUser.id}`);
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of tunnels", async () => {
      const response = await request(app).get("/tunnels");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("POST /", () => {
    it("should create a tunnel", async () => {
      const response = await request(app).post("/tunnels").send({
        id_user: testUser.id,
        commentaire: "testTunnel",
      });
      createdTunnel = response.body;
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("PUT /:id", () => {
    it("should update a tunnel", async () => {
      const response = await request(app).put(`/tunnels/${testTunnel.id}`).send({
        id_user: testUser.id,
        commentaire: "testTunnel",
      });
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a tunnel", async () => {
      const response = await request(app).delete(`/tunnels/${createdTunnel.id}`);
      expect(response.status).toBe(204);
    });
  });
});
