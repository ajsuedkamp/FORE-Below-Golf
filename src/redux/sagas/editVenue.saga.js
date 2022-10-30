import axios from "axios";
import { takeEvery } from "redux-saga/effects";


function* editVenue(action) {
    try {
        yield axios.put(`/golf_history/${action.payload.id}`, action.payload);
        if (action.history) {
            action.history.goBack();
        }
    } catch (e) {
        console.log(e);
    }
}

function* editVenueSaga() {
    yield takeEvery ('EDIT_VENUE', editVenue);
}

export default editVenueSaga;