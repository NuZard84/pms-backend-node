const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [40, "A name must have less or equal 40 characters"],
    minlength: [5, "A name must have more or equal 5 characters"],
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    minlength: [5, "username must be 5 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    select: false,
    minlength: 8,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
