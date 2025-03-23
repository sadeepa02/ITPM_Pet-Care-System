const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const adminRoutes = require("./routes/AdminRoutes");


const doctorAddRoutes = require("./routes/DoctorAddRoutes");

//dasun routes
const painControlBookRoutes = require("./routes/painControlBookRoutes");



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

app.use("/api/doctoradd", doctorAddRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/paincontrolbook", painControlBookRoutes);



// Basic route
app.get("/", (req, res) => {
  res.send("Pet Management API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});