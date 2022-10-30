import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function VenueDetail() {
    const outting = useSelector(store => store.selectedOutting);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_VENUE_DETAILS', payload: id });
    }, [id]);
    
    return(
        <div>
            <h3>{outting.venue_name}</h3>
            <ul>
                <li>{outting.feature_1}</li>
                <li>{outting.feature_2}</li>
                <li>{outting.feature_3}</li>
            </ul>
            <p>{outting.note}</p>
            <Link to={`/edit/${outting.id}`}>Edit</Link>
        </div>
    )
}

export default VenueDetail;