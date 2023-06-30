const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const tagRouter = require("./routes/tagRouter.js");

const GenericController = require("./controllers/GenericController");
const authController = require("./controllers/AuthController");

const errorsHandler = require("./middlewares/errorsHandler");
const UserService = require("./services/user.js");
const tagService = require("./services/Tag.js");
const dotenv = require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/",new authRouter(new authController()));
app.use("/users",new userRouter(new GenericController(new UserService())));
app.use("/tags",new tagRouter(new GenericController(new tagService())));


app.use(errorsHandler);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
