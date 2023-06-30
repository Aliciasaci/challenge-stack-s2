module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");

  class Tag extends Model {}

  Tag.init(
    {
      commentaire: DataTypes.STRING,
    },
    {
      tableName: "tags",
      sequelize: connection,
      //timestamps: false,
      paranoid: true // soft delete
    }
  );

  return Tag;
};
