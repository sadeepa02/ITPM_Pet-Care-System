// *** File: server.js ***
// Place this at the root of your backend (e.g. backend/server.js)
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Import the predict router from its own file
const predictRouter = require('./routes/predict');

const app = express();
const port = process.env.PORT || 8070;

// Middleware
app.use(bodyParser.json());

// Mount predict router before starting the server
app.use('/predict', predictRouter);

// Connect to MongoDB and then start the server
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName   = process.env.DB_NAME       || 'petcare';

MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);
    app.locals.db = db;
    console.log(`✅ Connected to MongoDB: ${dbName}`);

    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });


// *** File: routes/predict.js ***
// Place this in backend/routes/predict.js
const express = require('express');
const { OpenAI } = require('openai');

// Create a new router instance
const router = express.Router();

// Initialize the OpenAI client once
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Retry helper function
async function callOpenAIWithRetry(prompt, retries = 3, backoff = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150
      });
      return response.choices[0].message.content.trim();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`Attempt ${i+1} failed; retrying in ${backoff}ms...`, err.message);
      await new Promise(r => setTimeout(r, backoff));
      backoff *= 2;
    }
  }
}

// Define POST /predict route
router.post('/', async (req, res) => {
  const { type, age, symptoms } = req.body;
  if (!type || !age || !symptoms) {
    return res.status(400).json({ error: 'Missing type, age, or symptoms' });
  }

  const prompt = `A ${age}-year-old ${type} is showing these symptoms: ${symptoms}. What could be the possible health issues and recommended next steps?`;
  const db = req.app.locals.db;

  try {
    const prediction = await callOpenAIWithRetry(prompt);
    await db.collection('predictions').insertOne({ type, age, symptoms, prediction, createdAt: new Date() });
    return res.json({ prediction });
  } catch (err) {
    console.error('OpenAI error:', err);
    return res.json({ prediction: "Sorry, I'm having trouble generating a prediction right now. Please try again later." });
  }
});

module.exports = router;
