process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");
const testConfig = require("../../../config/mongotest.config.js");
const mongoose = require("mongoose");
const { describe } = require("node:test");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Widgets Router", () => {
  let server;
  let testEvent;
  let createdEvent;
  beforeAll(async () => {
    server = app.listen(0); // Listen on a random port
    const address = server.address();
    const response = await request(app)
      .post("/widgets")
      .send({
        type: "click",
        appId: "testint",

        data: {
          name: "testName",
          visitorId: "InitialtestVisitorId",
        },
      });
    testEvent = response.body;
  });

  afterAll(async () => {
    await request(app).delete(`/widgets/${testEvent._id}`);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of widgets", async () => {
      const response = await request(app).get("/widgets");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toEqual(1);
    });
  });

  describe("GET /:id", () => {
    it("should return a widgets", async () => {
      const response = await request(app).get(`/widgets/${testEvent._id}`);
      expect(response.status).toBe(200);
      compareAllExceptId(testEvent, response.body);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /", () => {
    it("should create a widget", async () => {
      let actualEvent = {
        type: "created",
        appId: "testinta",
        data: {
          name: "testy",
          visitorId: "testVisitorIdCreated",
        },
      };
      const response = await request(app).post("/widgets").send(actualEvent);
      createdEvent = response.body;
      compareAllExceptId(actualEvent, createdEvent);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("PATCH /:id", () => {
    it("should update a widget", async () => {
      const response = await request(app)
        .patch(`/widgets/${testEvent._id}`)
        .send({
          data: {
            type: "changedType",
          },
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("GET /:id/widgets", () => {
    it("should return widgets by appId", async () => {
      const response = await request(app).get(
        `/widgets/${testEvent.appId}/widgets`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });


  describe("DELETE /:id", () => {
    it("should delete a widget", async () => {
      const response = await request(app).delete(`/widgets/${createdEvent._id}`);
      expect(response.status).toBe(200);
    });
  });

  function compareAllExceptId(widget1, widget2) {
    expect(widget1.type).toEqual(widget2.type);
    expect(widget1.appId).toEqual(widget2.appId);
    expect(widget1.data).toEqual(widget2.data);
  }
});
