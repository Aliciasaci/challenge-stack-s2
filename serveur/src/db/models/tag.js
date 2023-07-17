module.exports = function (connection) {
  const { DataTypes, Model, Sequelize } = require("sequelize");

  const Tag = connection.define('Tag',  {
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
      },
    },
    {
      connection,
      tableName:'tags'
    }

  );
  return Tag;
};
