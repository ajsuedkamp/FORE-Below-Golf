import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

function VenueDetail() {
    const outting = useSelector(store => store.selectedOutting);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_VENUE_DETAILS', payload: id });
    }, [id]);
    
    return(
       
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          
                   <Card sx={{ width: 400, height: 400 }} >
                        <h1>{outting.venue_name}</h1>
                        <ul>
                            <li>{outting.feature_1}</li>
                            <li>{outting.feature_2}</li>
                            <li>{outting.feature_3}</li>
                        </ul>
                        <p>Note:   {outting.note}</p>
                        <Link to={`/edit/${outting.id}`}>Edit</Link>
                     </Card>
                    
       
        </div>
    )
}

export default VenueDetail;