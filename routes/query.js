const router = require("express").Router();
const Query = require("../models/queryModal");

router.post("/add", async (req, res) => {
  try {
    const { email, query } = req.body;
    const newQuery = new Query({ email, query });
    await newQuery.save();
    res.status(200).json({ message: "Query added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.post("/resolve", async (req, res) => {
  try {
    const { email } = req.body;
    const query = await Query.findOne({ email });
    if (!query) {
      return res.status(404).json({ message: "Query not found!" });
    }
    query.isQueryResolved = true;
    await query.save();
    res.status(200).json({ message: "Query resolved successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
