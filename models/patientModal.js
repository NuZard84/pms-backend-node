const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema({
  isDoctor: { type: Boolean, default: false },
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
    // required: [true, "Please provide your Phone number"],
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
  Timeline: [
    {
      symtoms: {
        type: String,
        // required: [true, "Please provide a details about your symtoms"],
      },
      doctor: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Doctor",
        },
      ],
      status: {
        type: String,
      },
      prescription: {
        type: String,
      },
      result: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      document: {
        type: String,
        // required : [true, 'Please provide your medical documents']
      },
      category: {
        tyep: String,
      },
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
