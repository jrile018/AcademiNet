// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (make sure MongoDB is running locally or use your connection string)
mongoose.connect('mongodb://localhost:27017/researchjobs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
const positionsRoutes = require('./routes/positions');
const applicationsRoutes = require('./routes/applications');
const authRoutes = require('./routes/auth'); // ADDED: Authentication routes for login/signup

app.use('/api/positions', positionsRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/auth', authRoutes); // ADDED: Use the auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
