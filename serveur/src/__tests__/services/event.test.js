process.env.NODE_ENV = "Servicetest";
import { url, options } from "../../../config/mongotest.config";
import { connect, connection } from "mongoose";
import EventService from "../../services/event";

describe("EventService", () => {
  let eventService;

  beforeAll(async () => {
    await connect(url, options);
    eventService = EventService();
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  describe("createEvent", () => {
    it("should create a new event", async () => {
      const eventData = {
        type: "click",
        appId: "123",
        data: {
          visitor_id: "456",
          page: "home",
          timeSpent: 1000,
        },
      };
      const event = await eventService.createEvent(eventData);
      expect(event).toBeDefined();
      expect(event.type).toBe("click");
      expect(event.appId).toBe("123");
      expect(event.data.visitor_id).toBe("456");
      expect(event.data.page).toBe("home");
      expect(event.data.timeSpent).toBe(1000);
    });

    it("should throw an error if there is an error creating the event", async () => {
      const eventData = {
        type: "click",
        appId: "123",
        data: {
          visitor_id: "456",
          page: "home",
          timeSpent: 1000,
        },
      };
      jest.spyOn(eventService, "createEvent").mockImplementation(() => {
        throw new Error("Error while creating the event");
      });
      try {
        await eventService.createEvent(eventData);
      } catch (error) {
        expect(error.message).toEqual("Error while creating the event");
      }
    });
  });

  describe("getAllEvents", () => {
    it("should retrieve all events", async () => {
      const events = await eventService.getAllEvents();
      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(0);
    });

    it("should throw an error if there is an error retrieving all events", async () => {
      jest.spyOn(eventService, "getAllEvents").mockImplementation(() => {
        throw new Error("Error while retrieving all events");
      });
      try {
        await eventService.getAllEvents();
      } catch (error) {
        expect(error.message).toEqual("Error while retrieving all events");
      }
    });
  });

  describe("getEventById", () => {
    it("should retrieve an event by ID", async () => {
      const events = await eventService.getAllEvents();
      const eventId = events[0]._id;
      const event = await eventService.getEventById(eventId);
      expect(event).toBeDefined();
      expect(event._id).toEqual(eventId);
    });

    it("should throw an error if there is an error retrieving the event", async () => {
      jest.spyOn(eventService, "getEventById").mockImplementation(() => {
        throw new Error("Error while retrieving the event");
      });
      try {
        await eventService.getEventById("non-existent-id");
      } catch (error) {
        expect(error.message).toEqual("Error while retrieving the event");
      }
    });
  });

  describe("updateEventById", () => {
    it("should update an event by ID", async () => {
      const events = await eventService.getAllEvents();
      const eventId = events[0]._id;
      const eventData = {
        type: "click",
        appId: "123",
        data: {
          visitor_id: "456",
          page: "home",
          timeSpent: 2000,
        },
      };
      const updatedEvent = await eventService.updateEventById(
        eventId,
        eventData
      );
      expect(updatedEvent).toBeDefined();
      expect(updatedEvent._id).toEqual(eventId);
      expect(updatedEvent.data.timeSpent).toBe(2000);
    });

    it("should throw an error if there is an error updating the event", async () => {
      jest.spyOn(eventService, "updateEventById").mockImplementation(() => {
        throw new Error("Error while updating the event");
      });
      try {
        await eventService.updateEventById("id", {});
      } catch (error) {
        expect(error.message).toEqual("Error while updating the event");
      }
    });
  });

  describe("getEventsByAppId", () => {
    it("should retrieve events by app ID", async () => {
      const events = await eventService.getEventsByAppId("123");
      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(0);
    });

    it("should throw an error if there is an error retrieving events by app ID", async () => {
      jest.spyOn(eventService, "getEventsByAppId").mockImplementation(() => {
        throw new Error("Error while retrieving events by app ID");
      });
      try {
        await eventService.getEventsByAppId("123");
      } catch (error) {
        expect(error.message).toEqual(
          "Error while retrieving events by app ID"
        );
      }
    });
  });

  describe("getEventsByVisitorId", () => {
    it("should retrieve events by visitor ID", async () => {
      const events = await eventService.getEventsByVisitorId("456");
      expect(events).toBeDefined();
      expect(events.length).toBeGreaterThan(0);
    });

    it("should throw an error if there is an error retrieving events by visitor ID", async () => {
      jest
        .spyOn(eventService, "getEventsByVisitorId")
        .mockImplementation(() => {
          throw new Error("Error while retrieving events by visitor ID");
        });
      try {
        await eventService.getEventsByVisitorId("123");
      } catch (error) {
        expect(error.message).toEqual(
          "Error while retrieving events by visitor ID"
        );
      }
    });
  });

  describe("deleteEventById", () => {
    it("should delete an event by ID", async () => {
      const events = await eventService.getAllEvents();
      const eventId = events[0]._id;
      const deletedEvent = await eventService.deleteEventById(eventId);
      expect(deletedEvent).toBeDefined();
      expect(deletedEvent._id).toEqual(eventId);
    });

    it("should throw an error if there is an error deleting the event", async () => {
      jest.spyOn(eventService, "deleteEventById").mockImplementation(() => {
        throw new Error("Error while deleting the event");
      });
      try {
        await eventService.deleteEventById("id");
      } catch (error) {
        expect(error.message).toEqual("Error while deleting the event");
      }
    });
  });

  describe("addTimeSpentOnPage", () => {
    it("should add time spent on a page", async () => {
      const eventData = {
        type: "pageview",
        appId: "123",
        data: {
          visitor_id: "456",
          page: "home",
          timeSpent: 1000,
        },
      };
      const event = await eventService.addTimeSpentOnPage(eventData);
      expect(event).toBeDefined();
      expect(event.data.timeSpent).toBe(1000);
    });

    it("should create a new event if the event does not exist", async () => {
      const eventData = {
        type: "pageview",
        appId: "123",
        data: {
          visitor_id: "789",
          page: "about",
          timeSpent: 1000,
        },
      };
      const event = await eventService.addTimeSpentOnPage(eventData);
      expect(event).toBeDefined();
      expect(event.data.timeSpent).toBe(1000);
    });

    it("should throw an error if there is an error adding time spent on a page", async () => {
      jest.spyOn(eventService, "addTimeSpentOnPage").mockImplementation(() => {
        throw new Error("Error while adding time spent on a page");
      });
      try {
        await eventService.addTimeSpentOnPage({ data: { visitor_id: "456" } });
      } catch (error) {
        expect(error.message).toEqual(
          "Error while adding time spent on a page"
        );
      }
    });
  });
});
