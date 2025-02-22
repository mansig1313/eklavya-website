const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const mongoose = require("mongoose");

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

// 📌 Get ALL tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests", error: error.message });
  }
});

// 📌 Get a SPECIFIC test by ID
router.get("/:testId", async (req, res) => {
  try {
    console.log("Fetching test with ID:", req.params.testId);

    if (!req.params.testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Error fetching test", error: error.message });
  }
});

// 📌 Update a test
router.put("/update/:id", async (req, res) => {
  const { testId } = req.params;
  const { title, questions } = req.body;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ error: "Invalid Test ID format" });
  }

  try {
      const test = await Test.findById(testId);
      if (!test) {
          return res.status(404).json({ error: "Test not found" });
      }

      test.title = title || test.title;
      test.questions = questions || test.questions;

      await test.save();
      res.json({ message: "Test updated successfully" });
  } catch (error) {
      console.error("Error updating test:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
