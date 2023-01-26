const express = require("express");
const { BedModel } = require("../models/Bed.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const beds = await BedModel.find().populate([
      {
        path: "patientID",
        populate: {
          path: "docID",
        },
      },
      {
        path: "patientID",
        populate: {
          path: "nurseID",
        },
      },
    ]);
    res.status(200).send(beds);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/single", async (req, res) => {
  const { bedNumber, roomNumber } = req.body;
  try {
    const bed = await BedModel.find({ bedNumber, roomNumber });
    if (bed[0].occupied === "available") {
      return res.send({ message: "Available", id: bed._id });
    }
    return res.send({ message: "Occupied" });
  } catch (error) {
    res.send(error, { message: "No Bed" });
  }
});

router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const bed = new BedModel(payload);
    await bed.save();
    res.send(bed);
  } catch (error) {
    res.send("Something went wrong, unable to add Bed.");
    console.log(error);
  }
  res.send("Bed Added Successfully");
});

router.patch("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  const payload = req.body;
  try {
    const bed = await BedModel.findByIdAndUpdate({ _id: id }, payload);
    if (!bed) {
      res.status(404).send({ msg: `Bed with id ${id} not found` });
    }
    res.status(200).send(`Bed with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:bedId", async (req, res) => {
  const id = req.params.bedId;
  try {
    const bed = await BedModel.findByIdAndDelete({ _id: id });
    if (!bed) {
      res.status(404).send({ msg: `Bed with id ${id} not found` });
    }
    res.status(200).send(`Bed with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
