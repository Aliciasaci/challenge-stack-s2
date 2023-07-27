const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const tagRouter = require("./routes/tagRouter.js");
const tunnelRouter = require("./routes/tunnelRouter.js");
const eventRouter = require("./routes/eventRouter.js");
const widgetRouter = require("./routes/widgetRouter.js");
const AuthRouter = require("./routes/authRouter.js");
const cors = require("cors");
const tunnelTagRouter = require("./routes/tunnelTagRouter.js");
require('dotenv').config();
const GenericController = require("./controllers/GenericController");
const AuthController = require("./controllers/AuthController");
const EventController = require("./controllers/EventController");
const WidgetController = require("./controllers/WidgetsController");
const errorsHandler = require("./middlewares/errorsHandler");
const UserService = require("./services/user.js");
const tagService = require("./services/Tag.js");
const TunnelService = require("./services/tunnel.js");
const WidgetService = require("./services/Widget.js");
const EventService = require("./services/event.js");
const dotenv = require('dotenv').config();
const TunnelTagService = require("./services/tunnelTag.js");
const { watchChanges } = require("./db/streamChanges");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(errorsHandler);

app.use("/users", new userRouter(new GenericController(new UserService())));
app.use("/tags", new tagRouter(new GenericController(new tagService())));
app.use("/events", new eventRouter(new EventController(new EventService())));
app.use("/widgets", new widgetRouter(new WidgetController(new WidgetService())));
app.use("/tunnels", new tunnelRouter(new GenericController(new TunnelService())));
app.use("/tunneltag", new tunnelTagRouter(new GenericController(new TunnelTagService())));

app.use(
  new AuthRouter(
    new AuthController(new UserService()),
    new GenericController(new UserService())
  )
);

app.get('/watch/events/', (req, res) => {
  // Configurer les en-têtes pour indiquer que c'est une connexion SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Émettre périodiquement des événements à tous les clients connectés
  watchChanges("mongodb://0.0.0.0:27017/mongodatabase", "mongodatabase", "events", res)
});


if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("App listening on port 3000!");
  });
}

module.exports = app;
