//*POSTGRE SQL
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  "postgres://challenge:root@79.137.86.197:5432/postgres_test",
  {
    dialect: "postgres",
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("=> Connexion à POSTGRES réussie.");
  })
  .catch((error) => {
    console.error("Connexion à POSTGRES échouée:", error);
  });
<<<<<<< HEAD
//*MongoDB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://79.137.86.197:27017/mongodatabase_test?directConnection=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("=> Connexion à MongoDB réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });

module.exports = connection;
=======
if (process.env.NODE_ENV !== "test") {
  //*MongoDB
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://79.137.86.197:27017/mongodatabase_test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("=> Connexion à MongoDB réussie");
    })
    .catch((error) => {
      console.error("Erreur de connexion à MongoDB :", error);
    });
}
module.exports = connection;
>>>>>>> 3a7d70919f7c995d719ebecd8319c289d4671cba
