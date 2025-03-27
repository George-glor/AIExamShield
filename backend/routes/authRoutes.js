const express = require('express');
const router = express.Router();
const { loginAdmin, loginTeacher, loginStudent } = require('../controllers/authController'); // Correct the path if necessary
//const { default: Login } = require('../../frontend/src/components/Login/Login');

// Authentication routes
router.post('/login/admin', loginAdmin);
router.post('/login/teacher', loginTeacher);
router.post('/login/student', loginStudent);

module.exports = router;
