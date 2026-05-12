// Pet Care Prediction API Route
// This module handles AI-powered predictions for pet health conditions

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
