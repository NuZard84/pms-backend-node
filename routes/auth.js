const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Register route
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  };
  //   users.push(newUser);
  console.log(newUser);
  res.status(201).json({ message: "User registered successfully!" });
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
