
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  q1: { type: String, required: true },
  q2: { type: String, required: true },
  q3: { type: String, required: true },
  q4: { type: String, required: true },
  q5: { type: String, required: true },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({
      message: "Error saving feedback",
    });
  }
});

// Get all feedback
app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      submittedAt: -1,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      message: "Error retrieving feedback",
    });
  }
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
