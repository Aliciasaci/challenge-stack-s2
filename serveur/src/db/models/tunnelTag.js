module.exports = function (connection) {
    const { DataTypes, Model } = require("sequelize");
    const Tag = require("../models/tag");
    const Tunnel = require("../models/tunnel");

    const TunnelTag = connection.define("TunnelTag", {
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
    
    return TunnelTag;
};
  