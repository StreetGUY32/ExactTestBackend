const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        email,
        password,
        role,
      });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user to the database
      await user.save();  // This is the critical part!
  
      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
  
      // Sign JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, 
        },
        message:'User Registered'
      });  // Return the token in the response
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// Login and get JWT
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,  // Include role in the payload
      },
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, 
        },
        message:'User Logged In!'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
