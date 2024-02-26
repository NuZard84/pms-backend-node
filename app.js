require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// app configaration
app.use(express.json());
app.use(cors());

// routes handler

// connect to database
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => {
//     console.log("Connected to database !");
//   })
//   .catch((err) => {
//     console.log("Connection failed !\n", err);
//   });

// starting server on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is live on PORT :", PORT);
  console.log("http://localhost:8080");
});
