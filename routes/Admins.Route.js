const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({
        message: "Admin already exists",
      });
    }
    let value = new AdminModel(req.body);
    await value.save();
    const data = await AdminModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: "error" });
  }
});


router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ adminID, password });

    if (admin) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: admin, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
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

router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg",
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

router.post("/registerPassword", (req, res) => {
  const password = req.body.password;
  const adminID = req.body.adminID;

  AdminModel.findById(adminID, (err, admin) => {
    if (err) {
      res.status(500).send("Error finding admin");
    } else if (!admin) {
      res.status(404).send("Admin not found");
    } else {
      AdminModel.findByIdAndUpdate(admin._id, { password: password }, (err) => {
        if (err) {
          res.status(500).send("Error updating password");
        } else {
          res.status(200).send("Password updated successfully");
        }
      });
    }
  });
});

module.exports = router;
