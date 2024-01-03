import {useState} from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import './AdminHome.css';


function OrgTable(props)
{
  

  return(
    <div>
      <TableContainer className="tableContainer">
        <Table className="studentTable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.orgs.length > 0 ? (
            props.orgs.map((org) => (
              <TableRow key={org._id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.createdAt}</TableCell>
                <TableCell>{org.email}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No organizations available</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
};

export default OrgTable;