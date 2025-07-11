const Task = require('../models/task');
const User = require('../models/User');

// Create a new task (User creates for themselves, Admin creates for anyone)
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  // Admin can assign to anyone, but users can only create for themselves
  const assignedUser = req.user.role === 'admin' ? assignedTo : req.user.id;

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo: assignedUser,
      status: status || 'Not Started',
      createdBy: req.user.id,  // Set the user who is creating the task
    });

    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all tasks for the logged-in user (Users see their own tasks, Admin sees all tasks)
exports.getTasks = async (req, res) => {
  try {
    const tasks = req.user.role === 'admin'
      ? await Task.find()  // Admin sees all tasks
      : await Task.find({ createdBy: req.user.id });  // Users see only their tasks

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update task (Users can update their tasks, Admin can update any task)
 exports.updateTask = async (req, res) => {
    const { taskId } = req.params;   // taskId from the route parameter
    const { title, description } = req.body;  // Destructure from the request body

    try {
        // Ensure title and description are passed in the request
        if (!title || !description) {
            return res.status(400).json({ msg: 'Title and description are required' });
        }

        // Find the task by ID
        let task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Ensure the task belongs to the user or is allowed to be edited by admin
        if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'You do not have permission to update this task' });
        }

        // Update task fields
        task.title = title || task.title;
        task.description = description || task.description;

        await task.save();

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Delete task (Users can delete their tasks, Admin can delete any task)
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the logged-in user is allowed to delete the task
    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'You do not have permission to delete this task' });
    }

    await task.deleteOne();
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Assign task to a user (Only Admin can assign tasks)
exports.assignTask = async (req, res) => {
    const { taskId, assignedTo } = req.body;
  
    try {
      let task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Only admins can assign tasks' });
      }
  
      task.assignedTo = assignedTo;
      await task.save();
  
      // Emit real-time event when task is assigned
      const assignedUser = await User.findById(assignedTo);
      io.emit('taskAssigned', { task, user: assignedUser });  // Emit to all connected clients
  
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  exports.getTasksForUser = async (req, res) => {
    try {
      const { userId } = req.params;  // Get the userId from the URL params
  
      // Check if the current user is an admin or the user trying to view their own tasks
      if (req.user.role !== 'admin' && req.user.id !== userId) {
        return res.status(403).json({ msg: 'You do not have permission to view these tasks' });
      }
  
      // Fetch tasks that are assigned to the user or created by the user
      const tasks = await Task.find({ assignedTo: userId });
  
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }