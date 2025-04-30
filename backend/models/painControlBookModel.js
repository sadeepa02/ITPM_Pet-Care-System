const mongoose = require('mongoose');

const painControlBookSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, "Owner name is required"],
    trim: true,
  },
  petName: {
    type: String,
    required: [true, "Pet name is required"],
    trim: true,
  },
  petCategory: {
    type: String,
    required: [true, "Pet category is required"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  preferredDate: {
    type: Date,
    required: [true, "Preferred date is required"],
  },
  preferredTime: {
    type: String,
    required: [true, "Preferred time is required"],
  },
  preferredDoctor: {
    type: String,
    required: [true, "Preferred doctor is required"],
    trim: true,
  },
  concerns: {
    type: String,
    required: [true, "Concerns are required"],
    trim: true,
  },
  services: {
    type: [String],
    required: [true, "Services are required"],
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('PainControlBook', painControlBookSchema);
