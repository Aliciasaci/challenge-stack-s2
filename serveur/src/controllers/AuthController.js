const ValidationError = require("../errors/ValidationError");

module.exports = function AuthController(UserService) {
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  return {
    login: async (req, res, next) => {
      const [user] = await UserService.findAll({
        email: req.body.email,
      });

      if (!user) {
        return next(new ValidationError({ erreur: ["Email ou mot de passe incorrecte."] }));
      }

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ValidationError({ erreur: ["Email ou mot de passe incorrecte."]}));
      }

      //create token
      res.json({
        token: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET),
      });
    },
  };
};
