const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/router');
const AuthRoutes=require('./routes/AuthRoutes')
const cookieparser=require('cookie-parser');
const weddingRoutes = require('./routes/WeddingRoutes');
const hostRoutes = require('./routes/HostRoutes')

// import {createServer} from 'http';
// import{Server} from 'socket.io';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  method:["GET","POST"],
  credentials:true
}));
// const httpserver=require('http').createServer(app,{
//   origin:'http://localhost:3000',

// })
// io=io.listen(httpserver)

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(cookieparser())
app.use('/api/weddings', weddingRoutes);
app.use('/api/hosts', hostRoutes);


app.use('/', router);
 // Added payment route
// io.on('connection',socket=>{
//   console.log(`connection on socket server by user: ${socket.id}`);
//   socket.on('message',message={
//     io.emit('message',`${socket.id.substring(0,5)}: ${message}`)
//   })

// })

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
