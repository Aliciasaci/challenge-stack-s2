const ValidationError = require("../errors/ValidationError");
const Sequelize = require("sequelize");
const User = require("../db").User;
const Tag = require("../db").Tag;
const Tunnel = require("../db").Tunnel;
const TunnelTag = require("../db").TunnelTag;

module.exports = function () {
  return {
    async findAll(criteria, options) {
        try {
            const tunnelTag = await TunnelTag.findAll({
            where: criteria,
            offset:
                options && options.page
                ? (options.page - 1) * (options.limit || 20)
                : undefined,
            limit: (options && options.limit) || 20,
            order:
                options && options.order ? [options.order.split(":")] : undefined,
            });

            return tunnelTag;
        } catch (error) {
            console.error("Error while retrieving tunnels:", error);
            throw error;
        }
    },

    async create(data) {
        const idTag = data.id_tag;
        const idTunnel = data.id_tunnel;
        const order = data.order;
        return Tag.findByPk(idTag).then((tag) => {
            if (!tag) {
                throw new Error("Tag not found");
            }
            return Tunnel.findByPk(idTunnel).then((tunnel) => {
                if (!tunnel) {
                    throw new Error("Tunnel not found");
                }
                tunnel.create(tag, { through: { order: order } });
                return tunnel;
            });
        });
    },

    async findOne(id) {
        return await TunnelTag.findByPk(id);
    },
  };
};
