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
import { Dialog, IconButton, Avatar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';



function UpcomingEvents({allEvents})
{
  const [orderBy, setOrderBy] = useState('endTime');
  const [order, setOrder] = useState('desc');
  const [openViewModal, setOpenViewModal] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  // const [allEvents, setAllEvents] = useState([]);


  // async function fetchEventInfo() {
  //   let tempAllEvents = [];
  //   for(let eventIDStudent of upcomingEvents) {
  //     let url = buildPath(`api/searchOneEvent?eventID=${eventIDStudent}`);

  //     try {

  //       let response = await fetch(url, {
  //         method: "GET",
  //         headers: {"Content-Type": "application/json"},
  //       });

  //       let res = JSON.parse(await response.text());
  //       console.log(res);
  //       if(res.length > 0) {
  //         tempAllEvents = [...tempAllEvents, ...res.filter(event => !tempAllEvents.some(existingEvent => existingEvent._id === event._id))];
  //       }
        
  //     } catch(e) {
  //       console.log("oopsies");
  //     }
  //   }
  //   setAllEvents([...tempAllEvents]);
  //   console.log(allEvents);
  // }

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };
  

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleViewClick = (singleEvent) => {
    setOpenViewModal(true);
    console.log(singleEvent);
    setEventDetails(singleEvent);
    // search org pfp
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

  // useEffect(() => {
  //   fetchEventInfo();
  // }, []);

  useEffect(() => {
  }, [allEvents]);


    return(
      <div>
        {allEvents.length > 0 && (
        <Paper variant='outlined' className='tableContainer'>
          <TableContainer >
            <Table className="studentEventsTable">
               <TableHead>
                <TableRow>
                <TableCell style={{ width: '10%' }}>
                    
                  </TableCell>
                  <TableCell style={{ width: '30%' }}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      <strong>Name</strong>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'startTime'}
                      direction={orderBy === 'startTime' ? order : 'asc'}
                      onClick={() => handleRequestSort('startTime')}
                    >
                      <strong>Start Time</strong>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'endTime'}
                      direction={orderBy === 'endTime' ? order : 'asc'}
                      onClick={() => handleRequestSort('endTime')}
                    >
                      <strong>End Time</strong>
                    </TableSortLabel>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(allEvents, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (singleEvent) => (
                    <TableRow key = {singleEvent._id}>
                      <TableCell><Button size='small' variant='contained' disableElevation sx={{backgroundColor: '#5f5395', '&:hover': {
                  backgroundColor: '#4f457c'}}} onClick={() => handleViewClick(singleEvent)}>View</Button></TableCell>
                      <TableCell>{singleEvent.name}</TableCell>
                      <TableCell>{singleEvent.startTime}</TableCell>
                      <TableCell>{singleEvent.endTime}</TableCell>
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

        <Dialog
          open={openViewModal}
          onClose={handleCloseViewModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <IconButton
              aria-label="close"
              onClick={handleCloseViewModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                fontSize: 20,
              }}
            >
            <CancelIcon />
            </IconButton>
            <div className='modalContent' style={{ padding: '25px', maxWidth: '500px' }}>
              {eventDetails?.name && <h1 style={{ marginBottom: '10px'}}>{eventDetails.name}</h1>}
              {eventDetails?.sponsoringOrganization && <p>Hosting Organization ID: {eventDetails.sponsoringOrganization}</p>}
              {eventDetails?.location && <p>Location: {eventDetails.location}</p>}
              {eventDetails?.startTime && <p>Start Time: {eventDetails.startTime}</p>}
              {eventDetails?.endTime && <p>End Time: {eventDetails.endTime}<br/></p>}
              {eventDetails?.description && <p>Description: {eventDetails.description}</p>}
              {eventDetails?.eventTags?.length > 0 && <p>Tags: {eventDetails.eventTags.join(' ')}</p>}
            </div>
        </Dialog>
      </div>
    );
};

export default UpcomingEvents;