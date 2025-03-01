const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const http = require('http'); // Add HTTP server for WebSockets
const { Server } = require('socket.io'); // Import Socket.IO
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reservationRoutes = require('./routes/reservations');
const adminRoutes = require('./routes/admin'); // Import admin routes
const { authenticateToken } = require('./middlewares/authMiddleware'); // Import middleware
const User = require('./models/User'); // Import User model

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: { origin: '*' },
});

app.set("io", io);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes); // Mount admin routes

const ensureAdminExists = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const admin = new User({
        username: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        phone: '0000000000',
        role: 'admin',
      });
      await admin.save();
      console.log('✅ Admin user created.');
    }
  } catch (error) {
    console.error('❌ Error ensuring admin exists:', error.message);
  }
};

io.on("connection", (socket) => {
  console.log("New WebSocket connection.");

  socket.emit("activeUsersUpdated", async () => {
    const count = await User.countDocuments({ isActive: true });
    socket.emit("activeUsersUpdated", count);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected.");
    const count = await User.countDocuments({ isActive: true });
    io.emit("activeUsersUpdated", count);
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    ensureAdminExists(); // Ensure an admin user exists
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });