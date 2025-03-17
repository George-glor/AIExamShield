// teacherController.js
const Teacher = require('../models/Teacher'); // Import Teacher model
const Exam = require('../models/Exam'); // Import Exam model

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { exam_number, start_time, duration, questions } = req.body;

    // Create a new exam
    const newExam = new Exam({
      exam_number,
      start_time,
      duration,
      questions
    });

    await newExam.save();
    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// More teacher functions (view students, monitor exams, etc.) will go here.
