const Event = require("../db/models/event");

module.exports = function () {
  return {
    /**
     * @param {*} eventData
     * @returns
     */
    async createEvent(eventData) {
      try {
        const event = new Event(eventData);
        return await event.save();
      } catch (error) {
        throw new Error("Error while creating the event");
      }
    },

    /**
     * @returns
     */
    async getAllEvents() {
      try {
        return await Event.find();
      } catch (error) {
        throw new Error("Error while retrieving all events");
      }
    },

    /**
     * @param {*} eventId
     * @returns
     */
    async getEventById(eventId) {
      try {
        const event = await Event.findOne({ _id: eventId });
        if (!event) {
          throw new Error("Event not found");
        }
        return event;
      } catch (error) {
        throw new Error("Error while retrieving the event");
      }
    },

    /**
     * @param {*} eventId
     * @param {*} eventData
     * @returns
     */
    async updateEventById(eventId, eventData) {
      try {
        return await Event.findOneAndUpdate({ _id: eventId }, eventData, {
          new: true,
        });
      } catch (error) {
        throw new Error("Error while updating the event");
      }
    },

    /**
     * @param {*} eventId
     * @returns
     */
    async deleteEventById(eventId) {
      try {
        return await Event.findOneAndDelete({ _id: eventId });
      } catch (error) {
        throw new Error("Error while deleting the event");
      }
    },

    async getEventsByAppId(appId) {
      try {
        const events = await Event.find({ appId: appId });
        return events;
      } catch (error) {
        console.error("Error in service:", error);
        throw error;
      }
    },

    async getEventsByVisitorId(visitorId) {
      try {
        const events = await Event.find({ "data.visitor_id": visitorId });
        return events;
      } catch (error) {
        console.error("Error in service:", error);
        throw error;
      }
    },

    async addTimeSpentOnPage(data) {
      try {
        const event = await Event.findOne({
          "data.visitor_id": { $eq: data.data.visitor_id },
          "data.page": { $eq: data.data.page },
        });
        console.log(event);
        if (event) {
          if (event.updatedAt < Date.now() - 1800000) {
            event.data.session += data.data.session;
          }
          event.data.timeSpent += data.data.timeSpent;
          event.updatedAt = Date.now();
          return await event.save();
        } else {
          data.data.session = 1;
          const newEvent = new Event({
            type: data.type,
            appId: data.appId,
            data: data.data,
          });
          return await newEvent.save();
        }
      } catch (error) {
        console.error("Error in service:", error);
        throw error;
      }
    },
  };
};
