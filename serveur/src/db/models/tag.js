module.exports = function (connection) {
  const { DataTypes, Model, Sequelize } = require("sequelize");
  const User = require("./user");

  const Tag = connection.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      commentaire: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      connection,
      tableName: "tags",
    }
  );
  return Tag;
};
