router = require("express").Router();
const Doctor = require("../models/doctorModal");
router.post("/add", async (req, res) => {
  try {
    const { email, secKey } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    doctor.secKey = secKey;
    await doctor.save();
    res.status(200).json({ message: "Doctor verified!", data: doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    doctor.secKey = undefined;
    await doctor.save();
    res.status(200).json({ message: "Doctor deleted!", data: doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});
module.exports = router;
