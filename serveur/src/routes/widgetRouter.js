module.exports = function (Controller, options = {}) {
    const { Router } = require("express");
    const router = Router();
  
  
    router.get("/", Controller.getAllWidgets);
    router.get("/:id", Controller.getWidgetById);
  
    
    router.post("/", Controller.createWidget);
    router.patch("/:id", Controller.updateWidgetById);
    router.delete("/:id", Controller.deleteWidgetById);
    router.get("/:id/widgets/", Controller.getWidgetsByAppId);  
  
    return router;
  };
  