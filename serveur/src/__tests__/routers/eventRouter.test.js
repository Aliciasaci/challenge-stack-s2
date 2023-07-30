process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");
const testConfig = require("../../../config/mongotest.config");
const mongoose = require("mongoose");
const { describe } = require("node:test");

jest.mock("../../middlewares/checkAuth.js", () => {
  return jest.fn((req, res, next) => {
    next();
  });
});

describe("Event Router", () => {
  let server;
  let testEvent;
  let createdEvent;
  beforeAll(async () => {
    server = app.listen(0); // Listen on a random port
    const address = server.address();
    console.log(`Events test app listening on port ${address.port}!`);
    await mongoose.connect(testConfig.url, testConfig.options);
    console.log("=> Connexion à MongoDB réussie");
    const response = await request(app)
      .post("/events")
      .send({
        type: "test",
        appId: "testint",

        data: {
          name: "testName",
          visitorId: "InitialtestVisitorId",
        },
      });
    testEvent = response.body;
  });

  afterAll(async () => {
    await request(app).delete(`/events/${testEvent._id}`);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  describe("GET /", () => {
    it("should return a list of events", async () => {
      const response = await request(app).get("/events");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toEqual(1);
    });
  });

  describe("GET /:id", () => {
    it("should return a event", async () => {
      const response = await request(app).get(`/events/${testEvent._id}`);
      expect(response.status).toBe(200);
      compareAllExceptId(testEvent, response.body);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /", () => {
    it("should create a event", async () => {
      let actualEvent = {
        type: "created",
        appId: "testinta",
        data: {
          name: "testy",
          visitorId: "testVisitorIdCreated",
        },
      };
      const response = await request(app).post("/events").send(actualEvent);
      createdEvent = response.body;
      compareAllExceptId(actualEvent, createdEvent);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("PATCH /:id", () => {
    it("should update a event", async () => {
      const response = await request(app)
        .patch(`/events/${testEvent._id}`)
        .send({
          data: {
            type: "changedType",
          },
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("GET /:id/events", () => {
    it("should return events by appId", async () => {
      const response = await request(app).get(
        `/events/${testEvent.appId}/events`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /visior/:id", () => {
    it("should return events by visitorId", async () => {
      const response = await request(app).get(
        `/events/visitor/${testEvent.visitorId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("PATCH /visitor/:id", () => {
    it("should update timeSpentOnPage", async () => {
      const response = await request(app)
        .patch(`/events/visitor/${testEvent.visitorId}`)
        .send({
          type: "visited",
          appId: "testint",
          data: {
            name: "test",
            timeSpent: 1000,
            visitorId: "testVisitorId",
          },
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a event", async () => {
      const response = await request(app).delete(`/events/${createdEvent._id}`);
      expect(response.status).toBe(200);
    });
  });

  function compareAllExceptId(event1, event2) {
    expect(event1.type).toEqual(event2.type);
    expect(event1.appId).toEqual(event2.appId);
    expect(event1.data).toEqual(event2.data);
  }
});
