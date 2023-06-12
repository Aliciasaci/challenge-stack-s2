const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const addUser = require('./controllers/Users');

app.use(cors());

const mongoose = require('mongoose');
const config = require('./config/database');
const routes = require('./routes/routes');

// Connexion à la base de données
mongoose.connect(config.db.url, config.db.options)
    .then(() => {
        console.log('Connecté à MongoDB');
    }).catch((err) => {
        console.error('Erreur de connexion à MongoDB', err);
    });


    addUser("coucou","alicia","hello");

// Routes de l'API
app.use('/api', routes);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});


