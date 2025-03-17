// studentController.js
const Student = require('../models/Student'); // Import Student model
const jwt = require('jsonwebtoken'); // Import JWT for student authentication

// Student Login (includes face recognition step)
exports.login = async (req, res) => {
  try {
    const { first_name, last_name, personal_number, face_id_data } = req.body;
    
    // Find student by personal number
    const student = await Student.findOne({ personal_number });
    if (!student) return res.status(400).json({ message: 'Student not found' });

    // Perform face recognition check (simplified for now)
    if (student.face_id_data !== face_id_data) {
      return res.status(400).json({ message: 'Face recognition failed' });
    }

    // Generate JWT token for student
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// More student functions (take exam, submit exam, etc.) will go here.
