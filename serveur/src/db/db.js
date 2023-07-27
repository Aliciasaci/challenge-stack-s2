//*POSTGRE SQL
const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();


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

// if (process.env.NODE_ENV !== "Servicetest") {
//   //*MongoDB
//   const mongoose = require("mongoose");

//   mongoose
//     .connect("mongodb://0.0.0.0:27017/mongodatabase", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("=> Connexion à MongoDB réussie");
//     })
//     .catch((error) => {
//       console.error("Erreur de connexion à MongoDB :", error);
//     });
// }

module.exports = connection;
