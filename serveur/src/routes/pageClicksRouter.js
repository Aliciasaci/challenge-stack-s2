module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();

  router.get("/", Controller.getAllPageClicks);
  router.post("/", Controller.createPageClicks);
  router.get("/count/", Controller.getPageClicksCount);
  router.get("/:id", Controller.getPageClicksById);
  router.get("/visitor/:id", Controller.getPageClicksByVisitorId);

  return router;
};
