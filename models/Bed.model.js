const mongoose = require("mongoose");

const bedSchema = mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true,
  },

  patientID: {
    type: Number,
    required: true,
  },

  docID: {
    type: Number,
    required: true,
  },

  occupied: {
    type: Boolean,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const BedModel = mongoose.model("bed", bedSchema);

module.exports = { BedModel };
