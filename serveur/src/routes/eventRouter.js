module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();



  router.get("/", Controller.getAllEvents);
  router.get("/count/", Controller.getCount);
  router.get("/:id", Controller.getEventById);

  
  router.post("/", Controller.createEvent);
  router.patch("/:id", Controller.updateEventById);
  router.delete("/:id", Controller.deleteEventById);
  router.get("/:id/events/", Controller.getEventsByAppId);
  router.get("/visitor/:id", Controller.getEventsByVisitorId);
  // route to update event timeSpent by visitorId and by page
  router.patch("/visitor/:id", Controller.addTimeSpentOnPage);


  return router;
};
