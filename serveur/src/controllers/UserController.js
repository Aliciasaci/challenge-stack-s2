const User = require('../models/UserModel');
//** Toutes les fonctions relatives à l'utilisateur */

/**
 * 
 * @param {*} nom 
 * @param {*} prenom 
 * @param {*} email 
 * @param {*} password 
 * @param {*} compteIsVerified 
 */
const addUser = (nom, prenom, email, password, compteIsVerified) => {
    const newUser = new User({
        nom: nom,
        prenom : prenom,
        email: email,
        password: password,
        compteIsVerified : compteIsVerified
    });

    newUser.save()
        .then(() => {
            console.log('Le user a été ajouté avec success !');
        })
        .catch((err) => {
            console.error(err);
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {

    const User = require('../models/UserModel');

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
}

/**
 * 
 * @param {*} userId 
 * @param {*} updatedData 
 */
const updateUser = (userId, updatedData) => {
    User.findByIdAndUpdate(userId, updatedData)
        .then(() => {
            console.log('L\'utilisateur a été mis à jour avec succès !');
        })
        .catch((err) => {
            console.error(err);
        });
};

/**
 * 
 * @param {*} userId 
 */
const getUserById = (userId) => {
    User.findById(userId)
        .then((user) => {
            if (user) {
                console.log(user);
            } else {
                console.log('Utilisateur introuvable');
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

/**
 * 
 * @param {*} userId 
 */
const deleteUserById = (userId) => {
    User.findByIdAndDelete(userId)
        .then(() => {
            return console.log('Utilisateur supprimé avec succès');
        })
        .catch((err) => {
            console.error(err);
        });
};

const checkExistingUserByEmail = async (req, res) => {

    const email = req.query.email;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ data : existingUser });
        } else {
            return res.status(500).json({ message: "user not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(505).json({ message: 'erreur serveur' });
    }
};

module.exports = { addUser, getUsers, updateUser, getUserById, deleteUserById, checkExistingUserByEmail };