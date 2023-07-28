const ValidationError = require("../errors/ValidationError");
const Sequelize = require("sequelize");
const Tag = require("../db").Tag;

module.exports = function () {
  return {
    /**
     * find all tags
     * @param {*} criteria 
     * @param {*} param1 
     * @returns 
     */
    async findAll(criteria, { page = null, itemsPerPage = null, order = {} }) {
      return await Tag.findAll({
        where: criteria,
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        order: Object.entries(order),
      });
    },


    /**
     * Create a tag
     * @param {*} data 
     * @returns 
     */
    async create(data) {

      console.log(data);
      try {
        const tag = await Tag.create(data);
        return tag;
      } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
          console.log(error);
          throw ValidationError.createFromSequelizeValidationError(error);
        }
        throw error;
      }
    },


    /**
     * Find a tag
     * @param {*} id 
     * @returns 
     */
    async findOne(id) {
      return await Tag.findByPk(id);
    },


    /**
     * update the comment 
     * @param {*} id 
     * @param {*} newData 
     * @returns 
     */
    async updateOne(id, newData) {
      try {
        const [nbUpdated, newValues] = await Tag.update(newData, {
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

    /**
     * delete a tag
     * @param {*} id 
     * @returns 
     */
    async deleteOne(id) {
      const nbDeleted = await Tag.destroy({ where: { id } });
      return nbDeleted === 1;
    },

    
  };
};
