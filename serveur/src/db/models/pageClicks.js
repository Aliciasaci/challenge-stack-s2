const mongoose = require("mongoose");

const pageClicksSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const pageClicks = mongoose.model("pageClicks", pageClicksSchema);

module.exports = pageClicks;
