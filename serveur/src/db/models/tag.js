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
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Reference the 'User' model
          key: "id",
        },
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
