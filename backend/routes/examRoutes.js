const express = require('express');
const router = express.Router();
const { createExam, getExams, startExam, submitExam } = require('../controllers/examController');
const authMiddleware = require('../middleware/authMiddleware');

// Exam-related routes
router.post('/exams', authMiddleware(['teacher']), createExam);
router.get('/exams', authMiddleware(['teacher']), getExams);
router.get('/exams/start/:examCode', authMiddleware(['student']), startExam); 
router.post('/exams/submit/:examCode', authMiddleware(['student']), submitExam); 

module.exports = router;
