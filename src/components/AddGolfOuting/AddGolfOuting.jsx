import React from "react";
import {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function AddGolfOuting() {
    const [golfVenue, setGolfVenue] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState(0);
    const [venueId, setVenueId] = useState('1');

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        if (id) { // Return false if id is undefined
            axios.get(`/golf_history/${id}`).then(response => {
                console.log(response.data)
                setGolfVenue(response.data.venue_name);
                setVenueId(response.data.golf_venue_id);
                setNote(response.data.note);
                setDate(response.data.date);
            }).catch(error => {
                console.log(error);
                alert('Something went wrong!');
            })
        } // else do nothing
    }, [id]);


    const addGolf = (e) => {
        e.preventDefault();
        if(id) {
            //TODO edit route
        } else {
            axios.post('/golf_history', {name: golfVenue, date: date, note: note, venueId: venueId})
            .then(() => {
                history.push('/golf_history');

            }).catch((error) => {
                console.log(error);
                alert('Something went wrong in AddGolfOutingPost');
            });
        }
    }
    return (
        <div>
            <h2>Add Golf Outing</h2>
            <form onSubmit={addGolf}>
                {/* <input placeholder="Name of Venue" value={golfVenue} onChange={(e) => setGolfVenue(e.target.value)} type="text" /> */}
                <input value={date} onChange={(e) => setDate(e.target.value)} />
                
                {/* value = id of venue */}
                <select value={venueId} onChange={(e) => setVenueId(e.target.value)}>
                    <option value ="1">Inside Edge</option>
                    <option value ="2">Top Golf</option>
                    <option value ="3">X-Golf</option>
                </select>
                <input value={note} onChange={(e) => setNote(e.target.value)}></input>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddGolfOuting;