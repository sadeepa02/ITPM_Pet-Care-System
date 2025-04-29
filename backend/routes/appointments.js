const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// CREATE - Add a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      ownerName,
      petName,
      preferredDate,
      preferredTime,
      preferredDoctor,
      petCategory,
      contactNumber,
      email,
      concerns,
      services
    } = req.body;

    // Validate required fields
    if (!ownerName || !petName || !preferredDate || !preferredTime || !preferredDoctor) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields' 
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      ownerName,
      petName,
      preferredDate,
      preferredTime,
      preferredDoctor,
      petCategory,
      contactNumber,
      email,
      concerns,
      services
    });

    // Save to database
    const savedAppointment = await newAppointment.save();
    res.status(201).json({ 
      success: true, 
      message: 'Appointment created successfully', 
      data: savedAppointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create appointment', 
      details: error.message 
    });
  }
});

// READ - Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ 
      success: true, 
      count: appointments.length, 
      data: appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch appointments', 
      details: error.message 
    });
  }
});

// Get all booked dates summary
router.get('/booked-dates', async (req, res) => {
  try {
    const appointments = await Appointment.find({}, 'preferredDate'); // Fetch only preferredDate

    // Process data to count occurrences of each date
    const summary = {};
    appointments.forEach((appointment) => {
      const date = appointment.preferredDate.toISOString().split('T')[0]; // Format date
      summary[date] = (summary[date] || 0) + 1;
    });

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch booked dates' });
  }
});

module.exports = router;