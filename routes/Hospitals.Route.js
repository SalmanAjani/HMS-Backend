const express = require("express");
const { HospitalModel } = require("../models/Hospital.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const hospitals = await HospitalModel.find(query);
    res.status(200).send(hospitals);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const hospital = new HospitalModel(payload);
    await hospital.save();
  } catch (error) {
    res.send("Something went wrong, unable to add Hospital.");
    console.log(error);
  }
  res.send("Hospital Added Successfully");
});

router.patch("/:hospitalId", async (req, res) => {
  const id = req.params.hospitalId;
  const payload = req.body;
  try {
    const hospital = await HospitalModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!hospital) {
      res.status(404).send({ msg: `Hospital with id ${id} not found` });
    }
    res.status(200).send(`Hospital with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:hospitalId", async (req, res) => {
  const id = req.params.hospitalId;
  try {
    const hospital = await HospitalModel.findByIdAndDelete({ _id: id });
    if (!hospital) {
      res.status(404).send({ msg: `Hospital with id ${id} not found` });
    }
    res.status(200).send(`Hospital with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
