const User = require('../models/User');

// Get all users (only accessible by admin)
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    res.json(users);  // Return the list of users
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.viewProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Fetch the logged-in user's data
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user); // Return the user profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  // Update a user's profile (only accessible by the logged-in user)
  exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
  
    // Build the updated user object
    const updatedUser = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(password, salt);
    }
  
    try {
      let user = await User.findById(req.user.id);  // Fetch logged-in user's data
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update the user profile
      user = await User.findByIdAndUpdate(req.user.id, { $set: updatedUser }, { new: true });
  
      res.json(user); // Return the updated user profile
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };