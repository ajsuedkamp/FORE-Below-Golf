import React from "react";
import {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';


function AddGolfOuting() {
    const [golfVenue, setGolfVenue] = useState('');
    const [venueType, setVenueType] = useState('');
    const [yardage, setYardage] = useState(0);

    const history = useHistory();

    const addGolf = (e) => {
        e.preventDefault();
        axios.post('/golf_history', {name: golfVenue, type: venueType, yardage: yardage})
        .then(() => {
            history.push('/golf_history');

        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in AddGolfOutingPost');
        });
    }
    return (
        <div>
            <h2>Add Golf Experience</h2>
            <form onSubmit={addGolf}>
                <input placeholder="Name of Venue" value={golfVenue} onChange={(e) => setGolfVenue(e.target.value)} type="text" />
                <select value={venueType} onChange={(e) => setVenueType(e.target.value)}>
                    <option value ="simulator">Simulator</option>
                    <option value ="Indoor Dome">Indoor Dome</option>
                    <option value ="heated outddoor ">Heated Outdoor Hitting Area</option>
                </select>
                <input value={yardage} onChange={(e) => setYardage(e.target.value)}></input>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddGolfOuting;