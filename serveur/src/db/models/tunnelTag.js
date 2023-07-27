module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
    const Tag = require("../models/tag");
    const Tunnel = require("../models/tunnel");

    const tunnel_tag = connection.define("tunnel_tag", {
        id_tunnel: {
            type: DataTypes.INTEGER,
            references: {
                model: Tunnel,
                key: 'id'
            }
        },
        id_tag: {
            type: DataTypes.INTEGER,
            references: {
                model: Tag,
                key: 'id'
            }
        },
        ordre: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
      connection,
      tableName: "tunnel_tag"
    });
    
    return tunnel_tag;
};
  