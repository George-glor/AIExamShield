// resultService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/results';

export const getStudentResults = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

export const getTeacherResults = async (teacherId) => {
  try {
    const response = await axios.get(`${API_URL}/teacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};
