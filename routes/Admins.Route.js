const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const admins = await AdminModel.find(query);
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const admin = new AdminModel(payload);
    await admin.save();
  } catch (error) {
    res.send("Something went wrong, unable to Register.");
    console.log(error);
  }
  res.send("Admin Registered Successfully");
});

router.post("/login", authenticate, async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.find({ adminID, password });

    if (admin.length > 0) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ messsage: "Login Successful.", user: admin, token: token });
    } else {
      res.send("Wrong credentials, Please try again.");
    }
  } catch (error) {
    console.log("Error occurred, unable to Login.");
    console.log(error);
  }
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
