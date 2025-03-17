// adminController.js
const Admin = require('../models/Admin'); // Import Admin model
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JWT for authentication

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password, special_number } = req.body;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Check the special number
    if (admin.special_number !== special_number) {
      return res.status(400).json({ message: 'Invalid special number' });
    }

    // Generate JWT token for session management
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Respond with the token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// More admin functions (manage teachers, view results, etc.) will go here.
