const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  personalNumber: { type: String, unique: true, required: true },
  micTestPassed: { type: Boolean, default: false }, // New field
});

module.exports = mongoose.model('Student', StudentSchema);
