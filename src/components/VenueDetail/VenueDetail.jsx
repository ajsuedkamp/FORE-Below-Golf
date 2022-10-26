import { useDispatch, useSelector } from 'react-redux';


function VenueDetail() {
    const venue = useSelector(store => store.selectedOutting);

    return(
        <div>
            <h3>{venue.venue_name}</h3>
            <ul>
                <li>{venue.type}</li>
                <li>{venue.yardage}</li>
                <li>Feature 3</li>
            </ul>
            <p>{venue.note}</p>
        </div>
    )
}

export default VenueDetail;