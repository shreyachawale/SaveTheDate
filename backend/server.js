const express = require('express');
const connectDB = require('./config/db');
const hostRoutes = require('./routes/hostRoutes');
const cors = require('cors');
const router = require('./routes/router');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/hosts', hostRoutes);
app.use('/api/payments', router); // Added payment route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
