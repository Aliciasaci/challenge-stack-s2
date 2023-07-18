const mongoose = require('mongoose');

// Définition du schéma pour un modèle "events"
//website_owner_user est équivalent à user dans la db. 
//j'ai pas utilisé user_id pour éviter la confusion avec un visiteur de site
const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  website_owner_id: {
    type: Number,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const event = mongoose.model('event', eventSchema);

module.exports = event;