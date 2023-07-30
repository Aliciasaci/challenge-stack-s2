module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", checkAuth, Controller.getAllPageClicks);
  router.post("/", Controller.createPageClicks);
  router.get("/:id", Controller.getPageClicksById);
  router.get("/visitor/:id", Controller.getPageClicksByVisitorId);

  return router;
};
