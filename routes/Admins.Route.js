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

router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ adminID, password });

    if (admin) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", admin: admin, token: token });
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

router.post("/forgotPassword", (req, res) => {
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      admin: "salmanajani26@gmail.com",
      pass: process.env.gmailPass,
    },
  });

  const mailOptions = {
    from: "salmanajani26@gmail.com",
    to: email,
    subject: "Password Reset",
    text: "Please click the link below to reset your password: https://zany-gray-clam-gear.cyclic.app/resetPassword",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Password reset email sent");
    }
  });
});

router.post("/resetPassword", (req, res) => {
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
