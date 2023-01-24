const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminID: {
    type: Number,
    required: true,
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
