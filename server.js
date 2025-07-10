const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // MongoDB connection
const http = require('http'); 
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);  // Use http server to work with Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const protectedRoutes = require('./routes/protectedRoutes');
const taskRoutes = require('./routes/taskRoutes'); 


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/tasks', taskRoutes);


// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });



// Start server with Socket.io integration
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
