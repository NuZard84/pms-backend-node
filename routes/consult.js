router = require("express").Router();
Patients = require("../models/patientModal");
Doctor = require("../models/doctorModal");

router.post("/patient", async (req, res) => {
  try {
    const { email, category, symptoms, medicalHistory, medications } = req.body;
    console.log(email, category, symptoms, medicalHistory, medications);
    const p = await Patients.findOne({ email: email });

    p.Timeline.push({
      symptoms: symptoms,
      category: category,
      medicalHistory: medicalHistory ?? "None",
      medications: medications ?? "None",
      status: false,
    });
    await p.save();
    console.log("inside consult doctor : ", p);
    res
      .status(200)
      .json({ message: "Timeline entry added successfully", data: p });
  } catch (err) {
    console.log("err inside  patient : ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/doctor", async (req, res) => {
  try {
    // doctor can change, status, prescription, result need email to update things
    const { email, status, prescription, result, checkPointId } = req.body;
    const p = await Patients.findOne({ email: email });

    // find perticular checkpoint by ID
    p.Timeline.forEach((ele) => {
      if (ele._id.toString() === checkPointId) {
        //   console.log(ele);
        ele.status = status;
        ele.prescription = prescription ?? "None";
        ele.result = result ?? "None";
      }
    });
    await p.save();
    res
      .status(200)
      .json({ message: "Timeline entry added successfully", data: p });
  } catch (err) {
    console.log("err inside doctor : ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    // if need comes to update prv checkpoint of timeline
    const {
      checkPointId,
      email,
      symptoms,
      medicalHistory,
      medications,
      status,
      prescription,
      result,
    } = req.body;
    // first fetch whole timeline of user
    const p = await Patients.findOne({ email: email });

    // find perticular checkpoint by ID
    p.Timeline.forEach((checkpoint) => {
      if (checkpoint._id.toString() === checkPointId) {
        console.log("enter");
        // Copy existing checkpoint data and update specific fields
        const updatedCheckpoint = {
          ...checkpoint,
          symptoms: symptoms || checkpoint.symptoms,
          medicalHistory: medicalHistory || checkpoint.medicalHistory,
          medications: medications || checkpoint.medications,
          status: status || checkpoint.status,
          prescription: prescription || checkpoint.prescription,
          result: result || checkpoint.result,
        };

        // Replace the existing checkpoint with the updated data
        Object.assign(checkpoint, updatedCheckpoint);
      }
    });

    await p.save();
    res.status(200).json({ message: "Timeline updated successfully", data: p });
  } catch (err) {
    console.log("err inside update consult ");
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
