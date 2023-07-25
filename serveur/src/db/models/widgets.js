const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
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


const widget = mongoose.model("widgets", widgetSchema);

module.exports = widget;
