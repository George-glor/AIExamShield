import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const StudentDashboard = () => {
  const [examCode, setExamCode] = useState('');
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState('');
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (exam) {
      startRecording();
    }
  }, [exam]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const handleStartExam = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/student/exams/${examCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExam(response.data.exam);
    } catch (error) {
      console.error('Error fetching exam', error);
    }
  };

  const handleSubmitExam = async () => {
    stopRecording();

    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoFile = new File([videoBlob], 'exam-recording.webm', { type: 'video/webm' });

    const formData = new FormData();
    formData.append('answers', answers);
    formData.append('videoData', videoFile);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/student/exams/${examCode}/submit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Exam submitted successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error submitting exam', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      {!exam ? (
        <div>
          <h2>Enter Exam Code</h2>
          <input
            type="text"
            placeholder="Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
          />
          <button onClick={handleStartExam}>Start Exam</button>
        </div>
      ) : (
        <div>
          <h2>Exam: {exam.name}</h2>
          <video ref={videoRef} autoPlay muted />
          <textarea
            placeholder="Your answers"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
          <button onClick={handleSubmitExam}>Submit Exam</button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;