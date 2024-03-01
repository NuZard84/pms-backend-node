const router = require("express").Router();
const Paitent = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

router.post("/doctor", async (req, res) => {
  const { email, name, gender, age, phoneNumber, category, education } =
    req.body;
  // console.log(req.body);
  try {
    const doctor = await Doctor.findOne({ email });
    console.log(doctor);
    doctor.specialist = category;
    doctor.name = name;
    doctor.gender = gender;
    doctor.age = age;
    doctor.education = education;
    doctor.phoneNumber = phoneNumber;
    doctor.isDetailsFilled = true;
    await doctor.save();
    console.log(doctor);
    console.log("doctor full details saved into database!");
    return res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});

router.post("/update/doctor", async (req, res) => {
  const { email, name, gender, age, phoneNumber, category, education } =
    req.body;
  console.log(req.body);
  try {
    const doctor = await Doctor.findOne({ email });
    const updateDoctor = {
      ...doctor,
      specialist: category || doctor.specialist,
      name: name || doctor.name,
      gender: gender || doctor.gender,
      age: age || doctor.age,
      phoneNumber: phoneNumber || doctor.phoneNumber,
      education: education || doctor.education,
    };
    Object.assign(doctor, updateDoctor);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});

router.post("/update/patient", async (req, res) => {
  const { email, name, gender, age, phoneNumber } = req.body;
  console.log(req.body);
  try {
    const patient = await Paitent.findOne({ email });
    const updatePatient = {
      ...patient,
      name: name || patient.name,
      gender: gender || patient.gender,
      age: age || patient.age,
      phoneNumber: phoneNumber || patient.phoneNumber,
    };
    Object.assign(patient, updatePatient);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});

module.exports = router;
