router = require("express").Router();

const Patient = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      res.status(400).json({ message: "doctor not found!" });
    } else {
      res.status(200).json({ doctors });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients) {
      res.status(400).json({ message: "patient not found!" });
    } else {
      res.status(200).json({ patients });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
