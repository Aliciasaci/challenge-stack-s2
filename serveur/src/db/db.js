
const {Sequelize, DataTypes} = require('sequelize')

const connection = new Sequelize(`postgres://postgres:root@localhost:5432/postgres`, {dialect: "postgres"})

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = connection;

