
const bcrypt = require("bcrypt");
const db = require("../db/");
const jwt = require("jsonwebtoken");

const User = db.User;
module.exports = function (Service, options = {}) {
    return {
        async getAll(req, res) {
            const {
                _page = 1,
                _itemsPerPage = 30,
                // _sort[id]=ASC&_sort[name]=DESC
                _sort = {},
                ...criteria
            } = req.query;

            const items = await Service.findAll(criteria, {
                itemsPerPage: _itemsPerPage,
                page: _page,
                order: _sort,
            });
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
            } else res.sendStatus(204);
        },


        async signup(req, res) {
            try {
                const { firstname, lastname, email, password } = req.body;
                const data = {
                    firstname,
                    lastname,
                    email,
                    password: await bcrypt.hash(password, 10),
                };
                const user = await User.create(data);

                if (user) {
                    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                        expiresIn: 1 * 24 * 60 * 60 * 1000,
                    });

                    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                    console.log("user", JSON.stringify(user, null, 2));
                    console.log(token);
                    return res.status(201).send(user);
                } else {
                    return res.status(409).send("Details are not correct");
                }
            } catch (error) {
                console.log(error);
            }
        },

        async login(req, res) {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({
                    where: {
                        email: email
                    }

                });
                if (user) {
                    const isSame = await bcrypt.compare(password, user.password);

                    if (isSame) {
                        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                            expiresIn: 1 * 24 * 60 * 60 * 1000,
                        });

                        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                        console.log("user", JSON.stringify(user, null, 2));
                        console.log(token);
                        return res.status(201).send(user);
                    } else {
                        return res.status(401).send("Authentication failed");
                    }
                } else {
                    return res.status(401).send("Authentication failed");
                }
            } catch (error) {
                console.log(error);
            }
        }

    };
};
