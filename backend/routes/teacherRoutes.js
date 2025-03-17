// teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../utils/authMiddleware');

// Teacher routes (authentication and exam management)
router.post('/exam', teacherController.createExam); // Teacher creates a new exam
router.get('/exam/:examNumber', teacherController.viewExamDetails); // View details of a specific exam

// Protected routes (requires JWT authentication)
router.use(authMiddleware.verifyToken); // Use middleware to secure routes

// Routes for monitoring exam and reviewing submissions
router.get('/exam/:examNumber/responses', teacherController.getExamResponses); // Get student responses for the exam
router.post('/exam/:examNumber/finish', teacherController.finishExam); // Mark exam as finished and submit results

module.exports = router;
