const mongoose = require("mongoose");
const validator = require("validator");

const reportsSchema = new mongoose.Schema({
  report: {
    type: Buffer,
  },
  mimetype: {
    type: String,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
});
module.exports = mongoose.model("Reports", reportsSchema);
