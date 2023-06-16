const mongoose = require('mongoose');

/**
 * Les modèles de la base de données
 */
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
  compteIsVerified : Boolean
});

module.exports = mongoose.model('Users', userSchema);