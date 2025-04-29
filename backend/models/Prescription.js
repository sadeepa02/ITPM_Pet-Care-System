{/*const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PainControlBookModel", // Assuming you have an Appointment model
      required: true,
    },
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    doctorName: { type: String, required: true },
    medicine: { type: String, required: true },
    dosage: { type: String, required: true },
    instructions: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", PrescriptionSchema);

*/}
const mongoose = require("mongoose");  
 const PrescriptionSchema = new mongoose.Schema(   
  { appointmentId: {       type: mongoose.Schema.Types.ObjectId,       
    ref: "PainControlBookModel", // Assuming you have an Appointment model       
    required: true,     
  },    
    petName: { type: String, required: true },    
    ownerName: { type: String, required: true },     
    doctorName: { type: String, required: true },     
    medicine: { type: String, required: true },     
    dosage: { type: String, required: true },     
    instructions: { type: String, required: true },     
    duration: { type: String, required: true },     
    date: { type: Date, default: Date.now },   
  },   
    { timestamps: true } );  
    
module.exports = mongoose.model("Prescription", PrescriptionSchema);