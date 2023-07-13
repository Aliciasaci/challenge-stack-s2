module.exports = function (Controller, options = {}) {
    const { Router } = require("express");
    const router = Router();
  
    router.get("/", Controller.getAll);
    router.post("/", Controller.create);
    router.patch("/:id", Controller.update);
  
    return router;
  };
  