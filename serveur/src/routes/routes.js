module.exports = app => {

  const express = require('express');
  const router = express.Router();
  app.use('/', router);

  //require les entités
  const user = require('../controllers/UserController');
  const auth = require('../controllers/AuthController');


  //vérifier l'unicité de l'utilisateur
  router.get('/users/exists', user.checkExistingUserByEmail);
  //get all users 
  router.get('/users', user.getUsers);
  //add a user
  router.post('/users', user.addUser);
  //update a user
  router.post('/users/:id', user.updateUser);
  //get user by id
  router.get('/users/:id', user.getUserById);
  //delete user
  router.post('/users/:id', user.deleteUserById);

  //Login
  router.post('/auth/login', auth.login);
  router.post('/auth/signin', auth.signin);
}