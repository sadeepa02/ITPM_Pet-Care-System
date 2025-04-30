const express = require("express");
const router = express.Router();
const Prescription = require("../models/Prescription");

// GET all prescriptions
// GET all prescriptions - improved error handling

router.get("/api/prescriptions", async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ 
      message: "Failed to fetch prescriptions", 
      error: error.message || "Unknown database error" 
    });
  }
});
//http://localhost:8070/api/prescriptions/add
/*{
  "appointmentId": "6456789abcdef01234567890",
  "petName": "Max",
  "ownerName": "John Smith",
  "doctorName": "Dr. Sarah Wilson",
  "medicine": "Amoxicillin",
  "dosage": "50mg twice daily",
  "instructions": "Give with food. Monitor for any allergic reactions.",
  "duration": "7 days"
}*/
/*router.get("/api/prescriptions", async (req, res) => {
  console.log("GET /api/prescriptions route hit");
  try {
    console.log("Attempting to query database...");
    const prescriptions = await Prescription.find();
    console.log(`Found ${prescriptions.length} prescriptions`);
    res.json(prescriptions);
  } catch (error) {
    console.error("Detailed error fetching prescriptions:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Failed to fetch prescriptions", 
      error: error.message || "Unknown database error" 
    });
  }
});*/

// Get a specific prescription by ID
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate("appointmentId");
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescription", error });
  }
});

// Create a new prescription
router.post("/add", async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    res.status(500).json({ message: "Error creating prescription", error });
  }
});

// Update a prescription
//http://localhost:8070/api/prescriptions/67ee8dce8062832d6cf2ec71 put
router.put("/:id", async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(500).json({ message: "Error updating prescription", error });
  }
});

// Delete a prescription
//http://localhost:8070/api/prescriptions/67ee86c18062832d6cf2ec6a-delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting prescription", error });
  }
});

module.exports = router;
