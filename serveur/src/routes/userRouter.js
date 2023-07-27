module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", Controller.getAll);
  router.post("/", checkAuth, Controller.create);

  router.get("/:id", checkAuth, Controller.getOne);
  router.put("/:id", checkAuth, Controller.replace);
  router.patch("/:id", checkAuth, Controller.update);
  router.delete("/:id", checkAuth, Controller.delete);
  router.post("/:id/appid/", Controller.generateAppId);
  router.get("/:id/tags/", checkAuth, Controller.getUserTags);


  return router;
};
