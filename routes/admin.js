router = require("express").Router();
const Doctor = require("../models/doctorModal");
const bcrypt = require("bcryptjs");
const paitent = require("../models/patientModal");

router.post("/add/doctor", async (req, res) => {
  try {
    const { email, password, secKey } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newDoctor = new Doctor({
      email: email,
      password: hashedPassword,
      isDoctor: true,
      secKey: secKey,
    });
    await newDoctor.save();
    res
      .status(200)
      .json({ message: "Doctor added successfully!", data: newDoctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/delete/doctor", async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOneAndDelete({ email: email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    res.status(200).json({ message: "Doctor deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/delete/patient", async (req, res) => {
  try {
    const { email } = req.body;
    const patient = await paitent.findOneAndDelete({ email: email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }
    res.status(200).json({ message: "Patient deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
