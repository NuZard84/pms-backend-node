router = require("express").Router();
const Patient = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.post("/", async (req, res) => {
  try {
    // find all patients with same category
    const { category } = req.body;
    const patients = await Patient.find({ "Timeline.category": category });
    // console.log(patients);
    // return all patients with same category
    res.status(200).json({ patients });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
