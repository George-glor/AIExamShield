// Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  special_number: { type: String, required: true }, // Link to the admin
  permissions: {
    type: [String], // Array to store which exams the teacher can access
    default: [],
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
