const express = require('express');
const connectDB = require('./config/db');
const hostRoutes = require('./routes/AuthRoutes');
const cors = require('cors');
const router = require('./routes/router');
const AuthRoutes=require('./routes/AuthRoutes')
const cookieparser=require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  method:["GET","POST"],
  credentials:true
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(cookieparser())

app.use('/', router); // Added payment route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
