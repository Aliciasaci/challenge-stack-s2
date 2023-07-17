const { Router } = require("express");

module.exports = function AuthRouter(AuthController, UserController) {
  const router = new Router();
  router.post("/login", AuthController.login);
  router.post("/register", UserController.create);
  return router;
};
