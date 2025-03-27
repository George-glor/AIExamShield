const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  examNumber: { type: String, required: true, unique: true },
  questions: { type: String, required: true }, // Store as JSON or text
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  micTestPassed: { type: Boolean, default: false }, // New field

});

module.exports = mongoose.model('Exam', ExamSchema);