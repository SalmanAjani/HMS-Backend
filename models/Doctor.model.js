const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  docID: {
    type: Number,
    required: true,
  },

  docName: {
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
    unique: true,
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

  education: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
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

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };
