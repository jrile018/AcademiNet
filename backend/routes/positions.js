// backend/routes/positions.js
const express = require('express');
const router = express.Router();
const Position = require('../models/Position');

// Create a new position
router.post('/', async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    res.status(201).json(position);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all positions
router.get('/', async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
