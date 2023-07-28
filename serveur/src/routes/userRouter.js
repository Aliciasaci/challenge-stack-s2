module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", Controller.getAll);
  router.post("/", Controller.create);

  router.get("/:id", Controller.getOne);
  router.put("/:id", Controller.replace);
  router.patch("/:id", Controller.update);
  router.delete("/:id", Controller.delete);
  router.post("/:id/appid/", Controller.generateAppId);
  router.get("/:id/tags/", Controller.getUserTags);


  return router;
};
