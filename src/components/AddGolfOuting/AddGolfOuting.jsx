import React from "react";
import {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";


function AddGolfOuting() {
    const [golfVenue, setGolfVenue] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [venueId, setVenueId] = useState('1');
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

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
            dispatch({ type: 'EDIT_VENUE', payload: { venueId, date, note, id} }, history);
            history.push('/golf_history');
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
            <h2>{id ? <h1>Edit Outting</h1> : <h1>Add Outting</h1> }</h2>
            <form onSubmit={addGolf}>
                {/* <input placeholder="Name of Venue" value={golfVenue} onChange={(e) => setGolfVenue(e.target.value)} type="text" /> */}
                
                
                {/* value = id of venue */}
                
                Name: <select value={venueId} onChange={(e) => setVenueId(e.target.value)} style={{padding:'10px'}}>
            
                    <option value ="1">Inside Edge</option>
                    <option value ="2">Top Golf</option>
                    <option value ="3">X-Golf</option>
                    <option value ="4">Braemar Golf Dome</option>
                    <option value ="5">Midwest Golf Dome</option>
                    <option value ="6">Golf Zone</option>
                </select>
                
                <br></br>
                <TextField label='Date' style={{padding:'20px'}}>
                 <input value={date} onChange={(e) => setDate(e.target.value)} />
                </TextField>
                <br></br>
                Notes: <input value={note} onChange={(e) => setNote(e.target.value)}></input>
                <br></br>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddGolfOuting;