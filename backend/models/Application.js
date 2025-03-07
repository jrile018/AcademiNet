// backend/models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  coverLetter: String,
  dateApplied: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
