const express = require("express");
const router = express.Router();
const PainControlBook = require("../models/painControlBookModel");

// Submit Pain Control form
router.post("/submit", async (req, res) => {
  try {
    const newPain = new PainControlBook(req.body);
    const savedPain = await newPain.save();
    res.status(201).json({
      success: true,
      message: "Pain Control form submitted successfully",
      data: savedPain,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to submit Pain Control form",
    });
  }
});

// Get all Pain Control submissions
router.get("/", async (req, res) => {
  try {
    const pains = await PainControlBook.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pains.length,
      data: pains,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve Pain Control submissions",
    });
  }
});

// Update Pain Control form
router.patch("/:id", async (req, res) => {
  try {
    const updatedPain = await PainControlBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPain) {
      return res.status(404).json({ success: false, error: "Pain Control form not found" });
    }
    res.status(200).json({
      success: true,
      message: "Pain Control form updated successfully",
      data: updatedPain,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to update Pain Control form",
    });
  }
});

// Delete Pain Control form
router.delete("/:id", async (req, res) => {
  try {
    const deletedPain = await PainControlBook.findByIdAndDelete(req.params.id);
    if (!deletedPain) {
      return res.status(404).json({ success: false, error: "Pain Control form not found" });
    }
    res.status(200).json({
      success: true,
      message: "Pain Control form deleted successfully",
      data: deletedPain,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to delete Pain Control form",
    });
  }
});

module.exports = router;
