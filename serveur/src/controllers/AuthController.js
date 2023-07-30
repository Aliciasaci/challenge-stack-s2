const ValidationError = require("../errors/ValidationError");

module.exports = function AuthController(UserService) {
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  require("dotenv").config();

  return {
    login: async (req, res, next) => {
      const [user] = await UserService.findAll({
        email: req.body.email,
      });

      if (!user) {
        return next(
          new ValidationError({ erreur: ["Email ou mot de passe incorrect."] })
        );
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return next(
          new ValidationError({ erreur: ["Email ou mot de passe incorrect."] })
        );
      }
      //return token and user

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({ message: "Hello World!" }),
      };

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");

      res.json({
        token: jwt.sign({ id: user.id, email: user.email }, "d9ff903b"),
        user: user,
      });
    },
  };
};
