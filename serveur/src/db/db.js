//*POSTGRE SQL
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

console.log(process.env.DATABASE_URL);
const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

connection
  .authenticate()
  .then(() => {
    console.log("=> Connexion à POSTGRES réussie.");
  })
  .catch((error) => {
    console.error("Connexion à POSTGRES échouée:", error);
  });
  console.log(process.env.NODE_ENV);
  //*MongoDB
  const mongoose = require("mongoose");
  console.log(process.env.MONGO_URL)
  mongoose
    .connect(process.env.MONGO_URL, {
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
