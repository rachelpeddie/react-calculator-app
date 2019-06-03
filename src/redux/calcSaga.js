import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// sends latest calculation to server
function* saveCalculation( action ) {
    console.log( `in saveCalculation saga`, action.payload );
    try {
        yield axios.post( '/calculations', action.payload );
    }
    catch ( error ){
        console.log(`sorry, couldn't save the calculation`, error);
        alert(`There was an error saving your calculation.  Try again later.`)
    }
}

// gets last ten calculations from server
function* getLastCalculations( action ) {
    try {
        const response = yield axios.get( '/calculations');
        yield put({ type: 'SET_CALCULATIONS', payload: response.data });
    }
    catch ( error ) {
        console.log(`sorry, couldn't get the last 10 calculations`, error);
    }
}

function* calcSaga() {
    yield takeLatest( 'SAVE_CALCULATION', saveCalculation );
    yield takeLatest( 'GET_LAST_CALCULATIONS', getLastCalculations );
}

export default calcSaga;