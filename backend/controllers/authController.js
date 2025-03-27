const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');


// Admin Login

const loginAdmin = async (req, res) => {
  const { email, password, specialCode } = req.body;

  try {
    const admin = await Admin.findOne({ email, specialCode });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token, role: 'admin' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

/**
 * Teacher Login
 * Requires mic test to be passed before login.
 */
const loginTeacher = async (req, res) => {
  const { firstName, lastName, email, password, micTestPassed } = req.body;

  // Check if mic test was passed
  if (!micTestPassed) {
    return res.status(400).json({ message: 'Mic test must be completed before login' });
  }

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher._id, role: 'teacher' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token, role: 'teacher' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

/**
 * Student Login
 * Requires mic test, agreement check, camera on, and face recognition.
 */
const loginStudent = async (req, res) => {
  const { firstName, lastName, personalNumber, micTestPassed, agreementChecked, cameraOn, faceMatched } = req.body;

  if (!micTestPassed) {
    return res.status(400).json({ message: 'Mic test must be completed before login' });
  }
  if (!agreementChecked) {
    return res.status(400).json({ message: 'You must agree to the terms and conditions' });
  }
  if (!cameraOn) {
    return res.status(400).json({ message: 'Camera must be turned on for identification' });
  }
  if (!faceMatched) {
    return res.status(400).json({ message: 'Face recognition failed. Please ensure proper lighting and positioning.' });
  }

  try {
    const student = await Student.findOne({ firstName, lastName, personalNumber });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token, role: 'student' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { loginAdmin, loginTeacher, loginStudent };
