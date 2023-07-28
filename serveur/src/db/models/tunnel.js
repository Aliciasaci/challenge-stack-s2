module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");
  const User = require("../models/user");

  const Tunnel = connection.define("Tunnel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    commentaire: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference the 'User' model
        key: "id",
      },
    }
  },
  {
    connection,
    tableName: "tunnels"
  });
    return Tunnel;
};
