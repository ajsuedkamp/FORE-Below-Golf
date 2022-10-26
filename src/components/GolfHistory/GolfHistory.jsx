import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GolfHistory.css';
import {useHistory} from 'react-router-dom';
import UserPage from '../UserPage/UserPage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector, useDispatch} from 'react-redux';

function GolfHistory() {
    const [venueList, setVenueList] = useState([]);
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = () => {
        axios.get('/golf_history').then((response) => {
            console.log(response.data)
            setVenueList(response.data)
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in GET venues!');
        })
    }

    const displayVenueDetails = (venueToDisplay) => {
        console.log(venueToDisplay);
        dispatch({ type: 'SET_VENUE_DETAILS', payload: venueToDisplay });
        history.push('/venuedetail');
    }

    const deleteHistory = (venueId) => {
        axios.delete(`/golf_history/${venueId}`).then((response) => {
            fetchVenues();
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in DELETE request!')
        });
    }

    return (
        <>
        <h1>{user.username}'s Golf History</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{backgroundColor: 'greenyellow', textDecoration:'bold'}} >
                    <TableRow >
                        <TableCell align='center'style={{borderRight: '2px solid black'}} >Venue</TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>Date</TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>Note</TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>Explore</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {venueList.map((venue) => (
                        
                    <TableRow
                        key={venue.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align='center'style={{borderRight: '2px solid black'}}>
                        {venue.venue_name}
                        </TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>{venue.date}</TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>{venue.note}</TableCell>
                        <TableCell align='center'style={{borderRight: '2px solid black'}}>
                            <button onClick={() => displayVenueDetails(venue)}>Details</button>
                            <button onClick={() => deleteHistory(venue.id)}>Delete</button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <button onClick={() => history.push('/addgolfouting')}>Add Golf Outing</button> 
        <button onClick={() => history.push('/allvenues')}>View All Venues</button>
        </>
       
    )
}





export default GolfHistory

