const { table } = require('console');
const { v4: uuidv4 } = require('uuid');

module.exports = function (Service) {
    return {
        async getAll(req, res) {
            const criteria = {};
            const attributes = req.query._attributes ? req.query._attributes.split(',') : undefined;

            const options = {
                attributes,
                page: req.query.page,
                limit: req.query.limit,
                order: req.query.order,
            };

            const items = await Service.findAll(criteria, options);
            res.json(items);
        },

        async create(req, res, next) {
            try {
                const item = await Service.create(req.body);
                res.status(201).json(item);
            } catch (error) {
                next(error);
            }
        },

        async getOne(req, res) {
            const item = await Service.findOne(parseInt(req.params.id, 10));
            if (!item) {
                res.sendStatus(404);
            } else {
                res.json(item);
            }
        },

        async replace(req, res, next) {
            try {
                const [item, created] = await Service.replaceOne(
                    parseInt(req.params.id, 10),
                    req.body
                );

                if (!item) {
                    res.sendStatus(404);
                } else res.status(created ? 201 : 200).json(item);
            } catch (error) {
                next(error);
            }
        },

        async update(req, res, next) {
            try {
                const item = await Service.updateOne(
                    parseInt(req.params.id, 10),
                    req.body
                );
                if (!item) {
                    res.sendStatus(404);
                } else res.json(item);
            } catch (error) {
                next(error);
            }
        },

        async delete(req, res) {
            const deleted = await Service.deleteOne(parseInt(req.params.id, 10));
            if (!deleted) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        },

        async generateAppId(req, res) {
            const userId = req.params.id;
            const appId = uuidv4();
            const newData = { appId: appId };
            if (appId) {
                res.json(appId);
                Service.updateOne(userId, newData)
            } else res.sendStatus(204);
        },

        async getUserTags(req, res) {
            const userId = req.params.id;
            if (userId) {
                const userTags = await Service.getUserTags(userId);
                if (userTags) {
                    res.json(userTags);
                }
                else res.sendStatus(204);
            }
        },
    };
};