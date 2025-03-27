import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

let model = null;

// Load the Blazeface model
const loadModel = async () => {
  model = await blazeface.load();
  console.log('AI Model loaded');
};

// Detect faces in a video stream
const detectFaces = async (videoElement) => {
  if (!model) {
    await loadModel();
  }

  const predictions = await model.estimateFaces(videoElement, false);
  return predictions;
};

// Track movement (e.g., looking away, leaving the frame)
const trackMovement = (predictions) => {
  if (predictions.length === 0) {
    return { status: 'red', message: 'No face detected' };
  }

  const face = predictions[0];
  const { topLeft, bottomRight } = face;

  // Example: Check if the face is centered
  const centerX = (topLeft[0] + bottomRight[0]) / 2;
  const centerY = (topLeft[1] + bottomRight[1]) / 2;

  if (centerX < 0.4 || centerX > 0.6 || centerY < 0.4 || centerY > 0.6) {
    return { status: 'red', message: 'Face not centered' };
  }

  return { status: 'green', message: 'Face detected and centered' };
};

export { detectFaces, trackMovement };