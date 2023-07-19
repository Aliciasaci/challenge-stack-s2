const mongoose = require('mongoose');

// Définition du schéma pour un modèle "events"
//website_owner_user est équivalent à user dans la db. 
const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: false,
  },
  appId: {
    type: String,
    required : true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const event = mongoose.model('event', eventSchema);

module.exports = event;