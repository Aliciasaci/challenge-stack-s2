module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", checkAuth, Controller.getAllEvents);
  router.get("/count/", checkAuth, Controller.getCount);
  router.get("/:id", Controller.getEventById);

  router.post("/", Controller.createEvent);
  router.patch("/:id", Controller.updateEventById);
  router.delete("/:id", Controller.deleteEventById);
  router.get("/:id/events/", Controller.getEventsByAppId);
  router.get("/visitor/:id", Controller.getEventsByVisitorId);
  router.patch("/visitor/:id", Controller.addTimeSpentOnPage);

  return router;
};
