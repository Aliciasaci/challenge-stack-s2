const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const config = require('./config/database');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
require("./routes/routes.js")(app);


// Connexion à la base de données
mongoose.connect(config.db.url, config.db.options)
    .then(() => {
        console.log('Connecté à MongoDB');
    }).catch((err) => {
        console.error('Erreur de connexion à MongoDB', err);
    });

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});


