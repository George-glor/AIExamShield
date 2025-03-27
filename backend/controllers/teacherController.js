const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { detectSuspiciousActivity } = require('../services/aiMonitoring');
const Exam = require('../models/Exam');
const Student = require('../models/Student');
const Result = require('../models/Result');
const { detectFace } = require('../services/faceDetection');

// Create Exam
const createExam = async (req, res) => {
  const { examNumber, startTime, duration, questions } = req.body;

  // Validate the exam number format (15 alphanumeric characters)
  if (!/^[a-zA-Z0-9]{15}$/.test(examNumber)) {
    return res.status(400).json({ message: 'Exam Number must be 15 alphanumeric characters' });
  }

  try {
    const exam = new Exam({
      examNumber,
      startTime,
      duration,
      teacherId: req.user.id,
      questions, // Store questions created by the teacher
    });
    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam', error });
  }
};

// Get Exams for Teacher (Privacy)
const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacherId: req.user.id }); // Only return exams created by the logged-in teacher
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error });
  }
};

// Start Exam - Verify Student Identity and Record Video (Face detection)
const startExam = async (req, res) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode, teacherId: req.user.id });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found or you do not have access to it' });
    }
    res.status(200).json({ exam });
  } catch (error) {
    res.status(500).json({ message: 'Error starting exam', error });
  }
};


// Review Submitted Exams and Results
const reviewExam = async (req, res) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode, teacherId: req.user.id });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found or you do not have access to it' });
    }

    const results = await Result.find({ examId: exam._id });
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam results', error });
  }
};

// Finish Exam Review and Marking
const finishExam = async (req, res) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode, teacherId: req.user.id });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found or you do not have access to it' });
    }

    // Mark the exam as finished and handle data cleanup (30 days policy)
    exam.status = 'Finished';
    await exam.save();

    // Schedule data removal after 30 days
    setTimeout(async () => {
      await Result.deleteMany({ examId: exam._id });
      console.log(`Results for exam ${examCode} removed after 30 days`);
    }, 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

    res.status(200).json({ message: 'Exam marked as finished' });
  } catch (error) {
    res.status(500).json({ message: 'Error finishing exam', error });
  }
};
const { detectFace } = require('../services/faceDetection'); // Assuming path to your face detection service

// Submit Exam with Face Detection
// Submit Exam with Face Detection
const submitExam = async (req, res) => {
    const { examCode } = req.params;
    const { answers, videoData, studentId, faceImagePath } = req.body; // Assume faceImagePath is the uploaded image path
  
    try {
      const exam = await Exam.findOne({ examCode, teacherId: req.user.id });
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found or you do not have access to it' });
      }
  
      // Validate if student exists and matches
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Perform face detection and comparison
      const faceDetectionResult = await detectFace(faceImagePath, studentId);
  
      if (!faceDetectionResult.success) {
        return res.status(400).json({ message: faceDetectionResult.message });
      }
  
      // Save the exam result (if face matches)
      const result = new Result({
        examId: exam._id,
        studentId,
        answers,
        aiReport: faceDetectionResult.message,
      });
      await result.save();
  
      res.status(200).json({ message: 'Exam submitted successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting exam', error });
    }
  };

module.exports = {
  createExam,
  getExams,
  startExam,
  submitExam,
  reviewExam,
  finishExam,
};
