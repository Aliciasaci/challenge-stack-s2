const connection = require("./db");
const fs = require("fs");
const path = require("path");

const Tag = require("./models/tag");
const Tunnel = require("./models/tunnel");
const User = require("./models/user");

const db = { connection };

const files = fs.readdirSync(path.join(__dirname, "models"));
files.forEach((file) => {
  // ignore index.js
  if (file === "index.js") return;
  const model = require(path.join(__dirname, "models", file))(connection);
  db[model.name] = model;
});

const tag = Tag(connection);
const tunnel = Tunnel(connection);
const user = User(connection);

//relations tag et tunnel
tag.belongsToMany(tunnel, { through: "tunnel_tag" });
tunnel.belongsToMany(tag, { through: "tunnel_tag" });

//relations tag et user
user.hasMany(tag, { foreignKey: "id_user" });


module.exports = db;
