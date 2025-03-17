// Result.js
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  result: { type: String, enum: ['passed', 'failed'], required: true },
  ai_report: { type: String, required: true }, // AI-generated report for exam monitoring
  date_graded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', ResultSchema);
