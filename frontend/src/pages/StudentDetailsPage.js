import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentDetails from '../components/Admin/Views/StudentDetails';
import { useParams } from 'react-router-dom';

const StudentDetailsPage = () => {
    const { studentID } = useParams();
  return(
    <div className='studentDetailsPage'>
      <StudentDetails studentID={studentID} />
    </div>
  );
};

export default StudentDetailsPage