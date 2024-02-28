const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const paitent = require("../models/patientModal");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, gender, age, phoneNumber } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new paitent({
      name: name,
      email: email,
      password: hashedPassword,
      gender: gender,
      age: age,
      phoneNumber: phoneNumber,
    });
    console.log("regisered user", newUser);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch {
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    return res.json({ message: "Authentication successful", user: user });
  })(req, res, next);
});

module.exports = router;
