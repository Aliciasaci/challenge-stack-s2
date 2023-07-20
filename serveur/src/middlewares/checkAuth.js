const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authValue = req.headers.authorization;
  if (!authValue) return res.sendStatus(401);
  //Bearer fkzejrlgnvbrvlekzdsj,flzefk
  
  const [type, token] = authValue.split(" ");
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};