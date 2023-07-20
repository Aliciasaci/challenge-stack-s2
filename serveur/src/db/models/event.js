const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: false,
  },
  appId: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
}, { timestamps: true });

const event = mongoose.model('event', eventSchema);

module.exports = event;
