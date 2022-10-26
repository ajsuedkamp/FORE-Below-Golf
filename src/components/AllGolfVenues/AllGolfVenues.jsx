import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';


function AllGolfVenues() {
    const [venueList, setVenueList] = useState([]);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = () => {
        axios.get('/golf_venues').then((response) => {
            setVenueList(response.data);
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in GET all venues')
        });
    }

    return (
        <div>
            <h2>All Golf Venues</h2>
            {
                venueList.map(venue => {
                    
                    return (
                    <div key={venue.id}>
                        <ul>
                            <li>
                                <p>{venue.venue_name}</p>
                                <p>{venue.type}</p>
                                <p>{venue.yardage}</p>
                            </li>
                        </ul>
                    </div>
                    );
                })
            }

        </div>
    )    
}

export default AllGolfVenues;