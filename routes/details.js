const router = require("express").Router();
const paitent = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.post("/patient", async (req, res) => {
  const { email, gender, age, phoneNumber } = req.body;
  console.log(req.body);
  try {
    const patient = await paitent.findOne({ email });
    patient.gender = gender;
    patient.age = age;
    patient.phoneNumber = phoneNumber;

    await patient.save();
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});
router.post("/doctor", async (req, res) => {
  const { email, name, gender, age, phoneNumber, apiKey, education } = req.body;
  console.log(req.body);
  try {
    const doctor = await Doctor.findOne({ email });
    console.log(doctor);
    doctor.apiKey = apiKey;
    doctor.name = name;
    doctor.gender = gender;
    doctor.age = age;
    doctor.education = education;
    doctor.phoneNumber = phoneNumber;

    await doctor.save();
    return res.status(201).json(doctor);
  } catch (error) {
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});

module.exports = router;
