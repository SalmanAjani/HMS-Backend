const express = require("express");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const patients = await PatientModel.find(query);
    res.status(200).send(patients);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// This register route will be used when adding a patient via patient or doctor or admin
router.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const patient = new PatientModel(payload);
    await patient.save();
  } catch (error) {
    res.send("Something went wrong, unable to add Patient.");
    console.log(error);
  }
  res.send("Patient Added Successfully");
});

router.post("/login", async (req, res) => {
  const { patientID, password } = req.body;
  try {
    const patient = await PatientModel.find({ patientID, password });

    if (patient.length > 0) {
      res.send({ message: "Login Successful.", user: patient, report: [] });
    } else {
      res.send("Wrong credentials, Please try again.");
    }
  } catch (error) {
    console.log("Error occurred, unable to Login.");
    console.log(error);
  }
});

// Only Admin should be able to update or delete patient
router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const payload = req.body;
  try {
    const patient = await PatientModel.findByIdAndUpdate({ _id: id }, payload);
    if (!patient) {
      res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    res.status(200).send(`Patient with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const patient = await PatientModel.findByIdAndDelete({ _id: id });
    if (!patient) {
      res.status(404).send({ msg: `Patient with id ${id} not found` });
    }
    res.status(200).send(`Patient with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
