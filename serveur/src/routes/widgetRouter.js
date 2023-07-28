module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", checkAuth, Controller.getAllWidgets);
  router.get("/:id", Controller.getWidgetById);

  router.post("/", checkAuth, Controller.createWidget);
  router.patch("/:id", Controller.updateWidgetById);
  router.delete("/:id", Controller.deleteWidgetById);
  router.get("/:id/widgets/", Controller.getWidgetsByAppId);

  return router;
};
