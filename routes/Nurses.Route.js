const express = require("express");
const { NurseModel } = require("../models/Nurse.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const nurses = await NurseModel.find(query);
    res.status(200).send(nurses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const nurse = new NurseModel(payload);
    await nurse.save();
  } catch (error) {
    res.send("Something went wrong, unable to Register.");
    console.log(error);
  }
  res.send("Nurse Registered Successfully");
});

router.post("/login", async (req, res) => {
  const { nurseID, password } = req.body;
  try {
    const nurse = await NurseModel.find({ nurseID, password });

    if (nurse.length > 0) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Login Successful.", user: nurse, token: token });
    } else {
      res.send("Wrong credentials, Please try again.");
    }
  } catch (error) {
    console.log("Error occurred, unable to Login.");
    console.log(error);
  }
});

router.patch("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  const payload = req.body;
  try {
    const nurse = await NurseModel.findByIdAndUpdate({ _id: id }, payload);
    if (!nurse) {
      res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    res.status(200).send(`Nurse with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:nurseId", async (req, res) => {
  const id = req.params.nurseId;
  try {
    const nurse = await NurseModel.findByIdAndDelete({ _id: id });
    if (!nurse) {
      res.status(404).send({ msg: `Nurse with id ${id} not found` });
    }
    res.status(200).send(`Nurse with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
