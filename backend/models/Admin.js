// Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  special_number: { type: String, required: true, unique: true },
  exam_counter: { type: Number, default: 0 }, // Tracks the number of students who have taken exams
});

module.exports = mongoose.model('Admin', AdminSchema);
