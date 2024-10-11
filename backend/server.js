const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const weddingRoutes = require('./routes/WeddingRoutes');
const hostRoutes = require('./routes/HostRoutes');
const guestRoutes = require('./routes/AuthRoutes');
const jwtAuth = require('./middleware/AuthMiddleware'); 

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  method: ["GET", "POST"],
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieparser());

// Routes
app.use('/api/weddings', weddingRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/guests', guestRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
