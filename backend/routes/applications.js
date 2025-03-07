// backend/routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Create a new application
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all applications (for administrative purposes)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
