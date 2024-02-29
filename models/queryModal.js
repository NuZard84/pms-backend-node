const mongoose = require("mongoose");
const validator = require("validator");

const querySchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  query: {
    type: String,
    required: [true, "Please provide your query"],
  },
  isQueryResolved: {
    type: Boolean,
    default: false,
  },
});

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
