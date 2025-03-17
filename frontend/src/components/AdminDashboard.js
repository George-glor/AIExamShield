// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { getTeachers, deleteTeacher } from '../services/examService';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const handleDeleteTeacher = async (teacherId) => {
    await deleteTeacher(teacherId);
    setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name}
            <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
