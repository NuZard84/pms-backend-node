router = require("express").Router();
const Patient = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.post("/", async (req, res) => {
  try {
    console.log("request come");
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    console.log(doctor);
    if (!doctor) {
      res.status(404).json({ message: "doctor not found!" });
    } else {
      res.status(200).json({ doctor });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/byid", async (req, res) => {
  try {
    console.log("request come");
    const { id } = req.body;
    const doctor = await Doctor.findOne({ id: id });
    console.log(doctor);
    if (!doctor) {
      res.status(404).json({ message: "doctor not found!" });
    } else {
      res.status(200).json({ doctor });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
