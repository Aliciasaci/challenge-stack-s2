const UnauthorizedError = require("../errors/UnauthorizedError");
const ValidationError = require("../errors/ValidationError");

module.exports = function (error, req, res, next) {
  console.error(error);
  if (error instanceof ValidationError) {
    res.status(422).json(error.errors);
  } else if (error instanceof UnauthorizedError) {
    res.sendStatus(401);
  } else {
    res.sendStatus(500);
  }
};