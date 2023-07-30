process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Tag Router", () => {
  let server;
  let testTag;
  let createdTag;
  let testUser;

  beforeAll(async () => {
    server = app.listen(3002, () => {
      console.log("Tag App listening on port 3002!");
    });
    const userResponse = await request(app).post("/users").send({
      firstname: "testsTing",
      lastname: "test",
      email: "test@testing.com",
      password: "12345",
    });
    testUser = userResponse.body;
    const response = await request(app).post("/tags").send({
      id_user: testUser.id,
      commentaire: "TagTest",
      description: "TagDescription",
    });
    testTag = response.body;
  });

  afterAll(async () => {
    await request(app).delete(`/tags/${testTag.id}`);
    await request(app).delete(`/users/${testUser.id}`);
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of tags", async () => {
      const response = await request(app).get("/tags");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body).toContainEqual(expect.objectContaining(testTag));
    });
  });

  describe("POST /", () => {
    it("should create a tag", async () => {
      let actualTag = {
        id_user: testUser.id,
        commentaire: "testTag",
        description: "DescriptionTag",
      };
      const response = await request(app).post("/tags").send(actualTag);
      createdTag = response.body;
      expect(response.body).toEqual(expect.any(Object));
      expect(response.status).toBe(201);
      compareAllExceptId(actualTag, response.body);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a tag", async () => {
      const response = await request(app).delete(`/tags/${createdTag.id}`);
      expect(response.status).toBe(204);
    });
  });

  function compareAllExceptId(expectedTag, actualTag) {
    expect(actualTag).toEqual(expect.any(Object));
    expect(actualTag.commentaire).toEqual(expectedTag.commentaire);
    expect(actualTag.id_user).toEqual(expectedTag.id_user);
    expect(actualTag.description).toEqual(expectedTag.description);
    expect(actualTag).toEqual(expect.objectContaining(expectedTag));
  }
});
