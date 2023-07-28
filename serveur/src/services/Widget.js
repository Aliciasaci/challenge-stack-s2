const WidgetModel = require("../db/models/widgets");
const { pipeline } = require("stream");

module.exports = function () {
  return {
    async createWidget(widgetData) {
      try {
        const newWidget = new WidgetModel(widgetData);
        return await newWidget.save();
      } catch (error) {
        console.error("Error while creating the widget:", error);
        throw new Error("Error while creating the widget");
      }
    },

    async getAllWidgets(options) {
      const type = options.type;
      const orderDesc = options.orderDesc;
      const appId = options.appId;

      try {
        let pipeline = [];
        if (type) {
          pipeline.push({ $match: { type: type } });
        }

        if (appId) {
          pipeline.push({ $match: { appId: appId } });
        }

        if (orderDesc) {
          pipeline.push({ $sort: { createdAt: -1 } });
        } else {
          pipeline.push({ $sort: { createdAt: 1 } });
        }

        return WidgetModel.aggregate(pipeline)
          .then((resultats) => {
            return resultats;
          })
          .catch((error) => {
            throw new Error("an error has occured");
          });
      } catch (error) {
        console.error("Error while retrieving all widgets:", error);
        throw new Error("Error while retrieving all widgets");
      }
    },

    async getWidgetById(widgetId) {
      try {
        return await WidgetModel.findOne({ _id: widgetId });
      } catch (error) {
        console.error("Error while retrieving the widget:", error);
        throw new Error("Error while retrieving the widget");
      }
    },

    async updateWidgetById(widgetId, widgetData) {
      try {
        return await WidgetModel.findOneAndUpdate(
          { _id: widgetId },
          widgetData,
          { new: true }
        );
      } catch (error) {
        console.error("Error while updating the widget:", error);
        throw new Error("Error while updating the widget");
      }
    },

    async deleteWidgetById(widgetId) {
      try {
        return await WidgetModel.findOneAndDelete({ _id: widgetId });
      } catch (error) {
        console.error("Error while deleting the widget:", error);
        throw new Error("Error while deleting the widget");
      }
    },

    async getWidgetsByAppId(appId) {
      try {
        const widgets = await WidgetModel.find({ appId: appId });
        return widgets;
      } catch (error) {
        console.error("Error while retrieving widgets by appId:", error);
        throw new Error("Error while retrieving widgets by appId");
      }
    },
  };
};
