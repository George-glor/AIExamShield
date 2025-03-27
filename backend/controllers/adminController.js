const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Bill = require('../models/Bill');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// ✅ Utility to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ✅ Admin Login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign({ adminId: admin._id, specialNumber: admin.specialNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, adminId: admin._id });
});

// ✅ Create Admin
const createAdmin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, specialNumber } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create and save the admin
  const admin = new Admin({ email, password: hashedPassword, specialNumber });
  await admin.save();

  res.status(201).json({ message: 'Admin created successfully' });
});

// ✅ Get Teachers (Paginated)
const getTeachers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // Find teachers based on the admin's special number
  const teachers = await Teacher.find({ specialNumber: req.admin.specialNumber })
    .limit(parseInt(limit))
    .skip((page - 1) * limit);

  const count = await Teacher.countDocuments({ specialNumber: req.admin.specialNumber });

  res.status(200).json({
    teachers,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
  });
});

// ✅ Create Teacher
const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if teacher exists
  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    return res.status(400).json({ message: 'Teacher already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create and save the teacher
  const teacher = new Teacher({ name, email, password: hashedPassword, specialNumber: req.admin.specialNumber });
  await teacher.save();

  res.status(201).json({ message: 'Teacher created successfully' });
});

// ✅ Remove Teacher
const removeTeacher = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  // Check if teacher exists
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  // Ensure the admin can only delete teachers under their special number
  if (teacher.specialNumber !== req.admin.specialNumber) {
    return res.status(403).json({ message: 'Unauthorized to remove this teacher' });
  }

  await Teacher.findByIdAndDelete(teacherId);
  res.status(200).json({ message: 'Teacher removed successfully' });
});

// ✅ Generate Bill
const generateBill = asyncHandler(async (req, res) => {
  const { schoolName, numberOfStudents, amountPerStudent } = req.body;

  if (isNaN(numberOfStudents) || isNaN(amountPerStudent)) {
    return res.status(400).json({ message: 'Invalid number of students or amount per student' });
  }

  const totalAmount = numberOfStudents * amountPerStudent;

  // Create and save the bill
  const bill = new Bill({
    schoolName,
    numberOfStudents,
    amountDue: totalAmount,
    paymentStatus: 'Pending',
  });

  await bill.save();
  res.status(201).json({ message: 'Bill generated successfully', bill });
});

// ✅ Export all functions
module.exports = {
  loginAdmin,
  createAdmin,
  getTeachers,
  createTeacher,
  removeTeacher,
  generateBill,
};
