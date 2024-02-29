router = require("express").Router();
const Patient = require("../models/patient");

router.post("/", (req, res) => {
  try {
    // Check if request contains file
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    // Extract the image file from the request
    const imageFile = req.files.image;

    // email of patient who is going to be reported
    const { email } = req.body;
    // find tha patient by email from database and update
    const p = Patient.findOne({ email: email });
    if (!p) {
      return res.status(404).json({ message: "Patient not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
