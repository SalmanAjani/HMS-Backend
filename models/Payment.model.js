const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  patientID: {
    type: Number,
    required: true,
  },

  patientName: {
    type: String,
    required: true,
  },

  docName: {
    type: String,
    required: true,
  },

  reportRef: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = { PaymentModel };
