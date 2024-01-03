import {useState, useEffect} from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import './AdminHome.css';




function StudentTable(props)
{
  

  return(
    <div>
      <TableContainer className="tableContainer">
        <Table className="studentTable">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Volunteer Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.students.length > 0 ? (
            props.students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.totalVolunteerHours}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No students available</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentTable;