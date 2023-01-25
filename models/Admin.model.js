const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  userType: {
    type: String,
    required: true,
    default: "admin",
  },

  adminID: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  qualification: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
