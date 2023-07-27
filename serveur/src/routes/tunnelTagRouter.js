module.exports = function (Controller, options = {}) {
    const { Router } = require("express");
    const router = Router();
    const checkAuth = require("../middlewares/checkAuth");
  
    router.get("/",  Controller.getAll);
    router.post("/",  Controller.create);
    router.patch("/:id", Controller.update);
    router.delete("/:id",  Controller.delete);
    
    return router;
};