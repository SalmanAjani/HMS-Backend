const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },

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
    minlength: 10,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
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

  bloodGroup: {
    type: String,
    required: true,
  },

  DOB: {
    type: String,
    required: true,
  },

  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },

  image: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },
});

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = { PatientModel };
