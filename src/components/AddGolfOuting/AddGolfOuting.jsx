import React from "react";
import {useState} from 'react';
import axios from "axios";

function AddGolfOuting() {
    const [golfVenue, setGolfVenue] = useState('');

    const addGolf = (e) => {
        e.preventDefault();
        axios.post('/golf_history', {name: golfVenue})
        .then(() => {

        }).catch((error) => {
            console.log(error);
            alert('Something went wrong in AddGolfOutingPost');
        });
    }
    return (
        <div>
            <h2>Add Golf Experience</h2>
            <form onSubmit={addGolf}>
                <input value={golfVenue} onChange={(e) => setGolfVenue(e.target.value)} type="text" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddGolfOuting;