import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GolfHistory.css';
import {useHistory} from 'react-router-dom';
import AddGolfOuting from '../AddGolfOuting/AddGolfOuting';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function GolfHistory() {
    const [venueList, setVenueList] = useState([]);
    const history = useHistory();

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
    return ( 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Venue</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Yardage</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {venueList.map((venue) => (
                    <TableRow
                        key={venue.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {venue.venue_name}
                        </TableCell>
                        <TableCell align="right">{venue.type}</TableCell>
                        <TableCell align="right">{venue.yardage}</TableCell>
                        <TableCell align="right">{venue.date}</TableCell>
                        <TableCell align="right">{venue.note}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
    
        // <div className="container">
        //     <h2>Golf History</h2>
        //     {
        //         venueList.map(venue => {
        //             return (
        //             <div key={venue.id}>
        //                 <table className="history">
        //                     <thead>
        //                        <tr>
        //                         <th>Venue</th>
        //                         <th>Type</th>
        //                         <th>Yardage</th>
        //                         <th>Date</th>
        //                         <th>Notes</th>
        //                        </tr> 
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>{venue.venue_name}</td>
        //                             <td>{venue.type}</td>
        //                             <td>{venue.yardage}</td>
        //                             <td>{venue.date}</td>
        //                             <td>{venue.note}</td>
        //                             <td>
        //                                 <button onClick={() => history.push('/venuedetails')}>Details</button>
        //                             </td>
        //                         </tr>
        //                     </tbody>

                 
        //                 </table>
        //             </div>
        //             )
        //         })
        //     }
        // </div>




export default GolfHistory

