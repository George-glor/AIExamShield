const express = require('express');
const router = express.Router();
const { loginAdmin, createTeacher, getTeachers, removeTeacher } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin login route (no authentication needed)
router.post('/login', loginAdmin);

// Protect routes with authMiddleware (only admins can access these routes)
router.use(authMiddleware(['admin']));

// Teacher management routes
router.post('/teachers', createTeacher);
router.get('/teachers', getTeachers);
router.delete('/teachers/:id', removeTeacher);

module.exports = router;
