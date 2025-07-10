const User = require('../models/User');

// Admin: View any user's profile
exports.adminViewProfile = async (req, res) => {
  const { userId } = req.params;  // Get user ID from params

  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user); // Return user profile
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Update any user's profile
exports.adminUpdateProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, role } = req.body;

  const updatedUser = {};
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updatedUser.password = await bcrypt.hash(password, salt);
  }
  if (role) updatedUser.role = role;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update the user profile
    user = await User.findByIdAndUpdate(userId, { $set: updatedUser }, { new: true });

    res.json(user); // Return the updated user profile
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Admin: Delete any user's profile
exports.adminDeleteProfile = async (req, res) => {
  const { userId } = req.params; // Get user ID from params

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ msg: 'User profile deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
