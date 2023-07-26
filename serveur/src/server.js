const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const tagRouter = require("./routes/tagRouter.js");
const eventRouter = require("./routes/eventRouter.js")
const widgetRouter = require("./routes/widgetRouter.js")
const AuthRouter = require("./routes/authRouter.js");
const cors = require("cors");
const checkAuth = require("./middlewares/checkAuth");
require('dotenv').config();

const GenericController = require("./controllers/GenericController");
const AuthController = require("./controllers/AuthController");
const EventController = require("./controllers/EventController");
const WidgetController = require("./controllers/WidgetsController");

const errorsHandler = require("./middlewares/errorsHandler");
const UserService = require("./services/user.js");
const tagService = require("./services/Tag.js");
const WidgetService = require("./services/Widget.js");
const EventService = require("./services/event.js");
const dotenv = require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use("/users", new userRouter(new GenericController(new UserService())));
app.use("/tags", new tagRouter(new GenericController(new tagService())));
app.use("/events", new eventRouter(new EventController(new EventService())));
app.use("/widgets", new widgetRouter(new WidgetController(new WidgetService())));

app.use(
  new AuthRouter(
    new AuthController(new UserService()),
    new GenericController(new UserService())
  )
);

app.use(errorsHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("App listening on port 3000!");
  });
}

module.exports = app;
