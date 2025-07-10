const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Example route: Only accessible by admins
router.get('/admin-dashboard', [authMiddleware, roleMiddleware(['admin'])], (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard!', user: req.user });
});

// Example route: Accessible by both admin and user
router.get('/user-dashboard', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to the user dashboard!', user: req.user });
});

module.exports = router;
