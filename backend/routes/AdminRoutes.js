const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized, no token provided" 
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};

// Admin Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  try {
    // Find admin in MongoDB
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }
    
    // Direct password comparison - no hashing
    if (password !== admin.password) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }
    
    // Generate JWT token with all admin data (except password)
    const adminData = admin.toObject();
    delete adminData.password;
    
    // JWT_SECRET must be set in environment variables
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    const token = jwt.sign(
      adminData, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    // Log the successful login
    console.log(`Admin ${username} logged in successfully`);
    
    res.status(200).json({ 
      success: true, 
      message: "Login successful",
      token,
      admin: adminData
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Protected Dashboard Route
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    // We already have all admin data from the token
    res.status(200).json({
      success: true,
      message: "Welcome to Admin Dashboard",
      admin: req.admin
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;