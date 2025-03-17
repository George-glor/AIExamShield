// Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  exam_number: { type: String, required: true, unique: true },
  start_time: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  questions: { type: String, required: true }, // Questions stored as a string (could be JSON or plain text)
  exam_responses: [
    {
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      responses: { type: Array, required: true }, // Array of student's responses to exam questions
      result: { type: String, enum: ['completed', 'incomplete'], default: 'incomplete' },
      date_submitted: { type: Date },
    },
  ],
});

module.exports = mongoose.model('Exam', ExamSchema);
