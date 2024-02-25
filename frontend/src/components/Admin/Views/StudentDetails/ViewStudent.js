import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetailsPage = ({ student }) => {
    const { studentId } = useParams();
  return (
    <div>
      <h2>Student Details</h2>
      <p>First Name: {student.firstName}</p>
      <p>Last Name: {student.lastName}</p>
      <p>Created: {student.createdAt}</p>
      <p>Email: {student.email}</p>
      <p>Total Volunteer Hours: {student.totalVolunteerHours}</p>
    </div>
  );
};

export default StudentDetailsPage;
