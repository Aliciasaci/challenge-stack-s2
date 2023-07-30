module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", Controller.getAll);
  router.post("/", Controller.create);

  router.get("/:id", checkAuth, Controller.getOne);
  router.put("/:id", Controller.replace);
  router.patch("/:id", checkAuth, Controller.update);
  router.delete("/:id", checkAuth, Controller.delete);
  router.post("/:id/appid/", checkAuth, Controller.generateAppId);
  router.get("/:id/tags/", checkAuth, Controller.getUserTags);
  router.get("/:id/tunnels/", checkAuth, Controller.getUserTunnels);

  return router;
};
