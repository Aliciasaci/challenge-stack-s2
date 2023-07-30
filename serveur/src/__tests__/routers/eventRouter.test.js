process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server.js");
<<<<<<< HEAD
=======
const testConfig = require("../../../config/mongotest.config");
const mongoose = require("mongoose");
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
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
<<<<<<< HEAD
    jest.setTimeout(60000);
    server = app.listen(0)
    const address = server.address();
    console.log(`Auth App listening on port ${address.port}!`);

=======
    server = app.listen(0); // Listen on a random port
    const address = server.address();
    console.log(`Events test app listening on port ${address.port}!`);
    await mongoose.connect(testConfig.url, testConfig.options);
    console.log("=> Connexion à MongoDB réussie");
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
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
<<<<<<< HEAD
    jest.setTimeout(60000);
    await request(app).delete(`/events/${testEvent._id}`);
=======
    await request(app).delete(`/events/${testEvent._id}`);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    await server.close();
  });

  describe("GET /", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    it("should return a list of events", async () => {
      const response = await request(app).get("/events");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
<<<<<<< HEAD
=======
      expect(response.body.length).toEqual(1);
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    });
  });

  describe("GET /:id", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
    it("should return a event", async () => {
      const response = await request(app).get(`/events/${testEvent._id}`);
      expect(response.status).toBe(200);
=======
    it("should return a event", async () => {
      const response = await request(app).get(`/events/${testEvent._id}`);
      expect(response.status).toBe(200);
      compareAllExceptId(testEvent, response.body);
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("POST /", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
    it("should create a event", async () => {
      const response = await request(app)
        .post("/events")
        .send({
          type: "created",
          appId: "testinta",
          data: {
            name: "testy",
            visitorId: "testVisitorIdCreated",
          },
        });
      createdEvent = response.body;
=======
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
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
      expect(response.body).toEqual(expect.any(Object));
    });
  });

  describe("PATCH /:id", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
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
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    it("should return events by appId", async () => {
      const response = await request(app).get(
        `/events/${testEvent.appId}/events`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("GET /visior/:id", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    it("should return events by visitorId", async () => {
      const response = await request(app).get(
        `/events/visitor/${testEvent.visitorId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe("PATCH /visitor/:id", () => {
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
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
<<<<<<< HEAD
    jest.setTimeout(60000);
=======
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
    it("should delete a event", async () => {
      const response = await request(app).delete(`/events/${createdEvent._id}`);
      expect(response.status).toBe(200);
    });
  });
<<<<<<< HEAD
=======

  function compareAllExceptId(event1, event2) {
    expect(event1.type).toEqual(event2.type);
    expect(event1.appId).toEqual(event2.appId);
    expect(event1.data).toEqual(event2.data);
  }
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
});
