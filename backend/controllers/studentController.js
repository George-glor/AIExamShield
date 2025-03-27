const Exam = require('../models/Exam');
const Result = require('../models/Result');
const { detectSuspiciousActivity } = require('../services/aiMonitoring');
const { validationResult } = require('express-validator');

// Start Exam
const startExam = async (req, res) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json({ exam });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam', error });
  }
};

// Submit Exam
const submitExam = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { examCode } = req.params;
  const { answers, videoData } = req.body;

  try {
    const exam = await Exam.findOne({ examCode });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if exam duration has expired
    const currentTime = new Date();
    const examEndTime = new Date(exam.startTime).getTime() + exam.duration * 60000; // Convert duration to milliseconds
    if (currentTime > examEndTime) {
      return res.status(400).json({ message: 'Exam duration has expired' });
    }

    // Analyze video data for suspicious activity
    const aiReport = await detectSuspiciousActivity(videoData);

    // Save student's answers and AI report
    const result = new Result({
      examId: exam._id,
      studentId: req.user.id,
      answers,
      aiReport,
    });
    await result.save();

    res.status(200).json({ message: 'Exam submitted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting exam', error });
  }
};

module.exports = { startExam, submitExam };