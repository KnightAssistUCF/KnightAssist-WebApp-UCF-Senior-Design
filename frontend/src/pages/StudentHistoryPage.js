import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentHistory from '../components/StudentHistory/StudentHistory';

const StudentHistoryPage = () =>
{
    return(
      <div className="studenthistorypage">
        <StudentHistory />
      </div>
    );
};

export default StudentHistoryPage;