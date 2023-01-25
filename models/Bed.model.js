const mongoose = require("mongoose");

const bedSchema = mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true,
  },

  roomNumber: {
    type: Number,
    required: true,
  },

  occupied: {
    type: Boolean,
    required: true,
  },

  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
});

const BedModel = mongoose.model("bed", bedSchema);

module.exports = { BedModel };
