module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const router = Router();
  const checkAuth = require("../middlewares/checkAuth");

  router.get("/", checkAuth, Controller.getAll);
  router.post("/", Controller.create);
  router.patch("/:id", Controller.update);
  router.delete("/:id", checkAuth, Controller.delete);

  return router;
};
