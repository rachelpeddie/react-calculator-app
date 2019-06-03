import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* calcSaga() {
    yield takeLatest( 'SAVE_CALCULATION', saveCalculation );
    yield takeLatest( 'GET_LAST_CALCULATIONS', getLastCalculations );
}

export default calcSaga;