const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const paitent = require("../models/patientModal");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new paitent({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch {
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
