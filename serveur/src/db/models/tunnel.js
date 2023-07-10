const Tag = require('../models/tag');
module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");

    class Tunnel extends Model { }

    Tunnel.init(
        {
            commentaire: DataTypes.STRING,
            tagOrder: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
        },
        {
            tableName: "tunnels",
            sequelize: connection,
            //timestamps: false,
            paranoid: true // soft delete
        }
    );

    return Tag;
};
