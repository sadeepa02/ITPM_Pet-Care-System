const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  ownerName: String,
  petName: String,
  preferredDate: Date,  // The date of the booking
  preferredTime: String, // The time slot
  preferredDoctor: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
