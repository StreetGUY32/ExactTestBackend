const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAllUsers } = require('../controllers/userController');
const { viewProfile, updateProfile } = require('../controllers/userController');
const { adminViewProfile, adminUpdateProfile, adminDeleteProfile } = require('../controllers/adminController');

// Route to fetch all users (Only admin can access)
router.get('/getAllUsers', [authMiddleware, roleMiddleware(['admin'])], getAllUsers);

router.get('/viewProfile', authMiddleware, viewProfile);

// Route to update a user's profile (only for logged-in users)
router.put('/updateProfile', authMiddleware, updateProfile);

// Admin routes to manage any user's profile
router.get('/admin/viewProfile/:userId', [authMiddleware, roleMiddleware(['admin'])], adminViewProfile);
router.put('/admin/updateProfile/:userId', [authMiddleware, roleMiddleware(['admin'])], adminUpdateProfile);
router.delete('/admin/deleteProfile/:userId', [authMiddleware, roleMiddleware(['admin'])], adminDeleteProfile);

module.exports = router;
