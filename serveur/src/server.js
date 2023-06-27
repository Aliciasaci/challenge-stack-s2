const express = require("express");
const app = express();
const genericCRUDRouter = require("./routes/genericCRUDRouter");
const GenericController = require("./controllers/GenericController");
const errorsHandler = require("./middlewares/errorsHandler");
const UserService = require("./services/user.js");
const dotenv = require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(
  "/users",
  new genericCRUDRouter(new GenericController(new UserService()))
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

app.use(errorsHandler);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
