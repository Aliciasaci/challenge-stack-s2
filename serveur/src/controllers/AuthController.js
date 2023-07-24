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
          new ValidationError({ erreur: ["Email ou mot de passe incorrecte."] })
        );
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return next(
          new ValidationError({ erreur: ["Email ou mot de passe incorrecte."] })
        );
      }
      //return token and user
      res.json({
        token: jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET
        ),
        user: user,
      });
    },
  };
};
