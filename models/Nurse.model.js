const mongoose = require("mongoose");

const nurseSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "nurse",
  },

  nurseID: {
    type: Number,
    required: true,
  },

  nurseName: {
    type: String,
  },

  mobile: {
    type: Number,

    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  department: {
    type: String,
  },

  image: {
    type: String,
  },

  details: {
    type: String,
  },
});

const NurseModel = mongoose.model("nurse", nurseSchema);

module.exports = { NurseModel };
