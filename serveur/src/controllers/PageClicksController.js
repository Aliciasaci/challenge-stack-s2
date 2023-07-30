module.exports = function (pageClickService, options = {}) {
  return {
    async createPageClicks(req, res, next) {
      try {
        const pageClickData = req.body;
        const pageClick = await pageClickService.createPageClicks(
          pageClickData
        );
        res.status(201).json(pageClick);
      } catch (error) {
        res
          .status(500)
          .json({ error: "[CONTROLLER] = Error while creating the pageClick" });
      }
    },

    async getAllPageClicks(req, res, next) {
      const options = {
        appId: req.query.appId ?? null,
        dateDebut: req.query.dateDebut ?? null,
        dateFin: req.query.dateFin ?? null,
        periode: req.query.periode ?? null,
        page: req.query.page ?? null,
      };
      try {
        const pageClicks = await pageClickService.getAllPageClicks(options);
        res.status(200).json(pageClicks);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Error while retrieving all pageClicks" });
      }
    },

    async getPageClicksById(req, res, next) {
      try {
        const pageClickId = req.params.id;
        const pageClick = await pageClickService.getPageClicksById(pageClickId);
        res.status(200).json(pageClick);
      } catch (error) {
        res.status(500).json({ error: "Error while retrieving the pageClick" });
      }
    },

    async getPageClicksByVisitorId(req, res) {
      try {
        const visitorId = req.params.id;
        const pageClicks = await pageClickService.getPageClickByVisitorId(
          visitorId
        );
        res.status(200).json(pageClicks);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error while retrieving the pageClicks" });
      }
    },
  };
};
