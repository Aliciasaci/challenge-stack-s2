const User = require('../models/models');

//Ajout d'un utilisateur
const addUser = (username, email, password) => {
    const newUser = new User({
        username: username,
        email: email,
        password: password,
    });

    newUser.save()
        .then(() => {
            console.log('Le document a été ajouté avec succès !');
        })
        .catch((err) => {
            console.error(err);
        });
}


module.exports = addUser;