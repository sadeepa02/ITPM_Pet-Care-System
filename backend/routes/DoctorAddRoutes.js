const express = require("express");
const router = express.Router();
const DoctorAdd = require("../models/DoctorAddModel");

// Submit Doctor form
//POST http:localhost:8070/api/doctoradd/submit
router.post("/submit", async (req, res) => {
  try {
    const newDoctor = new DoctorAdd(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor form submitted successfully",
      data: savedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to submit Doctor form",
    });
  }
});

// Get all Doctor submissions
//GET http://localhost:8070/api/doctoradd/
router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorAdd.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve Doctor submissions",
    });
  }
});

// Update Doctor form
//PATCH http://localhost:8070/api/doctoradd/{doctorId}
router.patch("/:id", async (req, res) => {
  try {
    const updatedDoctor = await DoctorAdd.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, error: "Doctor form not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor form updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to update Doctor form",
    });
  }
});

// Delete Doctor form
//DELETE http://localhost:8070/api/doctoradd/{doctorId}

router.delete("/:id", async (req, res) => {
  try {
    const deletedDoctor = await DoctorAdd.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ success: false, error: "Doctor form not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor form deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Failed to delete Doctor form",
    });
  }
});

module.exports = router;