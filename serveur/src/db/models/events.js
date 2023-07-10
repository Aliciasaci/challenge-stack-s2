const mongoose = require('mongoose');

// Définition du schéma pour un modèle "Utilisateur"
const eventSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: String,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;