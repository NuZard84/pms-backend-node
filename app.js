require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const authRoutes = require("./routes/auth");
const passport = require("./config/passport");
const flash = require("connect-flash");
const detailRoutes = require("./routes/details");
const consultDocRoutes = require("./routes/consult");
const fetchPatientsRouter = require("./routes/fetchPatients");
const secKeyRoutes = require("./routes/secKey");
const queryRoutes = require("./routes/query");
// const dc = require("./models/doctorModal");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes handler
app.use("/auth", authRoutes);
app.use("/details", detailRoutes);
app.use("/consult", consultDocRoutes);
app.use("/fetchpatients", fetchPatientsRouter);
app.use("/seckey", secKeyRoutes);
app.use("/query", queryRoutes);
app.use("/getpatient", require("./routes/getPatient"));
app.use("/admin", require("./routes/admin"));
app.use("/chatgpt", require("./routes/chatGpt"));
// app.use("/reports", require("./routes/reports"));

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database !");
  })
  .catch((err) => {
    console.log("Connection failed !\n", err);
  });

// starting server on PORT
app.get("/", (req, res) => {
  // console.log("enter to /");
  // const dct = new dc({
  //   email: "doctor2@gmail.com",
  //   password: "$2a$10$VFu5xsh5YP2TmOXebRHu0OmSGYVhbCV98lRlYZkYyOvtk2t.6cr02",
  //   isDoctor: true,
  // });
  // await dct.save();
  res.send("Hello World !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "192.168.152.86", () => {
  console.log("Server is live on PORT :", PORT);
  console.log("http://localhost:8080");
});
