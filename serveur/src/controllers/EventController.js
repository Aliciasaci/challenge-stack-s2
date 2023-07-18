module.exports = function (eventService, options = {}) {
  return {
    
    async createEvent(req, res) {
      try {
        const eventData = req.body;
        console.log(eventData);

        const event = await eventService.createEvent(eventData);
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ error: 'Error while creating the event' });
      }
    },

    async getAllEvents(req, res) { // Renamed the function to getAllEvents
      try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: 'Error while retrieving all events' });
      }
    },

    async getEventById(req, res) {
      try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        if (event) {
          res.status(200).json(event);
        } else {
          res.status(404).json({ error: 'Event not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error while retrieving the event' });
      }
    },

    async updateEventById(req, res) {
      try {
        const eventId = req.params.id;
        const eventData = req.body;
        const updatedEvent = await eventService.updateEventById(eventId, eventData);
        if (updatedEvent) {
          res.status(200).json(updatedEvent);
        } else {
          res.status(404).json({ error: 'Event not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error while updating the event' });
      }
    },

    async deleteEventById(req, res) {
      try {
        const eventId = req.params.id;
        const deletedEvent = await eventService.deleteEventById(eventId);
        if (deletedEvent) {
          res.status(200).json(deletedEvent);
        } else {
          res.status(404).json({ error: 'Event not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error while deleting the event' });
      }
    },
  };
};
