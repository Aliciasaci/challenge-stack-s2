const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwt');
const UserController = require('../controllers/UserController');
const UserModel = require('../models/UserModel');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            // Vérification du mot de passe
            if (password == foundUser.password) {
                // Génération du token JWT
                const token = jwt.sign({ userId: foundUser.id }, jwtConfig.jwtSecret, { algorithm: jwtConfig.jwtAlgorithm });
                return res.json({ token });
            } else {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'erreur serveur' });
    }
}

const signin = (req, res) => {

    const { nom, prenom , email, password, compteIsVerified } = req.body;

    if (!nom || !email || !password || !prenom || !compteIsVerified) {
        return res.status(400).json({ message: 'Veuillez fournir tous les champs requis.' });
    }

    //l'ajouter en base de données
    UserController.addUser(nom, prenom, email, password, compteIsVerified);
    return res.json({ message: 'Inscription réussie.' });

};

module.exports = { login, signin };