import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import "./StudentLogin.css";

const MODEL_URL = process.env.PUBLIC_URL + "/models/";

const StudentLogin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [micStatus, setMicStatus] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState("");
  const [loadingModels, setLoadingModels] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setLoadingModels(false);
      } catch (error) {
        console.error("Error loading face-api models:", error);
        setError("Error loading face-api models");
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    if (loadingModels) {
      setError("Models are still loading. Please wait.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraOn(true);
        detectFace();
      }
    } catch (err) {
      setError("Camera not accessible. Please check permissions.");
    }
  };

  const detectFace = async () => {
    const video = videoRef.current;
    const detect = async () => {
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
      setFaceDetected(detections.length > 0);
      requestAnimationFrame(detect);
    };
    video.onplaying = () => {
      requestAnimationFrame(detect);
    };
  };

  const handleMicCheck = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus(true);
    } catch (err) {
      setMicStatus(false);
    }
  };

  const handleLogin = () => {
    if (!micStatus) {
      setError("Microphone is off. Please turn on your microphone.");
      return;
    }
    if (!faceDetected) {
      setError("No face detected. Please ensure your camera is on.");
      return;
    }
    if (!consentChecked) {
      setError("You must consent to be recorded.");
      return;
    }
    if (firstName && lastName && personalNumber.length === 12) {
      navigate("/student/dashboard");
    } else {
      setError("Please fill all fields correctly.");
    }
  };

  return (
    <div className="student-login-container">
      <div className="student-login-box">
        <h2>Student Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Personal Number (12 digits)"
          value={personalNumber}
          onChange={(e) => setPersonalNumber(e.target.value)}
        />

        <div className="camera-container">
          <video ref={videoRef} autoPlay muted />
          {!cameraOn && <button onClick={startCamera}>Start Camera</button>}
          {faceDetected && <p>Face Detected: {firstName} {lastName}</p>}
        </div>

        <div className="mic-container">
          <button onClick={handleMicCheck}>Test Microphone</button>
          {micStatus ? <p>Microphone is ON</p> : <p>Microphone is OFF</p>}
        </div>

        <div className="consent">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
          />
          <label>I consent to being recorded during the exam.</label>
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default StudentLogin;
