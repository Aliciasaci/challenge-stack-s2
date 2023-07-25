const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.TEST_DATABASE_URL, {
  dialect: "postgres",
});

module.exports = sequelize;
