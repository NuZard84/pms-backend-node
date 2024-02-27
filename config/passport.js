const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Patient = require("../models/patientModal");

// Mock database

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      // Find the patient in the MongoDB database by email
      console.log("enter to passport");
      const patient = await Patient.findOne({ email: email }).select(
        "+password"
      );
      console.log(patient);

      // If no record is found in the database, return a message
      if (!patient) {
        console.log("Incorrect email.");
        return done(null, false, { message: "Incorrect email." });
      }

      bcrypt.compare(password, patient.password, (err, isMatch) => {
        console.log(patient.password);
        if (isMatch) {
          console.log(isMatch);
          return done(null, patient);
        } else {
          console.log("Incorrect password.");
          return done(null, false, { message: "Incorrect password." });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Find the patient in the MongoDB database by id
    const patient = await Patient.findById(id);
    done(null, patient);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
