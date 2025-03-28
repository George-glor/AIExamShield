const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialNumber: { type: String, required: true },
});

module.exports = mongoose.model('Teacher', TeacherSchema);