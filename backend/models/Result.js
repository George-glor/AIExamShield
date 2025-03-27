const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  answers: Object,
  aiReport: Object,
  recordingStartedAt: Date, // Track when recording started
  submittedAt: { type: Date, default: Date.now },
  recordingStartedAt: Date, // Track when recording started

});

module.exports = mongoose.model('Result', ResultSchema);

