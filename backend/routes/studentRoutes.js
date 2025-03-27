const express = require('express');
const router = express.Router();
const { startExam, submitExam } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/exams/:examCode', authMiddleware(['student']), startExam);
router.post('/exams/:examCode/submit', authMiddleware(['student']), submitExam);

module.exports = router;