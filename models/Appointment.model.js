const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  patientID: {
    type: Number,
    required: true,
  },

  patientName: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
  },

  problem: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
