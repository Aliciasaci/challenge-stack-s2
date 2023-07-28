const PageClicks = require("../db/models/pageClicks");

module.exports = function () {
  return {
    async createPageClicks(eventData) {
      try {
        const event = new PageClicks(eventData);
        return await event.save();
      } catch (error) {
        throw new Error("Error while creating the event");
      }
    },

    async getAllPageClicks(options) {
      const appId = options.appId;
      const dateDebut = options.dateDebut;
      const dateFin = options.dateFin;
      const page = options.page;
      const periode = options.periode;
      let pipeline = [];

      try {
        let dateFormat = "";
        switch (periode) {
          case "day":
            dateFormat = "%Y-%m-%d";
            break;
          case "month":
            dateFormat = "%Y-%m";
            break;
          case "year":
            dateFormat = "%Y";
            break;
          default:
            throw new Error("Invalid period parameter");
        }

        if (appId) {
          pipeline.push({ $match: { appId: appId } });
        }

        if (dateDebut && dateFin) {
          pipeline.push({
            $match: {
              createdAt: {
                $gte: new Date(dateDebut),
                $lte: new Date(dateFin),
              },
            },
          });
        } else if (dateDebut) {
          pipeline.push({
            $match: { createdAt: { $gte: new Date(dateDebut) } },
          });
        } else if (dateFin) {
          pipeline.push({
            $match: { createdAt: { $lte: new Date(dateFin) } },
          });
        }

        pipeline.push({ $match: { "data.page": page } });
        pipeline.push({
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: dateFormat,
                  date: "$createdAt",
                },
              },
              x: "$data.x",
              y: "$data.y",
            },
            count: { $sum: 1 },
          },
        });
        pipeline.push({
          $group: {
            _id: { date: "$_id.date" },
            arrayData: {
              $push: {
                x: { $ifNull: ["$_id.x", null] },
                y: { $ifNull: ["$_id.y", null] },
                totalClicks: "$count",
              },
            },
          },
        });
        pipeline.push({
          $project: {
            _id: 0,
            appId: appId,
            period: { $concat: [dateDebut, " ", dateFin] },
            arrayData: 1,
          },
        });
        console.log(JSON.stringify(pipeline));

        return await PageClicks.aggregate(pipeline)
          .then((resultats) => {
            console.log(typeof resultats);
            return resultats;
          })
          .catch((error) => {
            console.log("here", error);
            throw new Error("Error");
          });
      } catch (error) {
        console.log(error);
        throw new Error("Error while retrieving events");
      }
    },

    async getPageClickCount(options) {
      const dateDebut = options.dateDebut;
      const dateFin = options.dateFin;
      const type = options.type;
      const periode = options.periode;
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

        if (dateDebut && dateFin) {
          console.log(new Date(dateFin));
          pipeline.push({
            $match: {
              createdAt: { $gte: new Date(dateDebut), $lte: new Date(dateFin) },
            },
          });
        } else if (dateDebut) {
          pipeline.push({
            $match: { createdAt: { $gte: new Date(dateDebut) } },
          });
        } else if (dateFin) {
          pipeline.push({ $match: { createdAt: { $lte: new Date(dateFin) } } });
        }

        if (periode == "day") {
          pipeline.push({
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          });
        } else if (periode == "month") {
          pipeline.push({
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
              count: { $sum: 1 },
            },
          });
        } else if (periode == "year") {
          pipeline.push({
            $group: {
              _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
              count: { $sum: 1 },
            },
          });
        }

        if (orderDesc) {
          pipeline.push({ $sort: { createdAt: -1 } });
        } else {
          pipeline.push({ $sort: { createdAt: 1 } });
        }

        pipeline.push({
          $project: {
            _id: 0,
            periode: "$_id",
            count: "$count",
          },
        });
        console.log(pipeline);

        return Event.aggregate(pipeline)
          .then((resultats) => {
            console.log(typeof resultats);

            return resultats;
          })
          .catch((error) => {
            console.log("here", error);
            throw new Error("Error");
          });
      } catch (error) {
        console.log(error);
      }
    },

    async getPageClicksById(pageClickId) {
      try {
        return await PageClicks.findOne({ _id: pageClickId });
      } catch (error) {
        throw new Error("Error while retrieving the event");
      }
    },

    async getPageClickByVisitorId(visitorId) {
      try {
        const pageClicks = await PageClicks.find({
          "data.visitorId": visitorId,
        });
        return pageClicks;
      } catch (error) {
        throw new Error("Error while retrieving the event");
      }
    },
  };
};
