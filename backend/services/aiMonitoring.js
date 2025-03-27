const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');

// Load pre-trained face detection model
const faceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// Load registered face data (for face recognition)
const registeredFaces = new Map(); // Map<studentId, faceDescriptor>

// Detect faces in a video frame
const detectFaces = (frame) => {
  const grayFrame = frame.bgrToGray();
  const faces = faceClassifier.detectMultiScale(grayFrame).objects;
  return faces;
};

// Compare detected face with registered face data
const recognizeFace = (frame, faceRect, studentId) => {
  const faceDescriptor = extractFaceDescriptor(frame, faceRect);
  const registeredDescriptor = registeredFaces.get(studentId);

  if (!registeredDescriptor) {
    return false; // No registered face data
  }

  const distance = cv.norm(faceDescriptor, registeredDescriptor, cv.NORM_L2);
  return distance < 0.6; // Threshold for face recognition
};

// Extract face descriptor (placeholder for actual face recognition logic)
const extractFaceDescriptor = (frame, faceRect) => {
  const faceImage = frame.getRegion(faceRect).resize(150, 150);
  return faceImage.cvtColor(cv.COLOR_BGR2GRAY).reshape(1, 150 * 150);
};

// Detect suspicious activity in video frames
const detectSuspiciousActivity = async (videoData, studentId) => {
  const videoBuffer = Buffer.from(videoData, 'base64');
  const tempFilePath = path.join(__dirname, 'temp.webm');
  fs.writeFileSync(tempFilePath, videoBuffer);

  const videoCapture = new cv.VideoCapture(tempFilePath);
  let frame;
  let suspiciousActivity = false;

  while ((frame = videoCapture.read())) {
    const faces = detectFaces(frame);

    if (faces.length === 0) {
      suspiciousActivity = true; // No face detected
      break;
    }

    const faceRect = faces[0];
    if (!recognizeFace(frame, faceRect, studentId)) {
      suspiciousActivity = true; // Face does not match registered data
      break;
    }
  }

  fs.unlinkSync(tempFilePath); // Delete temporary video file
  return suspiciousActivity ? 'Suspicious activity detected' : 'No suspicious activity detected';
};

module.exports = { detectSuspiciousActivity };