const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const server = require('http').createServer(app);
app.use(cors());

app.get('/data', (req, res) => {
    const data = ["Acanthe", "Agapanthe",'Agave','Ajania']
    res.send(data);
});

server.listen(port, () => console.log("APP IS RUNNING !!!"));
