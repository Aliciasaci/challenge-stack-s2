module.exports = function (Controller, options = {}) {
    const { Router } = require("express");
    const router = Router();
  
    router.get("/", Controller.getAllEvents);
    router.get("/:id", Controller.getEventById);
    router.post("/", Controller.createEvent);
    router.patch("/:id", Controller.updateEventById);
    router.delete("/:id", Controller.deleteEventById);
    router.get("/:id/events/", Controller.getEventsByAppId);

    return router;
  };
  