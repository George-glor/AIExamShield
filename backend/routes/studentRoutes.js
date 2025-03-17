// studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/authMiddleware');

// Student login route (includes face recognition and data verification)
router.post('/login', studentController.login); // Student login route

// Protected routes (requires JWT authentication)
router.use(authMiddleware.verifyToken); // Use middleware to secure routes

// Routes for starting and submitting exams
router.post('/exam/:examNumber/start', studentController.startExam); // Start an exam
router.post('/exam/:examNumber/submit', studentController.submitExam); // Submit an exam

module.exports = router;
