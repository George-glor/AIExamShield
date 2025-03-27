const Exam = require('../models/Exam');

const createExam = async (req, res) => {
  const { name, startTime, duration } = req.body;

  try {
    const exam = new Exam({
      name,
      startTime,
      duration,
      teacherId: req.user.id, // Attach the teacher's ID to the exam
    });
    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam', error });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacherId: req.user.id }); // Fetch exams for the logged-in teacher
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams', error });
  }
};
const startExam = async (req, res) => {
  const { examCode } = req.params;

  try {
    const exam = await Exam.findOne({ examCode });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Send signal to front end to turn on camera but not start recording
    res.status(200).json({ exam, message: 'Camera on, waiting for exam start' });
  } catch (error) {
    res.status(500).json({ message: 'Error starting exam', error });
  }
};

const submitExam = async (req, res) => {
  const { examCode } = req.params;
  const { answers, videoData, studentId, faceImagePath } = req.body;

  try {
    const exam = await Exam.findOne({ examCode });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Perform face detection
    const faceDetectionResult = await detectFace(faceImagePath, studentId);
    if (!faceDetectionResult.success) {
      return res.status(400).json({ message: faceDetectionResult.message });
    }

    // Save result with recording timestamp
    const result = new Result({
      examId: exam._id,
      studentId,
      answers,
      aiReport: faceDetectionResult.message,
      recordingStartedAt: new Date(),
    });

    await result.save();
    res.status(200).json({ message: 'Exam submitted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting exam', error });
  }
};

module.exports = { createExam, getExams, startExam, submitExam };