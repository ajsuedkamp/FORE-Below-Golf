import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './GolfHistory.css';
import {useHistory} from 'react-router-dom';

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
        <div className="container">
            <h2>Golf History</h2>
            {
                venueList.map(venue => {
                    return (
                    <div key={venue.id}>
                        <table className="history">
                            <thead>
                               <tr>
                                <th>Venue</th>
                                <th>Type</th>
                                <th>Yardage</th>
                                <th>Date</th>
                                <th>Notes</th>
                               </tr> 
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{venue.venue_name}</td>
                                    <td>{venue.type}</td>
                                    <td>{venue.yardage}</td>
                                    <td>{venue.date}</td>
                                    <td>{venue.note}</td>
                                    <td>
                                        <button onClick={() => history.push('/venuedetails')}>Details</button>
                                    </td>
                                </tr>
                            </tbody>

                 
                        </table>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default GolfHistory