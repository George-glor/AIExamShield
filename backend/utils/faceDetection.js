const cv = require('opencv4nodejs');
const Student = require('../models/Student');  // Assuming the path to your Student model

// Function to detect and match faces
const detectFace = async (imagePath, studentId) => {
  try {
    // Load the pre-trained face detection classifier (Haar Cascade)
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

    // Read the input image
    const image = cv.imread(imagePath);
    const grayImage = image.bgrToGray();

    // Detect faces in the image
    const faces = classifier.detectMultiScale(grayImage).objects;

    if (faces.length === 0) {
      return { success: false, message: 'No face detected' };
    }

    // For simplicity, we will return the first detected face
    const face = faces[0];

    // You can add logic here to compare the detected face with the stored faceIdData (feature vector)

    // Retrieve the student's stored faceIdData for comparison
    const student = await Student.findById(studentId);
    if (!student) {
      return { success: false, message: 'Student not found' };
    }

    // Assuming faceIdData is a feature vector or image reference that can be compared
    // Here, you should compare the detected face with the stored `faceIdData`
    // For now, we assume a simple comparison (this is where AI-based face recognition logic would go)
    if (student.faceIdData === 'some_predefined_face_id') { // Replace with actual comparison logic
      return { success: true, message: 'Face matched' };
    } else {
      return { success: false, message: 'Face mismatch detected' };
    }
  } catch (error) {
    console.error('Error during face detection:', error);
    return { success: false, message: 'Error during face detection' };
  }
};

module.exports = { detectFace };
