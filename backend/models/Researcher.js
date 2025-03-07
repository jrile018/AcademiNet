// backend/models/Researcher.js
const mongoose = require('mongoose');

const ResearcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Remember to hash passwords in production!
});

module.exports = mongoose.model('Researcher', ResearcherSchema);
