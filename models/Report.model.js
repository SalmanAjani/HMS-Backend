const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  doctor: {
    docName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    medicines: {
      type: String,
      required: true,
    },
    dosage: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    extrainfo: {
      type: String,
      required: true,
    },
  },

  patient: {
    patientName: {
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
    mobile: {
      type: Number,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    disease: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    BP: {
      type: Number,
      required: true,
    },
    glucose: {
      type: Number,
      required: true,
    },
  },

  date: {
    type: String,
    required: true,
  },
});

const ReportModel = mongoose.model("report", reportSchema);

module.exports = { ReportModel };
