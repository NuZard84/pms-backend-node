const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema({
  isDoctor: { default: true, type: Boolean },
  name: {
    type: String,
    // required: [true, "Please provide a valid name."],
    // unique: true,
    maxlength: [40, "A name must have less or equal 40 characters"],
    minlength: [0, "A name must have more or equal 5 characters"],
  },
  gender: {
    type: String,
    // required: [true, "Please provide a gender"],
  },
  age: {
    type: Number,
    // required: [true, "Please provide your age"],
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
  },
  username: {
    type: String,
    // required: [true, "Please proivde your username"],
    // unique: true,
    minlength: [5, "username must be 5 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    select: false,
    minlength: 8,
  },
  secKey: {
    type: String,
    // required: [true, "Api key is missing"],
  },
  isKeyVerified: {
    type: Boolean,
    default: false,
  },
  education: {
    type: String,
    // required: [true, "Education field is required"],
  },
  patients: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
    },
  ],
  isDetailsFilled: {
    type: Boolean,
    default: false,
  },
  specialist: {
    type: String,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
