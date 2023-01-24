const express = require("express");
const { PaymentModel } = require("../models/Payment.model");

const router = express.Router();

router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const payments = await PaymentModel.find(query);
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/send", async (req, res) => {
  const payload = req.body;
  try {
    const payment = new PaymentModel(payload);
    await payment.save();
  } catch (error) {
    res.send("Error occurred, unable to receive the payment.");
    console.log(error);
  }
  res.send("Payment received successfully.");
});

router.patch("/:paymentId", async (req, res) => {
  const id = req.params.paymentId;
  const payload = req.body;
  try {
    const payment = await PaymentModel.findByIdAndUpdate({ _id: id }, payload);
    if (!payment) {
      res.status(404).send({ msg: `Payment with id ${id} not found` });
    }
    res.status(200).send(`Payment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:paymentId", async (req, res) => {
  const id = req.params.paymentId;
  try {
    const payment = await PaymentModel.findByIdAndDelete({ _id: id });
    if (!payment) {
      res.status(404).send({ msg: `Payment with id ${id} not found` });
    }
    res.status(200).send(`Payment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
