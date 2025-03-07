// backend/models/Position.js
const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  qualifications: String,
  contactEmail: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Researcher' },
  datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Position', PositionSchema);
