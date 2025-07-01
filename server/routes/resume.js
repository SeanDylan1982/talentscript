import express from "express";
import jwt from "jsonwebtoken";
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save resume
router.post('/save', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.resumeData = req.body.resumeData;
    await user.save();
    res.json({ message: 'Resume saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resume
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ resumeData: user.resumeData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;