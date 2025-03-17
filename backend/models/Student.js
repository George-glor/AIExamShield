// Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  personal_number: { type: String, required: true, unique: true },
  face_id_data: { type: String, required: true }, // Face ID data for verification
  exam_history: [
    {
      exam_number: { type: String, required: true },
      result: { type: String, enum: ['passed', 'failed'], required: true },
      date_taken: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Student', StudentSchema);
