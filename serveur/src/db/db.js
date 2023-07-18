//*POSTGRE SQL
const { Sequelize, DataTypes } = require('sequelize')
const connection = new Sequelize(`postgres://postgres:root@localhost:5432/postgres`, { dialect: "postgres" })

connection
  .authenticate()
  .then(() => {
    console.log("=> Connexion à POSTGRE réussie.");
  })
  .catch((error) => {
    console.error("Connexion à  POSTGRE échouée:", error);
  });


//*MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mongodatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('=> Connexion à MongoDB réussie');
})
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });

module.exports = connection;



