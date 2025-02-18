const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      image: { type: String },
      options: [{ type: String, required: true }],
      correct: { type: String, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
