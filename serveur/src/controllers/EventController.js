module.exports = function (eventService, options = {}) {
  return {
    async createEvent(req, res) {
      try {
        const eventData = req.body;
        const event = await eventService.createEvent(eventData);
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ error: "Error while creating the event" });
      }
    },

    async getAllEvents(req, res) {
      // Renamed the function to getAllEvents
      const options = {
        dateDebut: req.query.dateDebut ?? null,
        dateFin: req.query.dateFin ?? null,
        type: req.query.type ?? null,
        orderDesc: req.query.orderDesc ?? null,
        appId: req.query.appId ?? null,
        page_size: req.query.page_size ?? 10,  
        page_number: req.query.page_number ?? 1,
      }

      try {
        const events = await eventService.getAllEvents(options);
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: "an error has occured" });
      }
    },


    async getCount(req, res) {

      const options = {
        dateDebut: req.query.dateDebut ?? null,
        dateFin: req.query.dateFin ?? null,
        type: req.query.type ?? null,
        periode: req.query.periode ?? null,
        orderDesc: req.query.orderDesc ?? null,
        appId: req.query.appId ?? null,
        tag: req.query.tag ?? null,
        page: req.query.page ?? null,  //ce page fait référence au page dans site client
      }


      try {
        const events = await eventService.getCount(options);
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: "Error" });
      }
    },


    async getEventById(req, res) {
      try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        if (event) {
          res.status(200).json(event);
        } else {
          res.status(404).json({ error: "Event not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "[Controller] Error while retrieving the event" });
      }
    },

    async updateEventById(req, res) {
      try {
        const eventId = req.params.id;
        const eventData = req.body;
        const updatedEvent = await eventService.updateEventById(
          eventId,
          eventData
        );
        if (updatedEvent) {
          res.status(200).json(updatedEvent);
        } else {
          res.status(404).json({ error: "Event not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Error while updating the event" });
      }
    },

    async deleteEventById(req, res) {
      try {
        const eventId = req.params.id;
        const deletedEvent = await eventService.deleteEventById(eventId);
        if (deletedEvent) {
          res.status(200).json(deletedEvent);
        } else {
          res.status(404).json({ error: "Event not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Error while deleting the event" });
      }
    },

    async getEventsByAppId(req, res) {
      const appid = req.params.id;
      try {
        const events = await eventService.getEventsByAppId(appid);
        res.json(events);
      } catch (error) {
        console.error("Error in controller:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching events." });
      }
    },

    async getEventsByVisitorId(req, res) {
      const visitorId = req.params.id;
      try {
        const events = await eventService.getEventsByVisitorId(visitorId);
        res.json(events);
      } catch (error) {
        console.error("Error in controller:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching events." });
      }
    },

    async addTimeSpentOnPage(req, res) {
      const data = req.body;
      try {
        const event = await eventService.addTimeSpentOnPage(data);
        res.json(event);
      } catch (error) {
        console.error("Error in controller:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching events." });
      }
    },
  };
};
