// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../utils/authMiddleware');

// Admin routes (authentication and management)
router.post('/login', adminController.login); // Admin login route

// Protected routes (requires JWT authentication)
router.use(authMiddleware.verifyToken); // Use middleware to secure routes

// Routes for managing teachers
router.post('/teachers', adminController.createTeacher); // Create a new teacher
router.get('/teachers', adminController.getTeachers); // Get list of teachers
router.delete('/teachers/:id', adminController.deleteTeacher); // Delete a teacher

// Routes for viewing results and exam participation
router.get('/exam-participation', adminController.viewExamParticipation); // View number of students who have taken the exam

module.exports = router;
