const express = require('express');
const router = express.Router();
const { createTeacher, getTeachers, removeTeacher } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect teacher routes with authMiddleware
router.post('/teachers', authMiddleware(['admin']), createTeacher);
router.get('/teachers', authMiddleware(['admin']), getTeachers);
router.delete('/teachers/:id', authMiddleware(['admin']), removeTeacher);

module.exports = router;
