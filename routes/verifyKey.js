router = require("express").Router();
const Doctor = require("../models/doctorModal");
router.post("/", async (req, res) => {
  try {
    const { email, secKey } = req.body;
    const KEY = "EDEDRR";
    const doctor = await Doctor.findOne({ email: email });
    if (secKey === doctor.secKey) {
      doctor.isKeyVerified = true;
      await doctor.save();
      res.status(200).json({ message: "Key verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid key" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
