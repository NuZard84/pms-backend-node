router = require("express").Router();
const Patient = require("../models/patientModal");
const Reports = require("../models/reportsModal");
const multer = require("multer");

router.post("/", async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.patientId || !req.body.report || !req.body.mimetype) {
      return res
        .status(400)
        .json({ message: "Please provide patient ID, report, and mimetype." });
    }

    // Check if patient exists
    const patient = await Patient.findById(req.body.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!" });
    }

    // Create and save report
    const report = new Reports({
      report: req.body.report,
      mimetype: req.body.mimetype,
      patient: req.body.patient,
    });
    await report.save();

    // Send success response
    res.status(201).json({ message: "Report added successfully!", report });
  } catch (err) {
    console.error("Error adding report:", err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
