import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function AllGolfVenues() {
    const [venueList, setVenueList] = useState([]);
    const [venueName, setVenueName] = useState('');

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = () => {
        axios.get('/golf_venues').then((response) => {
            console.log(response.data);
            setVenueList(response.data);
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in GET all venues')
        });
    }
    

    const postToWishlist = (e) => {
        e.preventDefault();
        axios.post('/golf_wishlist', {name: venueName  })
        .then(() => {
            
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in postToWishlist')
        })
    }

    return (
        <div>
            <h2>All Golf Venues</h2>
            <Grid container spacing={4}>
            {
                venueList.map(venue => {
                    
                    return (
                    
                        <Grid item xs={12} sm={6} md={3}>
                            <Card elevation={5}>
                                <div key={venue.id}>
                                    <ul>
                                        <li>
                                            <h3>{venue.venue_name}</h3>
                                            <li>{venue.feature_1}</li>
                                            <li>{venue.feature_2}</li>
                                            <li>{venue.feature_3}</li>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Grid>
                    
                    );
                })
            }
            </Grid>
        </div>
    )    
}

export default AllGolfVenues;