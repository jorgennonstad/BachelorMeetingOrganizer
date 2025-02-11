// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:3000', // Adjust for your frontend URL
  credentials: true, // Allow cookies to be sent in cross-origin requests
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());  // Add this line

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Import routes
const meetingRoutes = require('./backend/routes/meetingRoutes');
const todoRoutes = require('./backend/routes/todoRoutes');
const userRoutes = require('./backend/routes/userRoutes');

// Use routes
app.use('/api/meetings', meetingRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
