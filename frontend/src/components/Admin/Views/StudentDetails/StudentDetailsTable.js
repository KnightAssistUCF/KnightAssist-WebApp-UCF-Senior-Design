import React, { useState, useEffect } from 'react';
import { buildPath } from '../../../../path.js';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



function StudentDetailsTable({upcomingEvents})
{
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('desc');
  const [allEvents, setAllEvents] = useState([]);


  async function fetchEventInfo() {
    let tempAllEvents = [];
    console.log(upcomingEvents);
    for(let eventIDStudent of upcomingEvents) {
      console.log(eventIDStudent);
      let url = buildPath(`api/searchOneEvent?eventID=${eventIDStudent}`);

      try {

        let response = await fetch(url, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());
        console.log(res);
        if(res.length > 0) {
         tempAllEvents.push(...res); 
        }
        
      } catch(e) {
        console.log("oopsies");
      }
    }
    setAllEvents([...tempAllEvents]);
    console.log(allEvents);
  }
  

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleViewClick = (studentID) => {
    console.log(`Clicked student View for ID: ${studentID}`);
    
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    const newPageClamped = Math.min(Math.max(0, newPage), Math.ceil(allEvents.length / rowsPerPage) - 1);
    setPage(newPageClamped);
  };
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchEventInfo();
  }, []);

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);


    return(
      <div>
        {allEvents.length > 0 && (
        <Paper variant='outlined' className='tableContainer'>
          <TableContainer >
            <Table className="studentEventsTable">
               <TableHead>
                <TableRow>
                <TableCell>
                    
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      <strong>Name</strong>
                    </TableSortLabel>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(allEvents, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (allEvents) => (
                    <TableRow key={allEvents._id}>
                      <TableCell><Button size='small' variant='outlined' onClick={() => handleViewClick(allEvents._id)}>View</Button></TableCell>
                      <TableCell>{allEvents.name}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={allEvents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        )}
      </div>
    );
};

export default StudentDetailsTable;