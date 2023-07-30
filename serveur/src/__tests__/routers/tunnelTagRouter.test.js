process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Tunnel Tag Router", () => {
    let server;
    let testTunnel;
    let createdTunnelTag;
    let testUser;
    let testTag;

    beforeAll(async () => {
        server = app.listen(0); // Listen on a random port
        const userResponse = await request(app).post("/users").send({
            firstname: "testFnamess",
            lastname: "testLnamess",
            email: "test1ss@testing.com",
            password: "12345",
        });
        testUser = userResponse.body;
        const response = await request(app).post("/tunnels").send({
            id_user: testUser.id,
            commentaire: "TunnelTest",
        });
        testTunnel = response.body;
        const responseTag = await request(app).post("/tags").send({
            id_user: testUser.id,
            commentaire: "TagTest",
            description: "TagDescription",
        });
        testTag = responseTag.body;
    });

    afterAll(async () => {
        await request(app).delete(`/tags/${testTag.id}`);
        await request(app).delete(`/tunnels/${testTunnel.id}`);
        await request(app).delete(`/users/${testUser.id}`);
        await server.close();
    }, 10000);

    describe("POST /", () => {
        it("should create a tunneltag", async () => {
            let actualTunnelTag = {
                id_tunnel: testTunnel.id,
                id_tag: testTag.id,
                ordre: 1,
            };
            const response = await request(app).post("/tunneltag").send(actualTunnelTag);
            createdTunnelTag = response.body;
            expect(response.body).toEqual(expect.any(Object));
            expect(response.status).toBe(201);
            compareAllExceptId(actualTunnelTag, createdTunnelTag);
        });
    });

    describe("GET /", () => {
        it("should return a list of tunneltags", async () => {
            const response = await request(app).get("/tunneltag");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe("GET /:id", () => {
        it('should respond with status code 404 if resource is not found', async () => {
            const tunnelTagId = 1;
            const response = await request(app).get(`/tunneltag/${tunnelTagId}`);
            expect(response.status).toEqual(404);
        });
    });

    function compareAllExceptId(expectedTunnelTag, actualTunnelTag) {
        expect(actualTunnelTag).toEqual(expect.any(Object));
        expect(actualTunnelTag.id_tunnel).toEqual(expectedTunnelTag.id_tunnel);
        expect(actualTunnelTag.id_tag).toEqual(expectedTunnelTag.id_tag);
        expect(actualTunnelTag.ordre).toEqual(expectedTunnelTag.ordre);
        expect(actualTunnelTag).toEqual(expect.objectContaining(expectedTunnelTag));
    }
});
