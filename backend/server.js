import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Notification from './models/Notification.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const jwtSecret = process.env.JWT_SECRET || 'changeme';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, username: user.username } });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password, name, email, avatar } = req.body;
  if (!username || !password || !name || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
    name,
    email,
    avatar,
  });
  res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, name: user.name, email: user.email, avatar: user.avatar } });
});

// Get profile
app.get('/api/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update profile
app.put('/api/profile', authMiddleware, async (req, res) => {
  const { name, email, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, email, avatar },
    { new: true, runValidators: true, select: '-password' }
  );
  res.json(user);
});

// Get notifications
app.get('/api/notifications', authMiddleware, async (req, res) => {
  const notifications = await Notification.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark notification as read
app.put('/api/notifications/:id/read', authMiddleware, async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { read: true },
    { new: true }
  );
  if (!notification) return res.status(404).json({ message: 'Notification not found' });
  res.json(notification);
});

// List all users (for development/testing only)
app.get('/api/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 