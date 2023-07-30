//*POSTGRE SQL
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  process.env && process.env.DB_URL_POSTGRES,
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
