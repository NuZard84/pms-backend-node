router = require("express").Router();
const Patient = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.post("/", async (req, res) => {
  try {
    console.log("request come");
    const { id } = req.body;
    const patient = await Patient.findById(id);
    console.log(patient);
    if (!patient) {
      res.status(404).json({ message: "Patient not found!" });
    } else {
      res.status(200).json({ patient });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
