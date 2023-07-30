process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Tunnel Router", () => {
    let server;
    let testTunnel;
    let createdTunnel;
    let testUser;

    beforeAll(async () => {
        server = app.listen(0); // Listen on a random port
        const address = server.address();
        console.log(`userRouter listening on port ${address.port}!`);
        const userResponse = await request(app).post("/users").send({
            firstname: "testFname",
            lastname: "testLname",
            email: "test1@testing.com",
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
            expect(response.body).toContainEqual(expect.objectContaining(testTunnel));
        });
    });

    describe("POST /", () => {
        it("should create a tunnel", async () => {
        let actualTunnel = {
            id_user: testUser.id,
            commentaire: "testTunnel",
        };
        const response = await request(app).post("/tunnels").send(actualTunnel);
            createdTunnel = response.body;
            expect(response.body).toEqual(expect.any(Object));
            expect(response.status).toBe(201);
            compareAllExceptId(actualTunnel, createdTunnel);
        });
    });

    describe("DELETE /:id", () => {
        it("should delete a tunnel", async () => {
            const response = await request(app).delete(`/tunnels/${createdTunnel.id}`);
            expect(response.status).toBe(204);
        });
    });

    describe("GET /:id", () => {
        it('should respond with status code 404 if resource is not found', async () => {
            const tunnelId = 1;
            const response = await request(app).get(`/tunnels/${tunnelId}`);
            expect(response.status).toEqual(404);
        });
    });

  function compareAllExceptId(expectedTunnel, actualTunnel) {
    expect(actualTunnel).toEqual(expect.any(Object));
    expect(actualTunnel.commentaire).toEqual(expectedTunnel.commentaire);
    expect(actualTunnel.id_user).toEqual(expectedTunnel.id_user);
    expect(actualTunnel).toEqual(expect.objectContaining(expectedTunnel));
  }
});
