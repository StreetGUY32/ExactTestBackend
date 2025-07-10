const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createTask, getTasks, updateTask, deleteTask, assignTask } = require('../controllers/taskController');

// Create a new task (User creates for themselves, Admin creates for anyone)
router.post('/create', authMiddleware, createTask);

// Get tasks (Users can see their tasks, Admin sees all tasks)
router.get('/getAll', authMiddleware, getTasks);

// Update task (Users can update their tasks, Admin can update any task)
router.put('/update/:taskId', authMiddleware, updateTask);

// Delete task (Users can delete their tasks, Admin can delete any task)
router.delete('/delete/:taskId', authMiddleware, deleteTask);

// Admin assigns task to a user
router.put('/assign', [authMiddleware, roleMiddleware(['admin'])], assignTask);

module.exports = router;
