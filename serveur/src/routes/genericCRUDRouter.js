module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const userAuth = require('../middlewares/userAuth')
  const router = Router();

  router.get("/", Controller.getAll);
  router.post("/", Controller.create);

  router.get("/:id", Controller.getOne);
  router.put("/:id", Controller.replace);
  router.patch("/:id", Controller.update);
  router.delete("/:id", Controller.delete);

  //passing the middleware function to the signup
  router.post('/signup', userAuth.saveUser, Controller.signup)
  //login route
  router.post('/login', Controller.login)

  return router;
};
