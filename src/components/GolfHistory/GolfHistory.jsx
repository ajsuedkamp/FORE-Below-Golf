import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function GolfHistory() {
    const [venueList, setVenueList] = useState([]);

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
        <div>
            <h2>Golf History</h2>
            {
                venueList.map(venue => {
                    return (
                    <div key={venue.id}>
                    Venue: {venue.venue_name}
                    <br></br>
                    Type: {venue.type}
                    <br></br>
                    Yardage: {venue.yardage}
                    <br></br>
                    Date: {venue.date}
                    
                    </div>
                    )
                })
            }
        </div>
    )
}

export default GolfHistory