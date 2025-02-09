const express = require("express");
const router = express.Router();
const Test = require("../models/Test");

// 📌 Create a new test
router.post("/create", async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newTest = new Test({ title, questions });
    await newTest.save();
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (error) {
    res.status(500).json({ message: "Error creating test", error: error.message });
  }
});

// 📌 Get all tests
router.get("/api/tests", async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests", error: error.message });
  }
});

// 📌 Get a specific test by ID
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Error fetching test", error: error.message });
  }
});

// 📌 Update a test
router.put("/update/:id", async (req, res) => {
  try {
    const { title, questions } = req.body;
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      { title, questions },
      { new: true }
    );
    if (!updatedTest) return res.status(404).json({ message: "Test not found" });
    res.status(200).json({ message: "Test updated successfully", test: updatedTest });
  } catch (error) {
    res.status(500).json({ message: "Error updating test", error: error.message });
  }
});

module.exports = router;
