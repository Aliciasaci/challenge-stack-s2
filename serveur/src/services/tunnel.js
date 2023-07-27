const ValidationError = require("../errors/ValidationError");
const Sequelize = require("sequelize");
const Tunnel = require("../db").Tunnel;

module.exports = function () {
  return {
    async findAll(criteria, options) {
      try {
        const tunnels = await Tunnel.findAll({
          where: criteria,
          offset:
            options && options.page
              ? (options.page - 1) * (options.limit || 20)
              : undefined,
          limit: (options && options.limit) || 20,
          order:
            options && options.order ? [options.order.split(":")] : undefined,
        });

        return tunnels;
      } catch (error) {
        console.error("Error while retrieving tunnels:", error);
        throw error;
      }
    },

    async create(data) {
      try {
        const tunnel = await Tunnel.create(data);
        return tunnel;
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },

    async findOne(id) {
      return await Tunnel.findByPk(id);
    },

    async replaceOne(id, newData) {
      try {
        const deleted = await this.deleteOne(id);
        const tunnel = await this.create({ ...newData, id });

        return [tunnel, !deleted];
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },

    async updateOne(id, newData) {
      try {
        const [nbUpdated, newValues] = await Tunnel.update(newData, {
          where: { id },
          returning: true,
        });
        if (nbUpdated === 0) {
          return null;
        }
        return newValues[0];
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },

    async deleteOne(id) {
      const nbDeleted = await Tunnel.destroy({ where: { id } });
      return nbDeleted === 1;
    },
  };
};
