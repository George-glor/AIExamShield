// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes (login, registration, etc.)
router.post('/login', authController.login); // User login (admin, teacher, or student)

module.exports = router;
