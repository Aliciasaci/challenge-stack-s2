const Tag = require('../models/tag');
module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");

    const Tunnel = connection.define('Tunnel',  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commentaire:{
          type: DataTypes.STRING,
          allowNull: true
        },
        id_user: {
            type: DataTypes.INTEGER,
        }
      },
      {
        connection,
        tableName:"tunnel"
      }
  
    );

    return Tag;
};
