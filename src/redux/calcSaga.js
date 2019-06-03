import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

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

function* getLastCalculations( action ) {
    console.log(`in getLastCalculations saga`);
    try {
        const response = yield axios.get( '/calculations');
        yield put({ type: 'SET_CALCULATIONS', payload: response.data });
    }
    catch ( error ) {
        console.log(`sorry, couldn't get the last 10 calculations`, error);
        alert(`There was an error retrieving the last 10 calculations.  Try again later.`);
    }
}

function* calcSaga() {
    yield takeLatest( 'SAVE_CALCULATION', saveCalculation );
    yield takeLatest( 'GET_LAST_CALCULATIONS', getLastCalculations );
}

export default calcSaga;