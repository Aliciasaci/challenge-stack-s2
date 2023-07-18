const tag = require("../db/models/tag");
const ValidationError = require("../errors/ValidationError");
const Sequelize = require("sequelize");
const User = require("../db").User;
const Tag = require('../db').Tag;

module.exports = function () {
  return {
    //retoucher pour order, page etc
    async findAll(criteria) {
      return await User.findAll({
        where: criteria,
      });
    },


    async create(data) {
      try {
        const user = await User.create(data);
        return user;
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },


    async findOne(id) {
      return await User.findByPk(id);
    },


    async replaceOne(id, newData) {
      try {
        const deleted = await this.deleteOne(id);
        const user = await this.create({ ...newData, id });

        return [user, !deleted];
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },


    async updateOne(id, newData) {

      try {
        const [nbUpdated, newValues] = await User.update(newData, {
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
      const nbDeleted = await User.destroy({ where: { id } });
      return nbDeleted === 1;
    },


    async getUserTags(userId) {
      try {
        const tags = await Tag.findAll({
          where: {
            id_user: userId
          }
        });

        return tags;
      } catch (error) {
        console.error('Error while retrieving user tags:', error);
        throw error;
      }
    }
  };
};
