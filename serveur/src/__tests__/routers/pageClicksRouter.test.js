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
      .post("/pageClicks/")
      .send({
        type: "click",
        appId: "testint",
        page: "page1",
        data: {
          name: "testName",
          visitorId: "InitialtestVisitorId",
        },
      });
    testEvent = response.body;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of pageClicks", async () => {
      const response = await request(app).get("/pageClicks");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toEqual(1);
    });
  });

  describe("GET /:id", () => {
    it("should return a pageClick", async () => {
      const response = await request(app).get(`/pageClicks/${testEvent._id}`);
      expect(response.status).toBe(200);
      compareAllExceptId(testEvent, response.body);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /", () => {
    it("should create a pageClick", async () => {
      let actualEvent = {
        type: "created",
        appId: "testinta",
        page: "page1",
        data: {
          name: "testy",
          visitorId: "testVisitorIdCreated",
        },
      };
      const response = await request(app).post("/pageClicks").send(actualEvent);
      createdEvent = response.body;
      compareAllExceptId(actualEvent, createdEvent);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("GET /visitor/:id", () => {
    it("should return pageClick by visitorId", async () => {
      const response = await request(app).get(
        `/pageClicks/visitor/${testEvent.visitorId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  function compareAllExceptId(widget1, widget2) {
    expect(widget1.type).toEqual(widget2.type);
    expect(widget1.appId).toEqual(widget2.appId);
    expect(widget1.data).toEqual(widget2.data);
  }
});
