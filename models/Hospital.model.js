const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  docNumbers: {
    type: Number,
    required: true,
  },

  patientNumbers: {
    type: Number,
    required: true,
  },

  nurseNumbers: {
    type: Number,
    required: true,
  },

  ambulanceNumbers: {
    type: Number,
    required: true,
  },

  roomsNumbers: {
    type: Number,
    required: true,
  },

  bedNumbers: {
    type: Number,
    required: true,
  },

  appointmentNumbers: {
    type: Number,
    required: true,
  },

  pendingPaymentNumbers: {
    type: Number,
    required: true,
  },
});

const HospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = { HospitalModel };
