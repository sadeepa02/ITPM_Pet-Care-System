/*const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");



const adminRoutes = require("./routes/AdminRoutes");
//doctor routes
const doctorAddRoutes = require("./routes/DoctorAddRoutes");

//dasun routes
const painControlBookRoutes = require("./routes/painControlBookRoutes");
// pers routes
const prescriptionRoutes = require("./routes/PrescriptionRoutes");

//fetch appoinment
const appointmentsRoutes = require('./routes/appointments');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

app.use("/api/doctoradd", doctorAddRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/paincontrolbook", painControlBookRoutes);


app.use("/api/prescriptions", prescriptionRoutes);


app.use('/api/appointments', appointmentsRoutes);

app.use('/api/appointments', require('./routes/appointments'));


app.use("/", prescriptionRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Pet Management API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
/*
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 200;
const adminRoutes = require("./routes/AdminRoutes");
const doctorAddRoutes = require("./routes/DoctorAddRoutes");
const painControlBookRoutes = require("./routes/painControlBookRoutes");
const prescriptionRoutes = require("./routes/PrescriptionRoutes");
const appointmentsRoutes = require("./routes/appointments");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// === AI Prediction Route ===
app.options('/api/predict', cors()); // Enable CORS preflight
app.post('/api/predict', async (req, res) => {
  console.log('📩 Received /api/predict request:', req.body);

  const { symptoms, petType, petAge } = req.body;

  if (!symptoms || !petType || !petAge) {
    console.warn('⚠️ Missing parameters in request');
    return res.status(400).json({ success: false, error: 'Missing required parameters' });
  }

  const prompt = `
You are an experienced veterinarian. Based on the following information, provide a possible condition and recommendation for the pet.
Pet Type: ${petType}
Pet Age: ${petAge}
Symptoms: ${symptoms}
Format your response exactly as follows:
- Possible Condition: [condition name]
- Confidence Level: ([percentage]%)
- Recommendation: [your recommendation]
`;

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️ OpenAI API key not configured. Using mock response.');
      return res.status(200).json({
        success: true,
        result: "- Possible Condition: Simulated condition (API key not configured)\n- Confidence Level: (78%)\n- Recommendation: Please consult with a veterinarian for proper diagnosis."
      });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: maxTokens,// Adjust this number as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const message = response.data.choices[0].message.content;
    console.log("✅ AI Prediction Successful");
    res.status(200).json({ success: true, result: message });
  } catch (error) {
    console.error('❌ AI Prediction Error:', error.response?.data || error.message);
  
    // Return different mock responses based on symptoms
    let simulatedResponse = "- Possible Condition: Simulated condition (API error occurred)\n- Confidence Level: (78%)\n- Recommendation: Please consult with a veterinarian.";
    if (symptoms.toLowerCase().includes("vomiting")) {
      simulatedResponse = "- Possible Condition: Gastroenteritis\n- Confidence Level: (85%)\n- Recommendation: Provide bland food, keep hydrated. Visit vet if persists.";
    } else if (symptoms.toLowerCase().includes("coughing")) {
      simulatedResponse = "- Possible Condition: Kennel Cough\n- Confidence Level: (80%)\n- Recommendation: Isolate pet, monitor symptoms, and seek vet care if needed.";
    } else if (symptoms.toLowerCase().includes("limping")) {
      simulatedResponse = "- Possible Condition: Soft tissue injury\n- Confidence Level: (75%)\n- Recommendation: Restrict activity and monitor swelling.";
    }
  
    return res.status(200).json({
      success: false,
      error: 'Internal server error. Please try again later.',
      result: simulatedResponse,
      details: error.message,
    });
  }
  
});

// === Other Routes ===
app.use("/api/doctoradd", doctorAddRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/paincontrolbook", painControlBookRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/appointments", appointmentsRoutes);

// === Basic Home Route ===
app.get("/", (req, res) => {
  res.send("🐾 Pet Management API is running!");
});

// === 404 Catch-All Route ===
app.use((req, res) => {
  console.warn(`❌ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found' });
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
*//*
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 200;

const adminRoutes = require("./routes/AdminRoutes");
const doctorAddRoutes = require("./routes/DoctorAddRoutes");
const painControlBookRoutes = require("./routes/painControlBookRoutes");
const prescriptionRoutes = require("./routes/PrescriptionRoutes");
const appointmentsRoutes = require("./routes/appointments");

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// OpenAI API helper with retries
async function callOpenAIWithRetry(prompt, symptoms, maxRetries = 3) {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️ OpenAI API key not configured.');
        return {
          success: true,
          result: generateFallbackResponse('API key missing', symptoms).result
        };
      }

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.4,
          max_tokens: maxTokens,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      return {
        success: true,
        result: response.data.choices[0].message.content
      };
    } catch (error) {
      const errorData = error.response?.data?.error || {};
      console.error(`❌ OpenAI API Error (Attempt ${retries + 1}/${maxRetries + 1}):`, errorData.message);

      if (errorData.code === 'insufficient_quota') {
        return generateFallbackResponse(
          'API quota exceeded. Please check your OpenAI account.',
          symptoms,
          true
        );
      }

      if (error.response?.status === 429) {
        if (retries < maxRetries) {
          const delay = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          retries++;
          continue;
        }
      }

      if (retries >= maxRetries) {
        return generateFallbackResponse(errorData.message, symptoms);
      }

      retries++;
    }
  }
}

// Fallback generator
function generateFallbackResponse(errorMessage, symptoms = '', isQuotaError = false) {
  const responses = {
    generic: "- Possible Condition: General health concern\n- Confidence Level: (75%)\n- Recommendation: Please consult with a veterinarian.",
    vomiting: "- Possible Condition: Gastroenteritis\n- Confidence Level: (85%)\n- Recommendation: Provide bland food, keep hydrated. Visit vet if persists.",
    coughing: "- Possible Condition: Kennel Cough\n- Confidence Level: (80%)\n- Recommendation: Isolate pet, monitor symptoms, seek vet care.",
    limping: "- Possible Condition: Soft tissue injury\n- Confidence Level: (75%)\n- Recommendation: Restrict activity, monitor swelling.",
    itching: "- Possible Condition: Skin allergy\n- Confidence Level: (82%)\n- Recommendation: Check for allergens, consider hypoallergenic diet."
  };

  const symptomKey = symptoms.toLowerCase().includes("vomit") ? "vomiting" :
    symptoms.toLowerCase().includes("cough") ? "coughing" :
    symptoms.toLowerCase().includes("limp") ? "limping" :
    symptoms.toLowerCase().includes("itch") ? "itching" : "generic";

  return {
    success: false,
    error: isQuotaError ?
      `API quota exceeded. Showing fallback response. ${errorMessage}` :
      `API error: ${errorMessage}. Showing fallback response.`,
    result: responses[symptomKey]
  };
}

// AI Prediction Endpoint
app.post('/api/predict', async (req, res) => {
  const { symptoms, petType, petAge } = req.body;

  if (!symptoms || !petType || !petAge) {
    return res.status(400).json({
      success: false,
      error: 'Missing required parameters: symptoms, petType, petAge'
    });
  }

  const prompt = `As a veterinary expert, analyze these symptoms:
Pet: ${petType}, Age: ${petAge}
Symptoms: ${symptoms}
Format response as:
- Possible Condition: [condition]
- Confidence Level: [xx%]
- Recommendation: [action steps];`;

  try {
    const result = await callOpenAIWithRetry(prompt, symptoms);

    return res.status(result.success ? 200 : 503).json({
      success: result.success,
      result: result.result,
      error: result.error,
      warning: result.success ? null : 'Fallback response generated due to API issues'
    });
  } catch (error) {
    console.error('❌ Final error handler:', error);
    return res.status(503).json(generateFallbackResponse('Server error', symptoms));
  }
});

// Routes
app.use("/api/doctoradd", doctorAddRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/paincontrolbook", painControlBookRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/appointments", appointmentsRoutes);

app.get("/", (req, res) => {
  res.send("🐾 Pet Management API is running!");
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

// Load environment variables
dotenv.config();

// Flags to manage quota and logging
let openAIQuotaExceeded = false;
let hasLoggedQuotaError = false;

const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS, 10) || 200;
const PORT = process.env.PORT || 8070;
const mongoURL = process.env.MONGODB_URL;
const useOpenAI = process.env.USE_OPENAI === 'true';

// Route imports
const adminRoutes = require("./routes/AdminRoutes");
const doctorAddRoutes = require("./routes/DoctorAddRoutes");
const painControlBookRoutes = require("./routes/painControlBookRoutes");
const prescriptionRoutes = require("./routes/PrescriptionRoutes");
const appointmentsRoutes = require("./routes/appointments");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// AI Fallback generator
function generateFallbackResponse(errorMessage, symptoms = '') {
  const responses = {
    generic: "- Possible Condition: General health concern\n- Confidence Level: (75%)\n- Recommendation: Please consult with a veterinarian.",
    vomiting: "- Possible Condition: Gastroenteritis\n- Confidence Level: (85%)\n- Recommendation: Provide bland food, keep hydrated. Visit vet if persists.",
    coughing: "- Possible Condition: Kennel Cough\n- Confidence Level: (80%)\n- Recommendation: Isolate pet, monitor symptoms, seek vet care.",
    limping: "- Possible Condition: Soft tissue injury\n- Confidence Level: (75%)\n- Recommendation: Restrict activity, monitor swelling.",
    itching: "- Possible Condition: Skin allergy\n- Confidence Level: (82%)\n- Recommendation: Check for allergens, consider hypoallergenic diet."
  };

  const symptomKey = Object.keys(responses).find(key => symptoms.toLowerCase().includes(key)) || "generic";

  return {
    success: false,
    error: `AI error: ${errorMessage}. Showing fallback response.`,
    result: responses[symptomKey]
  };
}

// AI Prediction Endpoint
app.post("/api/predict", async (req, res) => {
  const { symptoms, petType, petAge } = req.body;

  if (!symptoms || !petType || !petAge) {
    return res.status(400).json({ success: false, error: "Missing required parameters: symptoms, petType, petAge" });
  }

  const prompt = `
You are an experienced veterinarian. Based on the following information, provide a possible condition and recommendation for the pet.
Pet Type: ${petType}
Pet Age: ${petAge}
Symptoms: ${symptoms}
Format your response exactly as follows:
- Possible Condition: [condition name]
- Confidence Level: ([percentage]%)
- Recommendation: [your recommendation]
`;

  if (!useOpenAI || openAIQuotaExceeded || !process.env.OPENAI_API_KEY) {
    const fallback = generateFallbackResponse("OpenAI unavailable or disabled", symptoms);
    return res.status(200).json(fallback);
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.6,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return res.status(200).json({ success: true, result: message });
  } catch (error) {
    const isQuotaError = error.response?.data?.error?.code === 'insufficient_quota';
    if (isQuotaError) {
      openAIQuotaExceeded = true;
      if (!hasLoggedQuotaError) {
        console.warn("⚠️ OpenAI quota exceeded. Switching to fallback.");
        hasLoggedQuotaError = true;
      }
    }
    const fallback = generateFallbackResponse(error.message || "Unknown error", symptoms);
    return res.status(503).json(fallback);
  }
});

// App routes
app.use("/api/admin", adminRoutes);
app.use("/api/doctoradd", doctorAddRoutes);
app.use("/api/paincontrolbook", painControlBookRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/appointments", appointmentsRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("🐾 Pet Management API is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
