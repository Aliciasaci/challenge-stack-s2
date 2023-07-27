module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");



  router.get("/", checkAuth, Controller.getAllEvents);
  router.get("/count/", checkAuth,Controller.getCount);
  router.get("/:id", checkAuth, Controller.getEventById);

  
  router.post("/", checkAuth, Controller.createEvent);
  router.patch("/:id", checkAuth, Controller.updateEventById);
  router.delete("/:id", checkAuth, Controller.deleteEventById);
  router.get("/:id/events/", checkAuth, Controller.getEventsByAppId);
  router.get("/visitor/:id", checkAuth, Controller.getEventsByVisitorId);
  router.patch("/visitor/:id", checkAuth, Controller.addTimeSpentOnPage);

  return router;
};
