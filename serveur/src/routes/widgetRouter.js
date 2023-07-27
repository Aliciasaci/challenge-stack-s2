module.exports = function (Controller, options = {}) {
    const { Router } = require("express");
    const router = Router();
    const checkAuth = require("../middlewares/checkAuth");

  
    router.get("/", checkAuth, Controller.getAllWidgets);
    router.get("/:id", checkAuth, Controller.getWidgetById);
  
    
    router.post("/", checkAuth, Controller.createWidget);
    router.patch("/:id", checkAuth, Controller.updateWidgetById);
    router.delete("/:id", checkAuth, Controller.deleteWidgetById);
    router.get("/:id/widgets/", checkAuth, Controller.getWidgetsByAppId);  
  
    return router;
  };
  