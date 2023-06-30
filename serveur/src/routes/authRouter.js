module.exports = function (Controller, options = {}) {
  const { Router } = require("express");
  const userAuth = require('../middlewares/userAuth')
  const router = Router();

  router.post('/signup', userAuth.saveUser, Controller.signup)
  router.post('/login', Controller.login)

  return router;
};
