const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
const { authenticate } = require("../middlewares/doctorAuth");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const doctors = await DoctorModel.find(query);
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const doctor = new DoctorModel(payload);
    await doctor.save();
  } catch (error) {
    res.send("Something went wrong, unable to Register.");
    console.log(error);
  }
  res.send("Doctor Registered Successfully");
});

router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ docID, password });

    if (doctor) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "1h",
      });
      res.send({ messsage: "Login Successful.", user: doctor, token: token });
    } else {
      res.send("Wrong credentials, Please try again.");
    }
  } catch (error) {
    console.log("Error occurred, unable to Login.");
    console.log(error);
  }
});

router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    const doctor = await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
    if (!doctor) {
      res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
    if (!doctor) {
      res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send(`Doctor with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
