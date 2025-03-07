// backend/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: String // Could be a URL to a file or the text content
});

module.exports = mongoose.model('Student', StudentSchema);
