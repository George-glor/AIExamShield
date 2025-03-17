// examService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teacher';

export const createExam = async (examData) => {
  const response = await axios.post(`${API_URL}/exam`, examData);
  return response.data;
};

export const getExamDetails = async () => {
  const response = await axios.get(`${API_URL}/exam/123`);
  return response.data;
};
