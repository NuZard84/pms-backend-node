const router = require("express").Router();
const Paitent = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

// router.post("/patient", async (req, res) => {
//   const { email, gender, age, phoneNumber } = req.body;
//   console.log(req.body);
//   try {
//     const patient = await Paitent.findOne({ email });
//     patient.gender = gender;
//     patient.age = age;
//     patient.phoneNumber = phoneNumber;
//     patient.isDetailsFilled = true;

//     await patient.save();
//     return res.status(201).json(patient);
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error saving details",
//     });
//   }
// });
router.post("/doctor", async (req, res) => {
  const { email, name, gender, age, phoneNumber, category, education } =
    req.body;
  console.log(req.body);
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
    return res.status(404).json({
      message: "Error saving details",
    });
  }
});

module.exports = router;
