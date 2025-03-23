const mongoose = require("mongoose");
const Admin = require("./models/AdminModel");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

// Function to Add Admin
const addAdmin = async () => {
  try {
    // Check if admin already exists
    const username = "admin9";
    const password = "1234"; // Hardcoded password
    
    const existingAdmin = await Admin.findOne({ username });
    
    if (existingAdmin) {
      console.log(`Admin with username "${username}" already exists`);
      mongoose.connection.close();
      return;
    }
    
    // Create new admin with plain text password
    const newAdmin = new Admin({ 
      username, 
      password // Plain text password, no hashing
    });
    
    await newAdmin.save();
    console.log(`Admin "${username}" added successfully`);
  } catch (error) {
    console.error("Error adding admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
addAdmin();