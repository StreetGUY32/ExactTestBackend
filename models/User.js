const mongoose = require('mongoose');

// Create a Schema for the User with roles (admin or user)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',  // Default role is 'user'
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
