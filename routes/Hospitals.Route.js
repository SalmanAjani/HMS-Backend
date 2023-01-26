const express = require("express");
const { AdminModel } = require("../models/Admin.model");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let admins = await AdminModel.find();
    let patients = await PatientModel.find();
    let data = { admin: admins.length, patient: patients.length };
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

module.exports = router;
