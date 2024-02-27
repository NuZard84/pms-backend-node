const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Patient = require("../models/patientModal");
const Doctor = require("../models/doctorModal");

// Mock database

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      // Find the patient in the MongoDB database by email
      console.log("enter to passport");
      let user;
      if (req.body.isDoctor) {
        user = await Doctor.findOne({ email: email }).select("+password");
      } else {
        user = await Patient.findOne({ email: email }).select("+password");
      }
      console.log(user);

      // If no record is found in the database, return a message
      if (!user) {
        console.log("Incorrect email.");
        return done(null, false, { message: "Incorrect email." });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log(user.password);
        if (isMatch) {
          console.log(isMatch);
          return done(null, user);
        } else {
          console.log("Incorrect password.");
          return done(null, false, { message: "Incorrect password." });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  const userData = {
    id: user.id,
    isDoctor: user.isDoctor,
    // Add any other data you want to store
  };
  done(null, userData);
});

passport.deserializeUser(async (userData, done) => {
  try {
    console.log("enter to deserialize");
    console.log("userData", userData);
    // Find the patient in the MongoDB database by id
    let user;
    if (userData.isDoctor) {
      user = await Doctor.findById(userData.id);
    } else {
      user = await Patient.findById(userData.id);
    }
    console.log(user);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
