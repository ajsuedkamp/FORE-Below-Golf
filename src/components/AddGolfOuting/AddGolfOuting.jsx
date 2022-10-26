import React from "react";
import {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';


function AddGolfOuting() {
    const [golfVenue, setGolfVenue] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState(0);

    const history = useHistory();

    const addGolf = (e) => {
        e.preventDefault();
        axios.post('/golf_history', {name: golfVenue, date: date, note: note})
        .then(() => {
            history.push('/golf_history');

        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in AddGolfOutingPost');
        });
    }
    return (
        <div>
            <h2>Add Golf Outing</h2>
            <form onSubmit={addGolf}>
                <input placeholder="Name of Venue" value={golfVenue} onChange={(e) => setGolfVenue(e.target.value)} type="text" />
                <input value={date} onChange={(e) => setDate(e.target.value)} />
{/*                 
                   venuesList.map((venue) => {
                    <option value={venue.name}>{venue.name}</option>
                   }) */}
                    {/* <option value ="simulator">Simulator</option>
                    <option value ="Indoor Dome">Indoor Dome</option>
                    <option value ="heated outddoor ">Heated Outdoor Hitting Area</option>
                </select> */}
                <input value={note} onChange={(e) => setNote(e.target.value)}></input>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddGolfOuting;